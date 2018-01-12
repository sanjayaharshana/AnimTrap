const gulp = require("gulp");
const sass = require("gulp-sass");
const minify = require('gulp-minify-css'); //minifies css
const rename = require('gulp-rename');


// Transpiling the sass files to beauty versions
gulp.task("sass", function()
{
	return gulp
		.src("src/scss/animtrap.scss")
		.pipe(sass())
		.pipe(rename("animtrap.css"))
		.pipe(gulp.dest("dist/css/"))
});

// Transpiling the css to minified versions
gulp.task("sass-minified", function()
{
	return gulp
		.src("src/scss/animtrap.scss")
		.pipe(sass({ style: "compressed" }))
		.pipe(minify())
		.pipe(rename("animtrap.min.css"))
		.pipe(gulp.dest("dist/css/"))
});


// Task to call in devtime
gulp.task("watch", function() 
{
	// Watch for file changes and run sass
	gulp.watch("src/**/*.scss", ["sass", "sass-minified"]);
});