# Personal website

Personal website built with AngularJS. Pages and articles are managed by Wordpress and served using the `WP REST API` plugin.

<a href="https://loic-delaubier.com" target="_blank">Website visible here.</a>

Development:
* `git clone git@github.com:loic-d/personal-website.git`
* `cd personal-website`
* `npm install`
* setup a Wordpress installation with the following plugins: `WP REST API`, `Raw HTML` & `Better REST API Featured Images`.
* create an `About` page and at least one blog post.
* upload and install the theme available in `wordpress/rest_api_theme` if you want to use your Wordpress site as a REST API only.
* update `API_ROOT` in `/src/app.constants.js` so it reflects your configuration
* build the project by running `gulp`. This will run the tasks `build-dev` and `connect-dev`
* go to `http://localhost:8080/` (development server loading sources)

Generate a build for production:
* run `gulp build-prod` to generate a standalone `/build` folder at the root of the project
* to serve the build, run `gulp connect-prod` and go to `http://localhost:8000/` (production server loading optimized sources and cached templates)

Deployment on your VPS:
* update `VPS_URL` in `gulpfile.js` so it matches your VPS URL
* run `gulp deploy-prod`. This will copy the content of the `./build` folder to `/var/www/html/` on your VPS (update this path in `gulpfile.js` if needed)
* note that the `.htaccess` file in the `/apache` folder and the `sitemap.xml` at the root of the project will be copied at the root of your build

