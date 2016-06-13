var fs = require('fs');
var LineByLineReader = require('line-by-line');
var lr = new LineByLineReader('./domain.txt');

var lineArr = [];

lr.on('line', function (line) {
    line = line.trim();
    if (line && !line.startsWith('#')) {
        var str = '';
        if (line.startsWith('*.')) {
            str = 'DOMAIN-SUFFIX,' + line.replace('*.', '');
        } else if (line.startsWith('*') && line.endsWith('*')) {
            str = 'DOMAIN-KEYWORD,' + line.replace(/(^\*)|(\*$)/g, '');
        } else {
            str = 'DOMAIN,' + line;
        }
        lineArr.push(str + ',REJECT');
    }
}).on('end', function () {
    fs.writeFileSync('./surge.conf', fs.readFileSync('./simple.conf').toString().replace('# {{DOMAINS}}', lineArr.join('\n')));
});
