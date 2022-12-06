# electronjs.org

This repository contains the code for the [Electron](https://www.electronjs.org/) website. It is built using
[Docusaurus 2](https://v2.docusaurus.io/), a modern static website generator.

## Installation

```console
yarn install
```

## How to modify the documentation

For English documentation the changes need to happen upstream in [`electron/electron`][]. These
changes are picked automatically as soon as they are done in the stable branch. The exception
is when there is a new major release.

The translation work happens in [Crowdin] and the changes are picked up periodically every
15 minutes.

Any documentation changes done manually in this repo will be eventually override by any of these
updates.

## How to add a new blogpost

To add a new blogpost you need to create a new markdown file under `/blog`. The supported
frontmatter options are the ones documented in [Docusaurus](https://docusaurus.io/docs/blog#adding-posts).

There are a couple of things that are different compared to the previous blog engine:

1. There can only be one author. If there are several people working on a post please sign it at the end.
1. The frontmatter `date` property with the format `YYYY-MM-DD` is not supported. The options to indicate the date are:
   * Write the date in the filename: `YYYY-MM-DD-blogpost-slug`
   * Use the output of `(new Date('YYYY-MM-DD')).toString()` and paste it in the frontmatter section:
     ```yml
     date: 2019-05-13T00:00:00.000Z
     ```

To see your changes (and have hot-reload), run the following commands:

```console
yarn pre-build
yarn start
```

Note: `yarn pre-build` is only necessary the first time to get content under `/docs`.

## Local Development

If you want to use the contents from [`electron/electron`][] run the following:

```console
yarn pre-build
yarn start
```

If you want the website to pick your local documentation, run:

```console
yarn pre-build ../relative/path/to/local/electron/repo
yarn start
```

For example, if you have the following structure:

```
└── projects
     ├─ electron
     ├─ electronjs.org-new
     ├─ ...
```

and assuming your prompt is in `/projects/electronjs.org-new/` you will have to run:

```console
yarn pre-build ../electron
yarn start
```

`yarn start` starts a local development server and open up a browser window. Most changes are reflected live without having to restart the server.

# Repository content organization

This repository contains the code for 2 related things:

- The code to generate the contents of https://beta.electronjs.org
- [`create-electron-documentation`][ced] package

The content of this repository is organized as follows:

```
└─ root
    |
    ├─ .github/workflows → The definitions for the GitHub actions
    |
    |
    ├─ create-electron-documentation → Code for the npm package
    |        of the same name. Read the readme in the folder
    |        for more information.
    |
    ├─ scripts → The code for the package.json tasks and GitHub
    |        actions
    |
    ├─ spec → Tests for the scripts
    |
    ├─ src → Docusaurus code
    |
    ├─ static → Docusaurus static assets
```

[ced]: https://npmjs.com/package/create-electron-documentation
[Crowdin]: https://crowdin.com/project/electron
[`electron/electron`]: https://github.com/electron/electron/tree/main/docs
