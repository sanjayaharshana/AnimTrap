'use strict';

const gulp = require("gulp");
const sass = require("gulp-sass");
const minify = require("gulp-minify-css"); 
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const clean = require("gulp-clean");
const runSequence = require("run-sequence").use(gulp);

gulp.task("clean", () => {
	return gulp
			.src('./dist/*', {read: false})
			.pipe(clean())
})

// Transpiling the sass files to beauty versions
gulp.task("sass", () => 
{
	return gulp
		.src("src/sass/animtrap.scss")
		.pipe(sass())
		.pipe(rename("animtrap.css"))
		.pipe(gulp.dest("dist/css/"))
});

// Transpiling the css to minified versions
gulp.task("sass-minify", () => 
{
	return gulp
		.src("src/sass/animtrap.scss")
		.pipe(sass({ style: "compressed" }))
		.pipe(minify())
		.pipe(rename("animtrap.min.css"))
		.pipe(gulp.dest("dist/css/"))
});


// Compile the JavaScript files
gulp.task("js-concat", () =>  
{
	return gulp
		.src("./src/js/*.js")
		.pipe(concat('anim-trap.js'))
		.pipe(gulp.dest("./dist/js/"));
});


// Minify the JavaScript files
gulp.task("js-minify", () => 
{
	return gulp
		.src("./dist/js/anim-trap.js")
		.pipe(uglify())
		.pipe(rename('anim-trap.min.js'))
		.pipe(gulp.dest("dist/js"));
})

// Task to call in devtime
gulp.task("watch", () =>  
{
	// Watch for file changes and run sass
	gulp.watch("src/**/*.scss", ["sass", "sass-minify"]);
	gulp.watch("src/**/*.js", ["js-concat", "js-minify"]);
});

gulp.task("build", (cb) => {
	runSequence("clean", "sass", "sass-minify", "js-concat", "js-minify", cb)
});