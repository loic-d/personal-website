# Personal website

Personal website built with AngularJS. Wordpress can be used to retrieve pages and articles with the WP REST API plugin.

Website visible [here](http://www.loic-delaubier.com)

Installation:
* `git clone git@github.com:loic-d/personal-website.git`
* `cd personal-website/`
* `npm install`
* setup a Wordpress installation with the `WP REST API` plugin. You need an `About` page and at least one blog post.
* update `API_ROOT` in `/src/app.constants.js` to reflect your configuration
* build the project by running `gulp`
* go to `http://localhost:8080/src/` (development version)

Production:
* run `gulp build` to generate a standalone `/build` folder at the root of the project
* to test the build, run `gulp connect-build` and go to `http://localhost:8000/`
