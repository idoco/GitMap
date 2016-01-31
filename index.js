/**
 * Created by idoco on 29/1/2016.
 * buttons logic
 */

var username, password;

function refreshMap() {
    var iFrame = document.getElementById("mapFrame");
    //noinspection SillyAssignmentJS
    iFrame.src = iFrame.src;
}

function postRandomEntry() {
    if (!username || !password) {
        username = prompt("Please enter GitHub username");
        password = prompt("Please enter GitHub password");
    }

    window.github = new Github({
        username: username,
        password: password,
        auth: "basic"
    });

    var repo = window.github.getRepo("idoco", "GeoJsonHack");
    repo.getTree('gh-pages', function(err, repo) {
        console.log(repo);
    });
}
