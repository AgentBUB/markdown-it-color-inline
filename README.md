# markdown-it-color-inline

After a lot of working, starting with a fork, then making my own package, I got my first npm package running.
I made this to work on my SvelteKit project because the ones I tried just errored out in production, so here we are.
Shout out to [nkjmsss](https://github.com/nkjmsss/markdown-it-color) and [yusu79](https://github.com/yusu79/markdown-it-mojicolor) as those package/creators are what I used to peace together this. _I did a little copy & paste from both, so please do go view their amazing work._

## install

```shell
npm i markdown-it-color-inline --save
```

## use

```javascript
var md = require('markdown-it')().use(require('markdown-it-color-inline'));
```

or

```javascript
import markdownItColorInline from 'markdown-it-color-inline';

const md = new MarkdownIt().use(markdownItColor);
```

## API

You can add options. Default option is below.

```javascript
var md = require('markdown-it')().use(require('markdown-it-color'));

md.render('{red}(sample)'); // => '<span id="md-convert" style="color: red;">sample</span>'
```

_If I learn how npm packages work better, I will add a config for the id._
