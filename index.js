const fs = require('fs');
const rawFilePath1 = '/etc/rc.local';
const rawFilePath2 = '/etc/rc.d/rc.local';
const NOTE_START = `# node-linux-start-up start`;
const END_EXIT = 'exit 0';
const childProcess = require('child_process');
//const path = require('path');
const MARK = 'IS_NODE_START_UP=1';
//
function init() {
    let raw, rawFilePath, content;
    try {
        raw = fs.readFileSync(rawFilePath1, 'utf-8');
        rawFilePath = rawFilePath1;
    } catch (e) {
        raw = fs.readFileSync(rawFilePath2, 'utf-8');
        rawFilePath = rawFilePath2;
    }
    const cmd = initCmd();
    const markIndex = raw.indexOf(MARK);
    if(markIndex === -1) {
        content = '\n' + NOTE_START + '\n' + cmd + '\n\n';
        const lastIndex = raw.lastIndexOf(END_EXIT);
        const pre = raw.substr(0, lastIndex);
        const next = raw.substr(lastIndex);
        content = pre + content + next;
    } else {
        // update
        if(raw.indexOf(cmd) === -1) {
            const pre = raw.substr(0, markIndex);
            let next = raw.substr(markIndex);
            next = next.substr(next.indexOf('\n'));
            content = pre + cmd + next;
            
        }

    }
    if(content) {
        // console.log('content', content);
        fs.writeFileSync(rawFilePath, content, 'utf-8');
    }
};
function initCmd() {
    let cmd = process.argv.join(' ');
    cmd = MARK + ' ' + cmd;
    return cmd;
}
function start(confArr) {
    if(process.env.LR_IS_START_UP) {
        confArr.forEach(v => {
            childProcess.exec(v.cmd);
        })
    } else {
        init();
    }
}

module.exports = start;
