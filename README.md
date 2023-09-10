# markdown-it-color-inline

Made this because the original wasn't working on my SvelteKit app, so now it does.

## install

```shell
npm install markdown-it-color --save
```

## use

```javascript
var md = require('markdown-it')().use(require('markdown-it-color'));
```

or

```javascript
import markdownItColor from 'markdown-it-color-inline';

const md = new MarkdownIt().use(markdownItColor);
```

## API

You can add options. Default option is below.

```javascript
var md = require('markdown-it')().use(require('markdown-it-color'), {
	defaultClassName: 'md-colorify', // default
	defaultIdName: 'md-convert', // default
});

md.render('{red}(sample)'); // => '<span id="md-convert" class="md-colorify md-colorify--red" style="color: red;">sample</span>'
```

The original has a non-inline version, so if you want that, head [to the original](https://github.com/nkjmsss/markdown-it-color).
