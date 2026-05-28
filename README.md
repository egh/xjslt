# XJSLT - An XSLT to JavaScript transpiler

XJSLT is a substantially complete and performant [XSLT 2.0](https://www.w3.org/TR/xslt20/) to JavaScript transpiler. XJSLT implements most features of XSLT 2 (see below for a few exceptions) and passes much of the test suite. XJSLT is written in TypeScript and depends on [fontoxpath](https://github.com/FontoXML/fontoxpath) for an XPath implementation. XJSLT runs faster than SaxonJS in our experiments.

XJSLT works by compiling stylesheets to runnable JavaScript. These compiled stylesheets can be used immediately in the command line, or they can be save for later use in the command line. They can also be used programmatically either in the browser or in another JavaScript runtime.

XJSLT runs in javascript runtimes and on the browser. It has been tested with [node](https://nodejs.org/) and in Chrome and Firefox.

# Getting started

## Installation:

```
npm install -g xjslt
```

Or use 

```
npx xjslt …
```
or from source:

```
git clone https://github.com/egh/xjslt.git && cd xjslt
```

## Command line invocation:

```
xjslt run <(curl -s https://raw.githubusercontent.com/egh/xjslt/refs/heads/main/jats-html.xsl) <(curl -s https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml)
```

# Compilation examples

XJSLT can compile XSLT stylesheets into executable JavaScript code, which can then be deployed to various platforms that support JavaScript, including the browser, NodeJS, and potentially other JavaScript runtimes. The following are some examples of how to do this for the browser, google cloud functions, and cloudflare edge functions. Note that this compiled `.js` may need to be recompiled if the xjslt version changes.

## In the browser

For the following commands you will want to have the source checked out.

```
xjslt compile --web jats-html.xsl examples/html/transform.js
```

- Open `examples/html/example.html` (will load the generated `transform.js` file)

## For reuse in the command line

Pre-compiling a `.js` file will speed up transformation.

```
xjslt compile jats-html.xsl
```
```
xjslt run transform.js <(curl -s https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml)
```

# Examples of use in cloud functions

XJSLT can be used to compile XSLT into JavaScript that can be used in, for example, cloud functions. Here are two examples of how it could be used in cloud functions to dynamically transform XML data into HTML.

## In a google cloud function

```
xjslt compile --standalone jats-html.xsl examples/google-cloud/transform.js
```
```
cd examples/google-cloud
```
```
npm install
```
```
npx @google-cloud/functions-framework --target=transform
```
- Visit http://localhost:8080/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

## In a cloudflare edge function

```
xjslt compile --standalone jats-html.xsl examples/cloudflare/src/transform.js
```
```
cd examples/cloudflare
```
```
npm install
```
```
npm run start
```
- Visit http://localhost:8787/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

# Supported features

All core features of XSLT 2.0.  Roughly 50% of tests in the XSLT test suite (https://github.com/w3c/xslt30-test) pass - but many of these tests are for edge cases.

# Incompletely supported features

- `function` basically working, with better typing TBD
- `output` not all options supported
- `number` basic support, not all options supported

# TODO (not yet implemented)

- [ ] `analyze-string` (depends on https://github.com/bwrrp/xspattern.js/issues/9)
- [ ] tunneled parameters

# Running tests

The test suite includes both unit tests and a subset of the [W3C XSLT 3.0 test suite](https://github.com/w3c/xslt30-test). To run tests, ensure dependencies are installed:


```
npm install
```
and then run:
```
npm test
```

# Contributing

- Some functionality, including import and include, is implemented in terms of preprocessors: xslt stylesheets that are applied to the xslt stylesheet itself before it is compiled. If you make changes that impact these preprocessors, you will need to run `npm run build-preprocessors` to recompile them.
