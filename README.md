jstohtml
========
[![NPM version](https://img.shields.io/npm/v/jstohtml.svg?style=flat)](https://www.npmjs.com/package/jstohtml)
[![NPM downloads](https://img.shields.io/npm/dm/jstohtml.svg?style=flat)](https://www.npmjs.com/package/jstohtml)
[![bundlephobia](https://badgen.net/bundlephobia/minzip/jstohtml)](https://bundlephobia.com/result?p=jstohtml)
[![install size](https://packagephobia.com/badge?p=jstohtml)](https://packagephobia.com/result?p=jstohtml)

Compact record format HTML at JavaScript.

## Usage
### Browser
```HTML
<script src="node_modules/jstohtml/dist/jstohtml.js"></script>
<script>
    console.log(jstohtml({c: 'Hello world!'}));
    // <div><Hello world!</div>
</script>
```
### Node.js
```
npm install jstohtml --save-dev
```

```js
import jstohtml from 'jstohtml';
console.log(jstohtml({c: 'Hello world!'}));
```

## Examples

### Elementary
| Input      | Output |
| ----------- | ----------- |
|`jstohtml('Hello world!');`|`Hello world!`|
|`jstohtml({});`|`<div></div>`|
|`jstohtml({cl: 'main'});`|`<div class="main"></div>`|
|`jstohtml({cl: ['main', 'red']});`|`<div class="main red"></div>`|
|`jstohtml({title: 'My title', 'data-a': 123, style: 'font-size: 2em'});`|`<div title="My title" data-a="123" style="font-size: 2em"></div>`|
|`jstohtml({t: 'p', cl: ['main', 'red'], c: 'Content'});`|`<p class="main red">Content</p>`|
|`jstohtml([]);`| |
|`jstohtml([{}, {}]);`|`<div></div><div></div>`|
|`jstohtml([{c: {c: 'Content'}}]);`|`<div><div>Content</div></div>`|
|`jstohtml([{c: [{c: 'Content1'}, {c: 'Content2'}] }]);`|`<div><div>Content1</div><div>Content2</div></div>`|

### BEM
| Input      | Output |
| ----------- | ----------- |
|`jstohtml({b: 'example'}); // block`|`<div class="example"></div>`|
|`jstohtml({b: 'example', e: 'elem'}); // block, elem`|`<div class="example__elem"></div>`|
|`jstohtml({b: 'example', m: {a: true, b: 'val'}}); // block, mod`|`<div class="example example_a example_b_val"></div>`|
|`jstohtml({b: 'example', e: 'elem', m: {a: true, b: 'val'}}); // block, elem, mod`|`<div class="example__elem example__elem_a example__elem_b_val"></div>`|

### Complex
```JavaScript
jstohtml([
    {
        c: 'Menu:'
    },
    {
        t: 'ul', // tag
        cl: ['menu', 'menu_theme-normal'], // class attribute
        c: [ // content or children
            {
                t: 'li',
                cl: 'menu-option',
                title: '1', // attribute
                'data-first': 'yes', // data attribute
                //...
                c: '1'
            }, {
                t: 'li',
                cl: 'menu-option',
                title: '2'
                c: '2'
            }, {
                t: 'li',
                cl: 'menu-option',
                title: '3',
                c: '3'
            }
        ]
    }
]);
```

```HTML
<div>Menu:</div>
<ul class="menu menu_theme-normal">
    <li class="menu-option" title="1" data-first="yes">1</li>
    <li class="menu-option" title="2">2</li>
    <li class="menu-option" title="3">3</li>
</ul>
```


## [License](./LICENSE)
