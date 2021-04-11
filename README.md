# XJSLT - An incomplete XSLT processor in pure TypeScript

XJSLT is an incomplete implementation of an [XSLT 2.0](https://www.w3.org/TR/xslt20/) processor written in native TypeScript.

XJSLT compiles stylesheets to runnable JavaScript, so it should be possible to create pure-javascript runnable transforms for use in a browser.

Tested with [node 14.16.1](https://nodejs.org/)

# Use:

- `npm install && npm run build`
- `xjslt test/simple2.xslt test/simple.xml`

# Supported features
- `if`/`choose/when/otherwise` - conditional evaluation

# Incompletely supported features

- `template` - named templates, priority, mode, and params are not yet support
- `apply-templates`/`for-each` - recursive evaluation
- `element`/`attribute`/`value-of` - dynamic elements, attributes, and text
- literal text and xml element output

# TODO (not yet implemented)
- [ ] `include`
- [ ] `strip-space`/`preserve-space`
- [ ] `output`
- [ ] `key`
- [ ] `sort`
- [ ] variables
- [ ] `attribute-set`
- [ ] template priority
- [ ] template mode
- [ ] template params
- [ ] webpack compilation for browsers
- [ ] …
