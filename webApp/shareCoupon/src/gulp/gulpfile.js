/**
 * @Author: Arvay
 * @Date:   2017-06-17T16:54:35+08:00
 * @Last modified by:   Arvay
 * @Last modified time: 2017-06-17T20:44:55+08:00
 */
var gulp = require('gulp'),
    runSequence = require('run-sequence'),
    minifyCss = require('gulp-minify-css'),                     //- 压缩CSS为一行；gulp-uglify
    rev = require('gulp-rev'),
    uglify = require('gulp-uglify'),
    revCollector = require('gulp-rev-collector');

//定义css、js源文件路径
var cssSrc = ['../css/*.css'],
    jsSrc = ['../js/*.js'];

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
	console.log('正在------------------------------------------------------>修改 css');
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(minifyCss())
        .pipe(gulp.dest('../../dist/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('../../dist/rev/css/'));
});

//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
	console.log('正在------------------------------------------------------>修改 js');
    return gulp.src(jsSrc)
        .pipe(rev())       //给文件添加hash编码
        .pipe(uglify())
        .pipe(gulp.dest('../../dist/js/'))
        .pipe(rev.manifest())                       //生成rev-mainfest.json文件作为记录
        .pipe(gulp.dest('../../dist/rev/js/'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
  console.log('正在------------------------------------------------------>替换 html路径');
    return gulp.src(['../../dist/rev/**/*.json', '../templates/*.html'])
        .pipe(revCollector())                         //替换html中对应的记录
        .pipe(gulp.dest('../../dist/templates/'));                     //输出到该文件夹中
});
//开发构建
gulp.task('dev', function (done) {
    condition = false;
    //依次顺序执行
    console.log('正在------------------------------------------------------>执行')
    runSequence(
        ['revCss'],
        ['revJs'],
        ['revHtml'],
        // ['revHtmlJs'],
        done);
});
