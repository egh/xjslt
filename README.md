# XJSLT - An XSLT compiler in TypeScript

XJSLT is an [XSLT 2.0](https://www.w3.org/TR/xslt20/) compiler written in TypeScript, depending on [fontoxpath](https://github.com/FontoXML/fontoxpath) for an XPath implementation.

XJSLT compiles stylesheets to runnable JavaScript, so you can create transforms for use in a browser.

Tested with [node 20](https://nodejs.org/) and (less extensively) in Chrome and Firefox.

# Installation:
- `npm install && npm run build`

# Use:
- `xjslt test/simple2.xslt test/simple.xml`

# Stylesheet compilation example:
- `xjslt compile jats-html.xsl` (will generate a `transform.js` file)
- Open `example.html` (will load the generated `transform.js` file)

# Supported features
- 1882 passing tests in the XSLT test suite (https://github.com/w3c/xslt30-test)
- 2522 not passing

- `if`/`choose/when/otherwise` - conditional evaluation
- `template`
- `apply-templates`/`for-each` - recursive evaluation
- `element`/`attribute`/`value-of` - dynamic elements, attributes, and text
- literal text and xml element output
- `variable`
- namespaces
- `sort`
- `include`

# Incompletely supported features
- `for-each-group` (only `group-by` supported)
- `import` (precedence not supported)

# TODO (not yet implemented)
- [ ] `strip-space`/`preserve-space`
- [ ] `output`
- [ ] `attribute-set`
- [ ] … (probably other things I’m not aware of or forgot)
