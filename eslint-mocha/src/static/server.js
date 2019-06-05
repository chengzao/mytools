const config = require("./config");
const jsonServer = require("json-server");

const data = require("./db.js").list;

const ip = config.SERVER;
const port = config.PORT;

// Returns an Express server.
const server = jsonServer.create();

// 根据db.json文件自动生成路由规则
// Returns JSON Server router
// const router = jsonServer.router(path.join(__dirname, config.DB_FILE));
const router = jsonServer.router(data);

//中间件
// jsonServer.defaults([options]) 
// options : 
// static path to static files
// logger enable logger middleware (default: true)
// bodyParser enable body-parser middleware (default: true)
// noCors disable CORS (default: false)
// readOnly accept only GET requests (default: false)
const middlewares = jsonServer.defaults();

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);

//设置增加一个响应头信息“从server到前端”
server.use((req, res, next) => {
    res.header("X-Hello", "World");
    // Continue to JSON Server router
    next();
});

//数据发送到前端之前包一层
router.render = (req, res) => {
    let _statusCode = res.statusCode;
    if(_statusCode != 200){
        res.jsonp({
            code: _statusCode,
            error: "error message here"
        });
        //res.redirect("error.html");
    }else{
        res.jsonp({
            code: _statusCode,
            body: res.locals.data //res.locals.data这个是真正的数据
        });
    }
};

// Use default router
server.use(router);

server.listen({
    host: ip,
    port: port,
}, function () {
    console.log(`JSON Server is running in http://${ip}:${port}`);
});