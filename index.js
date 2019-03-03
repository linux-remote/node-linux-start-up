const fs = require('fs');
const rawFilePath1 = '/etc/rc.local';
const rawFilePath2 = '/etc/rc.d/rc.local';
const NOTE_START = `# lr-sys-app-start-up start`;
const NOTE_END = `# lr-sys-app-start-up end`;
const END_EXIT = 'exit 0';
const childProcess = require('child_process');
//const path = require('path');

//
function init(confJsPath) {
    let raw, rawFilePath;
    try {
        raw = fs.readFileSync(rawFilePath1, 'utf-8');
        rawFilePath = rawFilePath1;
    } catch (e) {
        raw = fs.readFileSync(rawFilePath2, 'utf-8');
        rawFilePath = rawFilePath2;
    }
    if(raw.indexOf(NOTE_START) === -1) {
        fs.writeFileSync(confJsPath);
        let cmd = process.argv.join(' ');
        cmd = 'LR_IS_START_UP=1 ' + cmd;
        let content = '\n' + NOTE_START + '\n' + cmd + '\n' + NOTE_END + '\n\n';
        const lastIndex = raw.lastIndexOf(END_EXIT);
        const pre = raw.substr(0, lastIndex);
        const next = raw.substr(lastIndex);
        content = pre + content + next;
        fs.writeFileSync(rawFilePath, raw, 'utf-8');
    }
};

function start(confArr) {
    if(process.env.LR_IS_START_UP) {
        confArr.forEach(v => {
            childProcess.exec(v.cmd);
        })
    } else {
        init();
    }
}
exports.init = init;
exports.start = start;
