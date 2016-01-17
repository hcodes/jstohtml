jstohtml
========
[![NPM version](https://img.shields.io/npm/v/jstohtml.svg?style=flat)](https://www.npmjs.com/package/jstohtml)
[![Build Status](https://img.shields.io/travis/hcodes/jstohtml.svg?style=flat)](https://travis-ci.org/hcodes/jstohtml)
[![Coverage Status](https://img.shields.io/coveralls/hcodes/jstohtml.svg?style=flat)](https://coveralls.io/r/hcodes/jstohtml)

[![Dependency Status](https://img.shields.io/david/hcodes/jstohtml.svg?style=flat)](https://david-dm.org/typograf/typograf) [![devDependency Status](https://img.shields.io/david/dev/typograf/typograf.svg?style=flat)](https://david-dm.org/hcodes/jstohtml#info=devDependencies)


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
var jstohtml = require('jstohtml');
console.log(jstohtml({c: 'Hello world!'}));
```

##Examples

### Elementary
```JavaScript
jstohtml('Hello world!');
// "Hello world!"
 
jstohtml({});
// "<div></div>"
 
jstohtml({cl: 'main'});
// "<div class="main"></div>"

jstohtml({cl: ['main', 'red']});
// "<div class="main red"></div>"

jstohtml({
    title: 'My title',
    'data-a': 123,
    style: 'font-size: 2em'
});
// "<div title="My title" data-a="123" style="font-size: 2em"></div>"

jstohtml({t: 'p', cl: ['main', 'red'], c: 'Content'});
// "<p class="main red">Content</p>"

jstohtml([]);
// ""

jstohtml([{}, {}]);
// "<div></div><div></div>"

jstohtml([{c: {c: 'Content'}}]);
// "<div><div>Content</div></div>"

jstohtml([{
    c: [{
        c: 'Content1'
    }, {
        c: 'Content2'
    }]
}]);
// "<div><div>Content1</div><div>Content2</div></div>"
```

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
