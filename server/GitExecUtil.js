const exec = require('child_process').exec;

function GitExecUtil() {}

/**
 * Do not let any user input get here
 */
GitExecUtil.commitData = function(cwd, fileName, message){

    var addCommand      = 'git add ' + fileName;
    var commitCommand   = 'git commit -m \"' + message + '\"';
    var pushCommand     = 'git push';

    exec(addCommand, { cwd: cwd }, function (err, stdout, stderr) {
        if (err) { console.error("git add failed", err, stdout, stderr); return; }
        exec(commitCommand, { cwd: cwd }, function (err, stdout, stderr) {
            if (err) { console.error("git commit failed", err, stdout, stderr); return; }
            exec(pushCommand, { cwd: cwd }, function (err, stdout, stderr) {
                if (err) { console.error("git push failed", err, stdout, stderr); }
                else console.info(stdout);
            });
        });
    });
};

module.exports = GitExecUtil;