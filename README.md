# XJSLT - An XSLT compiler in TypeScript

XJSLT is an [XSLT 2.0](https://www.w3.org/TR/xslt20/) compiler (targeting JavaScript) written in TypeScript, depending on [fontoxpath](https://github.com/FontoXML/fontoxpath) for an XPath implementation.

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
- `xjslt compile jats-html.xsl examples/google-cloud/transform.js`
- `cd examples/google-cloud`
- `npm install`
- `npx @google-cloud/functions-framework --target=transform`
- Visit http://localhost:8080/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

## In a cloudflare edge function
- `xjslt compile jats-html.xsl examples/cloudflare/transform.js`
- `cd examples/cloudflare`
- `npm install`
- `npm run start`
- Visit http://localhost:8787/?url=https://jats.nlm.nih.gov/publishing/tag-library/1.1/FullArticleSamples/bmj_sample.xml

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
- 2108 passing tests in the XSLT test suite (https://github.com/w3c/xslt30-test) (2528 not passing)

# Incompletely supported features
- `for-each-group` (only `group-by` supported)
- `function` basically working, with better typing TBD
- `output` not all options supported

# TODO (not yet implemented)
- [ ] `strip-space`/`preserve-space`
- [ ] `attribute-set`
- [ ] `number`
- [ ] tunneled parameters
- [ ] … (probably other things I’m not aware of or forgot)
