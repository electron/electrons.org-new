import logger from '@docusaurus/logger';
import { visitParents } from 'unist-util-visit-parents';
import { filter } from 'unist-util-filter';
import fs from 'node:fs';
import path from 'node:path';
import { Node, Parent } from 'unist';
import type { InlineCode, Link, LinkReference, Text } from 'mdast';
import { MdxJsxFlowElement } from 'mdast-util-mdx-jsx';
import type { VFile } from 'vfile';
import {
  getJSXImport,
  isDefinition,
  isInlineCode,
  isLink,
  isLinkReference,
  isText,
} from '../util/mdx-utils';

const fileContent = new Map<
  string,
  { promise: Promise<Parent>; resolve?: (value: Parent) => void }
>();

const EXCLUDE_LIST = ['browser-window-options', 'web-preferences'];

export default function attacher() {
  return transformer;
}

async function transformer(tree: Parent, file: VFile) {
  const structureDefinitions = new Map<string, string>();
  const mutations = new Set<Promise<void>>();
  /**
   * This function is the test function for the first pass of the tree visitor.
   * Any values returning 'true' will run replaceLinkWithPreview().
   *
   * As a side effect, this function also puts all reference-style links (definitions)
   * for API structures into a Map, which will be used on the second pass.
   */
  const checkLinksandDefinitions = (node: Node): node is Link => {
    if (isDefinition(node) && node.url.includes('/api/structures/')) {
      structureDefinitions.set(node.identifier, node.url);
    }
    if (isLink(node) && node.url.includes('/api/structures/')) {
      return EXCLUDE_LIST.every(
        (excludedFile) => !node.url.endsWith(`/api/structures/${excludedFile}`)
      );
    }

    return false;
  };

  /**
   * This function is the test function from the second pass of the tree visitor.
   * Any values returning 'true' will run replaceLinkWithPreview().
   */
  function isStructureLinkReference(node: Node): node is LinkReference {
    return isLinkReference(node) && structureDefinitions.has(node.identifier);
  }

  function replaceLinkWithPreview(
    node: Link | LinkReference,
    parents: Parent[]
  ) {
    // depending on if the node is a direct link or a reference-style link,
    // we get its URL differently.
    let relativeStructureUrl: string;
    let isInline = false;
    if (isLink(node)) {
      relativeStructureUrl = node.url;
    } else if (isLinkReference(node)) {
      relativeStructureUrl = structureDefinitions.get(node.identifier);
    } else {
      return;
    }

    if (relativeStructureUrl.endsWith('?inline')) {
      relativeStructureUrl = relativeStructureUrl.split('?inline')[0];
      isInline = true;
    }

    const relativeStructurePath = `${relativeStructureUrl}.md`;

    // No file content promise available, so add one and then wait
    // on it being resolved when the structure doc is processed
    if (!fileContent.has(relativeStructurePath)) {
      let resolve: (value: Parent) => void;
      let reject: (err: Error) => void;

      // Set a timeout as a backstop so we don't deadlock forever if something
      // causes content to never be resolved - in theory an upstream change in
      // Docusaurus could cause that if they limited how many files are being
      // processed in parallel such that too many docs are awaiting others
      const timeoutId = setTimeout(() => {
        // links in translated locale [xy] have their paths prefixed with /xy/
        const isTranslatedDoc = !relativeStructurePath.startsWith('/docs/');

        if (isTranslatedDoc) {
          // If we're running locally we might not have translations downloaded
          // so if we don't find it locally just supply the default locale
          const [_fullPath, locale, docPath] = relativeStructurePath.match(
            /\/([a-z][a-z])\/docs\/(.*)/
          );
          const defaultLocalePath = `/docs/${docPath}`;
          const localeDir = path.join(__dirname, '..', '..', 'i18n', locale);

          if (!fs.existsSync(localeDir)) {
            if (fileContent.has(defaultLocalePath)) {
              const { promise } = fileContent.get(defaultLocalePath);
              promise.then((content) => resolve(content));
              return;
            }
          }
        }

        reject(
          new Error(
            `Timed out waiting for API structure content from ${relativeStructurePath}`
          )
        );
      }, 60000000);

      const promise = new Promise<Parent>((resolve_, reject_) => {
        resolve = (value: Parent) => {
          clearTimeout(timeoutId);
          resolve_(value);
        };
        reject = reject_;
      });

      fileContent.set(relativeStructurePath, { promise, resolve });
    }

    const { promise: targetStructure } = fileContent.get(relativeStructurePath);

    if (
      (Array.isArray(node.children) &&
        node.children.length > 0 &&
        isText(node.children[0])) ||
      isInlineCode(node.children[0])
    ) {
      mutations.add(
        targetStructure
          .then((structureContent) => {
            if (isInline) {
              const siblings = parents[parents.length - 1].children;
              const filtered = filter(
                structureContent,
                (node) => node.type !== 'mdxjsEsm' && node.type !== 'heading'
              );
              siblings.push(filtered);
            } else {
              // replace the Link node with an MDX element in-place
              const title = (node.children[0] as Text | InlineCode).value;
              const previewNode = node as unknown as MdxJsxFlowElement;
              previewNode.type = 'mdxJsxFlowElement';
              previewNode.name = 'APIStructurePreview';
              previewNode.children = [];
              previewNode.data = {
                _mdxExplicitJsx: true,
              };
              previewNode.attributes = [
                {
                  type: 'mdxJsxAttribute',
                  name: 'url',
                  value: `${relativeStructureUrl}`,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'title',
                  value: title,
                },
                {
                  type: 'mdxJsxAttribute',
                  name: 'content',
                  value: JSON.stringify(structureContent),
                },
              ];
            }
          })
          .catch((err) => {
            logger.error(err);
            // NOTE - if build starts failing, comment the throw out
            throw err;
          })
      );
    }
  }
  visitParents(tree, checkLinksandDefinitions, replaceLinkWithPreview);
  visitParents(tree, isStructureLinkReference, replaceLinkWithPreview);
  await Promise.all(Array.from(mutations));

  if (file.path.includes('/api/structures/')) {
    let relativePath = `/${path.relative(file.cwd, file.path)}`;

    const isTranslatedDoc = relativePath.startsWith('/i18n/');
    // these need to be handled differently because their filesystem path is more complex
    // /de/docs/latest/api/structures/object.md is actually served from
    // /i18n/de/docusaurus-plugin-content-docs/current/latest/api/structures/object.md
    if (isTranslatedDoc) {
      const [_fullPath, locale, docPath] = relativePath.match(
        /\/i18n\/([a-z][a-z])\/docusaurus-plugin-content-docs\/current\/(.*)/
      );
      relativePath = `/${locale}/docs/${docPath}`;
    }

    if (fileContent.has(relativePath)) {
      const { resolve } = fileContent.get(relativePath);
      if (resolve) resolve(tree);
    } else {
      fileContent.set(relativePath, { promise: Promise.resolve(tree) });
    }
  }
  const importNode = getJSXImport('APIStructurePreview');
  if (mutations.size) {
    tree.children.unshift(importNode);
  }
}
