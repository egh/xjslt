# XJSLT - An XSLT transpiler in TypeScript

XJSLT is an [XSLT 2.0](https://www.w3.org/TR/xslt20/) transpiler (targeting JavaScript) written in TypeScript, depending on [fontoxpath](https://github.com/FontoXML/fontoxpath) for an XPath implementation.

XJSLT works by compiling stylesheets to runnable JavaScript. These compiled stylesheets can be used immediately in the command line, or they can be save for later use in the command line. They can also be used programmatically either in the browser or in another JavaScript runtime.

Tested with [node 20](https://nodejs.org/) and in Chrome and Firefox.

# Getting started

## Installation:

- `npm install && npm run build`

## Command line invocation:

- `xjslt jats-html.xsl <(curl -s https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml)`

# Compilation examples

XJSLT can compile XSLT stylesheets into executable JavaScript code, which can then be deployed to various platforms that support JavaScript, including the browser, NodeJS, and potentially other JavaScript runtimes. The following are some examples of how to do this for the browser, google cloud functions, and cloudflare edge functions. Note that this compiled `.js` may need to be recompiled if the xjslt version changes.

## In the browser

- `xjslt compile --web jats-html.xsl examples/html/transform.js`
- Open `examples/html/example.html` (will load the generated `transform.js` file)

## For reuse in the command line

- `xjslt compile jats-html.xsl`
- `xjslt transform.js <(curl -s https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml)`

## In a google cloud function

- `xjslt compile --standalone jats-html.xsl examples/google-cloud/transform.js`
- `cd examples/google-cloud`
- `npm install`
- `npx @google-cloud/functions-framework --target=transform`
- Visit http://localhost:8080/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

## In a cloudflare edge function

- `xjslt compile --standalone jats-html.xsl examples/cloudflare/src/transform.js`
- `cd examples/cloudflare`
- `npm install`
- `npm run start`
- Visit http://localhost:8787/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

## Programmatic API (Node.js)

Use `compile` from `xjslt/compile` to build a transform function directly in
Node.js without writing any files to disk. The stylesheet is passed as a parsed
document, and the returned function can be called immediately.

```ts
import * as slimdom from "slimdom";
import { readFileSync } from "fs";
import { compile } from "xjslt/compile";

const stylesheetPath = "jats-html.xsl";
const xslt = slimdom.parseXmlDocument(readFileSync(stylesheetPath, "utf-8"));
const transform = await compile(xslt);

// Transform an XML document
const input = slimdom.parseXmlDocument(readFileSync("article.xml", "utf-8"));
const results = transform(input);
const resultDocument = results.get("#default");

const xml = slimdom.serializeToWellFormedString(resultDocument);

console.log(xml);
```

# Supported features

- `if`/`choose/when/otherwise` - conditional evaluation
- `template`
- `apply-templates`/`for-each` - recursive evaluation
- `element`/`attribute`/`value-of` - dynamic elements, attributes, and text
- literal text and xml element output
- `variable`
- namespaces
- `sort`
- `include`/`import`
- `result-document`
- `for-each-group`
- 2596 passing tests in the XSLT test suite (https://github.com/w3c/xslt30-test) (2957 not passing)

# Incompletely supported features

- `function` basically working, with better typing TBD
- `output` not all options supported
- `number` basic support, not all options supported

# TODO (not yet implemented)

- [ ] `analyze-string` (depends on https://github.com/bwrrp/xspattern.js/issues/9)
- [ ] tunneled parameters
- [ ] … (probably other things I’m not aware of or forgot)

# Running tests

The test suite includes both unit tests and a subset of the [W3C XSLT 3.0 test suite](https://github.com/w3c/xslt30-test). To run tests:

1. Clone the W3C test suite into the project root:
   ```
   git clone --depth=1 https://github.com/w3c/xslt30-test.git
   ```
2. Build (including preprocessors):
   ```
   npm run build-preprocessors
   ```
3. Run tests:
   ```
   npm test
   ```

# Contributing

- Some functionality, including import and include, is implemented in terms of preprocessors: xslt stylesheets that are applied to the xslt stylesheet itself before it is compiled. If you make changes that impact these preprocessors, you will need to run `npm run build-preprocessors` to recompile them.
