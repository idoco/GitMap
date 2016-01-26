const exec = require('child_process').exec;

function GitExecUtil() {}

/**
 * Do not let any user input get here
 */
GitExecUtil.commitData = function(cwd, fileName, message){

    var pullCommand     = 'git pull';
    var addCommand      = 'git add ' + fileName;
    var commitCommand   = 'git commit -m \"' + message + '\"';
    var pushCommand     = 'git push';

    exec(pullCommand, { cwd: cwd }, function (err, stdout, stderr) {
        if (err) return console.error("git pull failed", err, stdout, stderr);

        exec(addCommand, { cwd: cwd }, function (err, stdout, stderr) {
            if (err) return console.error("git add failed", err, stdout, stderr);

            exec(commitCommand, { cwd: cwd }, function (err, stdout, stderr) {
                if (err) return console.error("git commit failed", err, stdout, stderr);
                exec(pushCommand, { cwd: cwd }, function (err, stdout, stderr) {

                    if (err) return console.error("git push failed", err, stdout, stderr);
                    else console.info(stdout);
                });
            });
        });
    });
};

module.exports = GitExecUtil;