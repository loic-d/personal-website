# Personal website

Personal website built with AngularJS. Wordpress can be used to retrieve pages and articles with the WP REST API plugin.

Website visible [here](http://www.loic-delaubier.com)

_Not all the features are completed but feel free to use this code._

TODO:
* Use Page service to retrieve page content from Wordpress
* Finish Article feature... and start to write articles!

Installation:
* `git clone git@github.com:loic-d/personal-website.git`
* `cd personal-website/`
* `npm install`
* `gulp`
* go to `http://localhost:8080/src/` (development version)

Production:
* run `gulp build` to generate a standalone `/build` folder at the root of the project
* to test the build, run `gulp connect-build` and go to `http://localhost:8000/`
