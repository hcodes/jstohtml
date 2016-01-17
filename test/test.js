var assert = require('chai').assert,
    jstohtml = require('../dist/jstohtml');
   
var c = function(a, b, c) {
    assert.strictEqual(jstohtml(a), b, c);
};

describe('API', function() {
    it('Simple', function() {
        c('', '', 'Empty string');

        c('Hello', 'Hello', 'String');

        c(null, '', 'null');

        c(undefined, '', 'undefined');

        c(123, '123', 'number');

        c(/regexp/, '/regexp/', 'regexp');

        c([], '', 'Array');
    });
    
    it('Attrs', function() {
        c({align: true}, '<div align="true"></div>', 'align: true');

        c({align: false}, '<div></div>', 'align: false');

        c({align: null}, '<div></div>', 'align: null');

        c({align: 123}, '<div align="123"></div>', 'align: 123');
        
        c({align: {}}, '<div align="[object Object]"></div>', 'align: {}');
        
        c({align: []}, '<div align=""></div>', 'align: []');

        c({align: ['first', 'second']}, '<div align="first second"></div>', 'align: ["first", "second"]');
        
        c({align: 'center'}, '<div align="center"></div>', 'align: "center"');    

        c({cl: 'center'}, '<div class="center"></div>', 'cl: "center"');

        c({cl: ['first', 'second']}, '<div class="first second"></div>', 'cl: ["first", "second"]');

        c({cl: '<p>"Hello"</p>'}, '<div class="&lt;p&gt;&quot;Hello&quot;&lt;&#x2F;p&gt;"></div>', 'Escaping a attr');

        c({'data-id': 123, cl: 'warning'}, '<div class="warning" data-id="123"></div>', 'Always first class');
    });

    it('Tags', function() {
        c({}, '<div></div>', 'div');

        c({t: 'img', src: 'a.png'}, '<img src="a.png"/>', 'img');
     
        c({t: 'br'}, '<br/>', 'br');
     
        c({t: 'span'}, '<span></span>', 'span');
    });

    it('Children', function() {
        c({c: 'Hello'}, '<div>Hello</div>', 'c: "Hello"');
     
        c({c: {t: 'span', cl: 'first', c: 'Hello'}}, '<div><span class="first">Hello</span></div>', 'c: ...');
     
        c({c: []}, '<div></div>', 'c: []');
     
        c({c: [{}, {}]}, '<div><div></div><div></div></div>', 'c: [{}, {}]');
     
        c({c: ['Hello', ' ', 'world!']}, '<div>Hello world!</div>', 'c: [\'Hello\', \' \', \'world!\']');
    });
});
