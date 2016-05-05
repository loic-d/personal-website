# personal-website

Personal website built with AngularJS. Wordpress can be used as a back-end to retrieve pages and articles with the WP REST API plugin.

Visible [here](http://www.loic-delaubier.com)

_Not all the features are completed but feel free to use this code._

TODO:
* Use Page service to retrieve page content from Wordpress
* Finish Article feature... and start to write articles!

Installation:
* `git clone git@github.com:loic-d/personal-website.git`
* `cd personal-website/`
* `npm install`
* `gulp build`
* `gulp connect-dev`
* Go to `http://localhost:8080/src/` (development version)

Generate build for production:
* `gulp build`
* `gulp connect-build`
* Go to `http://localhost:8000/` (production version)
