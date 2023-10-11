const gulp = require('gulp');
const { src, dest , watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require("gulp-postcss");
const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
gulp.task('default', () => {
    return gulp.src('src/**/*.scss')
        .pipe(sass())
        .pipe(postcss([tailwindcss("./tailwind.config.js"), autoprefixer()]))
        .pipe(gulp.dest('src/'));
});