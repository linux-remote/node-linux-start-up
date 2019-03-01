const fs = require('fs');
const path = require('path');
const rawFilePath = '/etc/rc.d/rc.local';
const lrConfigFilePath = path.join(__dirname, 'config.sh');
const content = '// LR-N';
function init() {
    
    const raw = fs.readFileSync(rawFilePath, 'utf-8');
    if(raw.indexOf(content) === -1) {
        fs.writeFileSync(lrConfigFilePath);
        fs.appendFileSync(rawFilePath, content, 'utf-8');
    }
};

exports.init = init;
