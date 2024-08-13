# XJSLT - An XSLT compiler in TypeScript

XJSLT is an [XSLT 2.0](https://www.w3.org/TR/xslt20/) compiler (targeting JavaScript) written in TypeScript, depending on [fontoxpath](https://github.com/FontoXML/fontoxpath) for an XPath implementation.

XJSLT compiles stylesheets to runnable JavaScript, so you can create transforms for use in a browser.

Tested with [node 20](https://nodejs.org/) and (less extensively) in Chrome and Firefox.

# Installation:
- `npm install && npm run build`

# Use:
- `xjslt test/simple2.xslt test/simple.xml`

# Compilation examples
## In the browser
- `xjslt compile --web jats-html.xsl examples/html/transform.js`
- Open `examples/html/example.html` (will load the generated `transform.js` file)

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
- 1985 passing tests in the XSLT test suite (https://github.com/w3c/xslt30-test)
- 2419 not passing

- `if`/`choose/when/otherwise` - conditional evaluation
- `template`
- `apply-templates`/`for-each` - recursive evaluation
- `element`/`attribute`/`value-of` - dynamic elements, attributes, and text
- literal text and xml element output
- `variable`
- namespaces
- `sort`
- `include`
- `result-document`

# Incompletely supported features
- `for-each-group` (only `group-by` supported)
- `import` (precedence not supported)
- `function` basically working, with better typing TBD
- `output` not all options supported

# TODO (not yet implemented)
- [ ] `strip-space`/`preserve-space`
- [ ] `attribute-set`
- [ ] … (probably other things I’m not aware of or forgot)
