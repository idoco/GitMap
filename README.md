# [GitMap Demo](https://idoco.github.io/GitMap/)
**A location based job board powered only by GitHub.**

This demo explores the possibility of building a location based app by using *only* [GitHub's cool ability to render GeoJSON files](https://help.github.com/articles/mapping-geojson-files-on-github/) as - interactive, browsable, annotated maps ([example](map.geojson)), and the powerful GitHub API (Nicely wrapped by [Github.js](https://github.com/michael/github)). You can think of it as a "serverless" GitHub architecture.

![gitmap](https://cloud.githubusercontent.com/assets/5776439/12868306/39998b0e-cd0c-11e5-9e0f-77670fed4eeb.png)

#### How GitMap Works?
- The static site is served by GitHub pages.
- The main page loads a `render.githubusercontent` iframe which renders the [map.geojson](map.geojson) as a full screen map.
- When publishing a new entry, your browser will execute the calls to GitHub API by using [Github.js](https://github.com/michael/github)
- A request will be sent by you to fork this repository.
- The [map.geojson](map.geojson) file in the forked repository will be edited to contain the new published data.
- A pull request will be created on your behalf, to merge the new data to the main repository.
- Your pull request will be manually approved and merged, and the new data will show up on the map after a few moments. 

#### GitHub Authentication
[GitHub OAuth](https://developer.github.com/v3/oauth/) requires that a secret client key will be used to convert the GitHub user login code to the authorization token. Since it is considered unsafe to expose this key, instead of storing it in the webapp I had set up a small [hook.io](https://hook.io/) hook to do the conversion using the secret key. Because this architecture is very irregular I am not sure that [the impact of exposing the client secret](http://tools.ietf.org/html/rfc6819#section-4.1.1) fully apply to it, so I will reconsider this in the future.

#### Why is [map.geojson](https://github.com/idoco/GitMap/blob/gh-pages/map.geojson?short_path=5406685) filed with empty entries?
This was a very simple trick to avoid merge conflicts issues. Every user adds his new entry in a random line in the file, which makes the chances of two users editing the same line simultaneously very slim. (The probability might still be higher than what you would expect as in the similar case of the [Birthday problem](https://en.wikipedia.org/wiki/Birthday_problem)) 

#### My first project with react
![Me working with react](http://i1.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg)

