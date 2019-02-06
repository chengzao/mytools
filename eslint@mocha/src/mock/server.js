// const path = require("path");
const config = require("./config");
const jsonServer = require("json-server");
const rules = require("./routes");
const dbfile = require(config.DB_FILE);

const ip = config.SERVER;
const port = config.PORT;

const server = jsonServer.create();
const router = jsonServer.router(dbfile());
const middlewares = jsonServer.defaults();

// console.log(dbfile());
// console.log(rules);

server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
    res.header("X-Hello", "World");
    next();
});

router.render = (req, res) => {
    let _statusCode = res.statusCode;
    if(_statusCode != 200){
        res.jsonp({
            code: _statusCode,
            error: "error message here"
        });
    }else{
        res.jsonp({
            code: _statusCode,
            body: res.locals.data
        });
    }    
};
// 自定义路由
server.use(jsonServer.rewriter(rules));
// 使用
server.use(router);


server.listen({
    host: ip,
    port: port,
}, function() {
    // console.log(JSON.stringify(jsonServer));
    console.log(`JSON Server is running in http://${ip}:${port}`);
});