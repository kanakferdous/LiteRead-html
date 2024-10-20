import gulp from "gulp";
import autoPrefixer from "gulp-autoprefixer";
import concat from "gulp-concat";
import gulpSass from "gulp-sass";
import uglify from "gulp-uglify";
import dartSass from "sass";

const sass = gulpSass(dartSass);

// Compile SCSS into CSS
export function style() {
  return gulp
    .src("./src/scss/style.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(
      autoPrefixer({
        overrideBrowserslist: ["last 2 versions"], // Corrected here
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/css"));
}

// Minify JS
export function scripts() {
  return gulp
    .src("./src/js/**/*.js")
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
}

// Watch for changes
export function watch() {
  gulp.watch("./src/scss/**/*.scss", style);
  gulp.watch("./src/js/**/*.js", scripts);
}

// Default task
export default gulp.series(style, scripts, watch);
