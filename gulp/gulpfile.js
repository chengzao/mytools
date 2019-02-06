/* = Gulp组件
-------------------------------------------------------------- */
// 引入gulp
var gulp = require('gulp'); // 基础库
// 引入我们的gulp组件
var sass = require('gulp-sass'), // CSS预处理/Sass编译
    uglify = require('gulp-uglify'), // JS文件压缩
    imagemin = require('gulp-imagemin'), // imagemin 图片压缩
    pngquant = require('imagemin-pngquant'), // imagemin 深度压缩
    livereload = require('gulp-livereload'), // 网页自动刷新（服务器控制客户端同步刷新）
    webserver = require('gulp-webserver'), // 本地服务器
    rename = require('gulp-rename'), // 文件重命名
    sourcemaps = require('gulp-sourcemaps'), // 来源地图
    changed = require('gulp-changed'), // 只操作有过修改的文件
    concat = require("gulp-concat"), // 文件合并
    clean = require('gulp-clean'), // 文件清理
    pump = require('pump'),
    autoprefixer = require('gulp-autoprefixer'), // 自动添加CSS3浏览器前缀
    base64 = require('gulp-base64'),
    babel = require('gulp-babel'),
    ts = require('gulp-typescript'),   
    tsify = require('tsify'),
    csscomb = require('gulp-csscomb'),

    babelify = require('babelify'),
    browserify = require("browserify"),
    buffer = require('vinyl-buffer'),
    source = require("vinyl-source-stream"),

    glob = require("glob"),
    es = require('event-stream');
/* = 全局设置
-------------------------------------------------------------- */
var srcPath = {
    html: 'src',
    css: 'src/scss/*.scss',
    image: 'src/images',
    css2: 'src/css/*.css'
};
var destPath = {
    html: 'dist',
    css: 'dist/css',
    image: 'dist/images',
};

/* = 开发环境( Ddevelop Task )
-------------------------------------------------------------- */
// HTML处理
gulp.task('html', function () {
    return gulp.src(srcPath.html + '/**/*.html')
        .pipe(changed(destPath.html))
        .pipe(gulp.dest(destPath.html));
});
// 样式处理
gulp.task('css', function () {
    return gulp.src(srcPath.css2)
        .pipe(sourcemaps.init())
        .pipe(csscomb())
        .pipe(autoprefixer({
            browsers: ['last 5 versions'], // 主流浏览器的最新两个版本
            cascade: false // 是否美化属性值
        }))
        
        .pipe(base64({
            maxImageSize: 8 * 1024 // bytes 
        }))
        .pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）
        .pipe(gulp.dest(destPath.css)); // 输出路径
});
// 样式处理
gulp.task('sass', function () {
    return gulp.src(srcPath.css)
        .pipe(sourcemaps.init())
        .pipe(csscomb())
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 versions'], // 主流浏览器的最新两个版本
            cascade: false // 是否美化属性值
        }))
        .pipe(base64({
            maxImageSize: 8 * 1024 // bytes 
        }))
        .pipe(sourcemaps.write('maps')) // 地图输出路径（存放位置）

        .pipe(gulp.dest(destPath.css)); // 输出路径
});

// 将es6转换编译成浏览器识别
gulp.task("javascript", function(){
    var files = glob.sync(srcPath.html+'/**/!(*.min).js');
    // console.log(files) 
    var tasks = files.map(function(item){
        // console.log(item)    
        var _tmp = item.replace(/src\//,'')
        return browserify({
            entries: item,
            debug:true
        })
        .transform(babelify.configure({
            presets : ["es2015"]
        }))
        .bundle()
        .pipe(source(_tmp))
        .pipe(buffer())
        .pipe(changed(destPath.html))
        .pipe(sourcemaps.init({loadMaps: true})) //生成map文件
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destPath.html));
    })
    // 合并stream
    return es.merge.apply(null, tasks);
});

// TypeScript编译成浏览器运行的代码
gulp.task('typescript',function(){
    var files = glob.sync(srcPath.html+'/**/*.ts');
    // console.log(files)
    var tasks2 = files.map(function(item){
        var _tmp = item.replace(/src\//,'');
       _tmp = _tmp.replace(/\.ts$/,'.js');
        return browserify({
            debug: true,
            entries: item
        })
        .plugin(tsify)
        .transform('babelify', {
            presets: ['es2015'],
            extensions: ['.ts']
        })
        .bundle()
        .pipe(source(_tmp))
        .pipe(buffer())
        .pipe(changed(destPath.html))
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(destPath.html));
    });
    return es.merge.apply(null, tasks2);
});


// imagemin 图片压缩
gulp.task('images', function () {
    return gulp.src(srcPath.image + '/**/*') // 指明源文件路径，如需匹配指定格式的文件，可以写成 .{png,jpg,gif,svg}
        .pipe(changed(destPath.image))
        .pipe(imagemin({
            progressive: true, // 无损压缩JPG图片
            svgoPlugins: [{ removeViewBox: false }], // 不要移除svg的viewbox属性
            use: [pngquant()] // 深度压缩PNG
        }))
        .pipe(gulp.dest(destPath.image)); // 输出路径
});
// 文件合并
gulp.task('concat', function () {
    return gulp.src(srcPath.html + '/**/*.min.js') // 要合并的文件
        .pipe(concat('libs.js')) // 合并成libs.js
        .pipe(rename({ suffix: '.min' })) // 重命名
        .pipe(gulp.dest(destPath.html+'/libs/')); // 输出路径
});
// 清理dist目录
gulp.task('cleandir', function (cb) {
    pump([
        gulp.src([destPath.html], { read: false }),
        clean()
    ], cb)
});
// 本地服务器
gulp.task('webserver', function () {
    gulp.src(destPath.html) // 服务器目录（.代表根目录）
        .pipe(webserver({ // 运行gulp-webserver
            livereload: true, // 启用LiveReload
            open: true // 服务器启动时自动打开网页
        }));
});

// 监听任务
gulp.task('watch', function () {
    // 监听 html
    gulp.watch(srcPath.html + '/**/*.html', ['html'])
    // 监听 scss
    gulp.watch(srcPath.css, ['sass']);
     // 监听 css
     gulp.watch(srcPath.css2, ['css']);
    // 监听 images
    gulp.watch(srcPath.image + '/**/*', ['images']);
    // 监听 js
    gulp.watch([srcPath.html + '/**/*.js', '!' + srcPath.html + '/**/*.min.js'], ['javascript']);
    // 监听ts
    gulp.watch([srcPath.html + '/**/*.ts'], ['typescript']);
});

// 默认任务
gulp.task('default', ['webserver', 'watch']);

/* = 发布环境( Release Task )
-------------------------------------------------------------- */
// 清理文件clean
gulp.task('clean', function () {
    pump([
        gulp.src([destPath.html + '/**/*.maps'], { read: false }),
        clean()
    ])
});
// 打包发布
gulp.task('release', ['clean']);