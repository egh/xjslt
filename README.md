# XJSLT - An incomplete, experimental XSLT processor in pure TypeScript

XJSLT is a proof-of-concept implementation of an [XSLT](https://www.w3.org/TR/xslt11/) processor written in native TypeScript.

XJSLT compiles stylesheets to runnable JavaScript, so it should be possible to create pure-javascript runnable transforms for use in a browser.

Tested with [node 14.16.1](https://nodejs.org/)

# Use:

- `npm install && npm run build`
- `xjslt test/simple2.xslt test/simple.xml`

# Supported XSLT 1.0 features

- `template` - named templates, priority, mode, and params are not yet support
- `apply-templates`/`for-each` - recursive evaluation
- `if`/`choose/when/otherwise` - conditional evaluation
- `element`/`attribute` - dynamic elements and attributes
- `value-of` - outputting literal text
- literal xml output

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
