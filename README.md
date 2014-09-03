js2html
=======

Compact record format HTML at JavaScript.

## Usage
```HTML
<script src="js2html.js"></script>
<script>
	console.log(js2html({c: 'Hello world!'}));
	// <div><Hello world!</div>
</script>
```


##Examples

### Elementary
```JavaScript
js2html('Hello world!');
// "Hello world!"
 
js2html({});
// "<div></div>"
 
js2html({cl: 'main'});
// "<div class="main"></div>"

js2html({cl: ['main', 'red']});
// "<div class="main red"></div>"

js2html({
	title: 'My title',
	'data-a': 123,
	style: 'font-size: 2em'
});
// "<div title="My title" data-a="123" style="font-size: 2em"></div>"

js2html({t: 'p', cl: ['main', 'red'], c: 'Content'});
// "<p class="main red">Content</p>"

js2html([]);
// ""

js2html([{}, {}]);
// "<div></div><div></div>"

js2html([{c: {c: 'Content'}}]);
// "<div><div>Content</div></div>"

js2html([{
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
js2html([
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
