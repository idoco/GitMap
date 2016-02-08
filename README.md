# [GitMap](https://idoco.github.io/GitMap/)
**A location based job board powered only by GitHub.**

This demo explores the possibility of building a location based app by using *only* [GitHub's cool ability to render GeoJSON files](https://help.github.com/articles/mapping-geojson-files-on-github/) as - interactive, browsable, annotated maps, and the powerful GitHub API (Nicely wrapped by [Github.js](https://github.com/michael/github)). You can think of it as a "serverless" GitHub architecture.

![gitmap](https://cloud.githubusercontent.com/assets/5776439/12868306/39998b0e-cd0c-11e5-9e0f-77670fed4eeb.png)

#### How GitMap works?
- The static site is served by GitHub pages.
- The main page loads a `render.githubusercontent` iframe which renders the [map.geojson](map.geojson) as a full screen map.
- When publishing a new entry, your browser will execute the calls to GitHub API by using [Github.js](https://github.com/michael/github)
- A request will be sent by you to fork this repository.
- The [map.geojson](map.geojson) file in the forked repository will be edited to contain the new published data.
- A pull request will be created on your behalf, to merge the new data to the main repository.
- I will manually merge and approve your pull requests and the new data will show up on the map in a few minutes. 

#### GitHub authentication 
Initially I have implement the new entry form with a place for you to put your GitHub credentials in it. Although the credentials were not stored or sent to any unauthorized party, using your GitHub password in any site other than GitHub was problematic and seemed suspicious. 

I have replaced the authentication method to use [GitHub OAuth](https://developer.github.com/v3/oauth/). Since this method requires that a secret client key will be used to convert the GitHub user login code to the authorization token, I had set up a small [hook.io](https://hook.io/) hook to do these conversions. Since this architecture is very irregular, I think I might be ok with moving this logic to the web client in future in some way. 

#### My first project with react
![Me working with react](http://i1.kym-cdn.com/photos/images/original/000/234/765/b7e.jpg)

