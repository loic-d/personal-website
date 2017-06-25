# Personal website

Personal website built with AngularJS. Wordpress is used to retrieve pages and posts using the `WP REST API` plugin.

Website visible [here](http://www.loic-delaubier.com)

Development:
* `git clone git@github.com:loic-d/personal-website.git`
* `cd personal-website`
* `npm install`
* setup a Wordpress installation with `WP REST API`, `Raw HTML` & `Better REST API Featured Images` plugins. You need an `About` page and at least one blog post. You can also install the 'empty' theme available in `wordpress/rest_api_theme` if you only want to use your Wordpress installation as a REST API.
* update `API_ROOT` and `CONTACT_SCRIPT` in `/src/app.constants.js` so it reflects your configuration
* build the project by running `gulp`. This will run `build-dev` and `connect-dev`
* go to `http://localhost:8080/` (development server loading sources)

Generate a build for production:
* run `gulp build-prod` to generate a standalone `/build` folder at the root of the project
* to serve the build, run `gulp connect-prod` and go to `http://localhost:8000/` (production server loading optimized assets and cached templates)

Deployment on your VPS:
* update `vpsUrl` in `gulpfile.js` so it matches your VPS URL
* run `gulp deploy-prod`. This will copy the content of the `./build` folder to `/var/www/html/` on your VPS (you can update the path in `gulpfile.js` if needed)
* note that the `.htaccess` file in `/apache` folder will also be copied at the root of the build to display pretty urls in the browser

