import { Details } from '@docusaurus/theme-common/Details';
import React from 'react';
import ReactMarkdown from 'react-markdown';

import {
  ApiHistory,
  PrReleaseVersions,
  PrReleaseVersionsContainer,
} from '../transformers/api-history';
import styles from './ApiHistoryTable.module.scss';

enum Change {
  ADDED = 'API ADDED',
  CHANGED = 'API CHANGED',
  DEPRECATED = 'API DEPRECATED',
}

interface ApiHistoryTableProps {
  apiHistoryJson: string;
  prReleaseVersionsJson: string;
}

function generateTableRow(
  prReleaseVersions: PrReleaseVersions | undefined,
  type: Change,
  change: NonNullable<ApiHistory[keyof ApiHistory]>[0]
) {
  const key = change['pr-url'] + '-' + type;

  const allVersions: Array<string> = [];

  const release = prReleaseVersions?.release;
  if (release) allVersions.push(release);

  const backports = prReleaseVersions?.backports;
  if (backports) allVersions.push(...backports);

  // Sort by major version number e.g. 30.0.0 -> 30 in ascending order i.e. 29, 30, ...
  allVersions.sort((a, b) => Number(a.split('.')[0]) - Number(b.split('.')[0]));

  const formattedVersions: JSX.Element[] = [];

  for (const version of allVersions) {
    const [, minor, patch] = version.split('.');
    const isBackportMajor =
      release !== version && minor === '0' && patch === '0';

    const formattedVersion = (
      <a
        key={version}
        href={change['pr-url']}
        target="_blank"
        rel="noopener noreferrer"
      >
        {/* Semver shenanigans, feature backported to both ^7.1.0 and ^6.3.0 would not be present in 7.0.0 */}
        <pre>
          {release === version || isBackportMajor ? '>=' : '^'}
          {version}
        </pre>
      </a>
    );

    formattedVersions.push(formattedVersion);

    // If backport is a major (i.e. >=x.0.0), no need to include the release or any other backports
    if (isBackportMajor) break;
  }

  // Reverse the order of the versions so that the latest version is first i.e. 30, 29, ...
  formattedVersions.reverse();

  let changesJsx: JSX.Element | undefined;

  if ('description' in change) {
    changesJsx = (
      <ReactMarkdown
        allowedElements={['a', 'code', 'em', 'p', 'pre', 'strong']}
      >
        {change['description']}
      </ReactMarkdown>
    );
  } else {
    changesJsx = (
      <pre
        key={key}
        className={styles[type.toLowerCase().split(' ').join('-')]}
      >
        {type}
      </pre>
    );
  }

  if ('breaking-changes-header' in change) {
    changesJsx = (
      <a
        href={
          '/docs/latest/breaking-changes#' + change['breaking-changes-header']
        }
        target="_blank"
        rel="noopener noreferrer"
      >
        {changesJsx}
      </a>
    );
  }

  return (
    <tr key={key}>
      <td>
        {formattedVersions.length !== 0 ? formattedVersions : <pre>None</pre>}
      </td>
      <td>{changesJsx}</td>
    </tr>
  );
}

const ApiHistoryTable = (props: ApiHistoryTableProps) => {
  const { apiHistoryJson, prReleaseVersionsJson } = props;

  const apiHistory = JSON.parse(apiHistoryJson) as ApiHistory;
  const prReleaseVersions = JSON.parse(
    prReleaseVersionsJson
  ) as PrReleaseVersionsContainer;

  // ? Maybe this is too much abstraction?
  // ? Is it possible for neither the release or any of the backports for a change to be in a released stable version?
  //  In that case, there would be no point in generating a row for that change.
  const generateChangeRows = (changeType, changes) => {
    return (changes ?? []).map((change) => {
      const prNumber = Number(change['pr-url'].split('/').at(-1));
      return generateTableRow(prReleaseVersions[prNumber], changeType, change);
    });
  };

  const apiHistoryChangeRows = [
    ...generateChangeRows(Change.DEPRECATED, apiHistory.deprecated),
    ...generateChangeRows(Change.CHANGED, apiHistory.changes),
    ...generateChangeRows(Change.ADDED, apiHistory.added),
  ];

  return (
    <Details
      className={styles['api-history']}
      summary={<summary>History</summary>}
    >
      <table>
        <thead>
          <tr>
            <th>Version(s)</th>
            <th>Changes</th>
          </tr>
        </thead>
        <tbody>{apiHistoryChangeRows}</tbody>
      </table>
    </Details>
  );
};

export default ApiHistoryTable;
