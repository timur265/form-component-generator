### Quick start

List of commands:

- `npm start` to start the project in development mode
- `npm run build:prod` to build the project in production mode to the `/dist` folder. Use `npm run serve:app` to serve this folder locally with HTTPS support.
- `npm run lint:check` to check the project using all available [linters](#linters-). This command should be a part of your CI setup.

NodeJS version is specified at `.nvmrc`. NPM version is specified at the `engines` section of `package.json`. Dependencies can not be installed with npm version lower to prevent unnecessary `package-lock.json` git conflicts, but can be opted-out by deleting `.npmrc`.

### Browser compatibility

The project is compatible with IE11.

- The Typescript compiler is configured to transpile Typescript to ES5.
- [es-check](https://github.com/dollarshaveclub/es-check) is run after each production build to make sure no 3rd-party libraries contain non-es5 code.
- It includes [polyfill.io](https://polyfill.io/v3/) to polyfill JS.
- It includes [autoprefixer](https://github.com/postcss/autoprefixer), [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) and [postcss-custom-media](https://github.com/postcss/postcss-custom-media) to provide CSS fallbacks.
- It includes [postcss-normalize](https://www.npmjs.com/package/postcss-normalize) to import the parts of [sanitize.css](https://github.com/csstools/sanitize.css) that are needed for compatible browsers.

**To change browser compatibility** just edit the `.browserlistrc` file in the root of the project.

### Developer tools

#### Typescript 🤓

[Why Typescript?](https://basarat.gitbook.io/typescript/getting-started/why-typescript) | [Typescript in 5 minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html) | [Advanced types](https://www.typescriptlang.org/docs/handbook/advanced-types.html)

The project is built with Typescript using a strict config. If a 3rd-party library is added to the project, which does not contain Typescript typing, a type definition should be written in `@types/${libName}/index.d.ts`. Don't forget to open a PR in the library's GitHub or in [Definetely Typed repository](https://github.com/DefinitelyTyped/DefinitelyTyped). Let's make the JS community type-safe together!

The project is **not type-checked during development run-time**, because it should be made on the CI server.

#### Styles 🎨

The project uses CSS instead of those fancy CSS-in-JS solutions. There are a lot of disadvantages in CSS, such as:

- Lack of isolation. Solved by using [css-modules](https://github.com/css-modules/css-modules).
- Lack of variables. Solved by using [postcss-custom-properties](https://github.com/postcss/postcss-custom-properties) as a fallback for browsers, which does not support [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*).
- Lack of theming. Solved by setting different root-level custom CSS properties. That works only in supported browsers, but that is a matter of graceful degradation.
- CSS-naming-convention is not `camelCase`, so is not so comfortable to be used in JS/TS code. Solved by using [css-loader's localsConvention option](https://webpack.js.org/loaders/css-loader/#localsconvention).

#### Linters 🚨

Linters are not your enemies, they help developers to avoid mistakes and to follow common specifications. This project contains the following linters:

- [prettier](https://prettier.io) - An opinionated code formatter. It helps us to have minimum git diffs by having a common code style.
- [esLint](https://eslint.org) - JS/TS linter. It helps us to avoid common mistakes and bad design patterns in Typescript code.
- [typescript](https://www.typescriptlang.org) - not a linter, but used as a linter to check if there any type problems in the project.
- [stylelint](https://stylelint.io) - CSS linter. It helps us to avoid CSS errors and orders CSS rules according to [idiomatic-css](https://github.com/necolas/idiomatic-css#declaration-order). [Why do we need to order it?](https://dev.to/thekashey/happy-potter-and-the-order-of-css-5ec).

Linters are useless if they are not integrated with the development workflow. This project provides you with the **following integrations**:

- VSCode users should install the recommended extensions. Files are fixed on every save automatically. Refer to [VSCode section](#vs-code-).
- [husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged) are used to automatically run linters across staged files on every git commit.
- Use `npm run lint:check` to check all the codebase at once. Configure this command to be run on your CI server.
- Use `npm run lint:write` to check all the codebase and fix issues automatically (if possible). **Use it after config change.**

#### VS Code 💻

The project is configured to be used in [VS Code](https://code.visualstudio.com/).

It contains `.vscode/extensions.json` file with a list of recommended extensions. Just open the extensions tab in your editor, and choose to show recommended extensions. Install those to have incredible development experience including all the linters support and amazing CSS modules autocompletion.

#### Production deps 💼

The project contains `webpack` and other build-time dependencies listed as production ones. This is not a mistake and done on a purpose.

It is common for a frontend project to list only dependencies, which are used inside a production bundle (e.g. `react`, `react-dom`, `@material-ui` or others) as production ones. But actually a frontend project is bundled before being distributed. So no dependencies are required during run-time.

So the solution is pretty straightforward - to list everything, which is required to build the project as production dependencies. To have an ability to install only those ones on the CD server and save some time.

## Code overview

### Folders

- `src/components` - Contains all the files which are used two or more times
- `src/pages` - Contains directories of pages
- `src/wrappers` - Contains files which wrap pages
