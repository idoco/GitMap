var nodegit = require("nodegit");
var pathToRepo = require("path").resolve("../../GeoJsonData/GeoJsonHack");
var fileName = "../../GeoJsonData/GeoJsonHack/data.geojson";

var repo;
var signature = nodegit.Signature.create("Foo bar",
    "foo@bar.com", 123456789, 60);

// Not working and I'm not sure why
nodegit.Repository.open(pathToRepo)
    // Load up the repository index and make our initial commit to HEAD
    .then(function(repository) {
        repo = repository;
        return repository.openIndex();
    })
    .then(function(index) {
        index.read(1);
        index.addByPath(fileName);
        index.write();
        return index.writeTree();
    })
    .then(function(oid) {
        return repo.createCommit("HEAD", signature, signature,
            "test commit from nodegit", oid, []);
    })
    .then(function() {
        return nodegit.Remote.lookup(repo, "origin");
    })
    .then(function(remote) {
        return remote.push(
            ["refs/heads/data:refs/heads/data"],
            {
                callbacks: {
                    credentials: function() {
                        return nodegit.Cred.userpassPlaintextNew(
                            "<token>",
                            "x-oauth-basic");
                    }
                }
            }
        );
    })
    .done(function() {
        console.log("Done!");
    });
