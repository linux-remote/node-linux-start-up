const fs = require('fs');
const path = require('path');
const rawFilePath = '/etc/rc.d/rc.local';
const note = `// linux-remote start-up`;
const childProcess = require('child_process');
function init(confJsPath) {
    
    const raw = fs.readFileSync(rawFilePath, 'utf-8');
    if(raw.indexOf(content) === -1) {
        fs.writeFileSync(lrConfigFilePath);
        let cmd = process.argv[0] + ' ' + confJsPath;
        const content = note + '\n' + cmd;
        fs.appendFileSync(rawFilePath, content, 'utf-8');
        childProcess.execSync(cmd);
    }
};

exports.init = init;
