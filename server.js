const Express = require("express");
const bodyParser = require("body-parser");
const app = Express();
const path = require('path')
app.use(Express.static(path.join(__dirname, '/')))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/setUserInfo", (req, res) => {
    const { name, mail } = req.body;
    if (name && mail) {
        res.status(404).json({
            status: "success",
            msg: "添加成功"
        });
    } else {
        res.status(400).json({
            status: "fail",
            msg: "没有name值或者email的值"
        });
    }
});

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //的允许所有域名的端口请求（跨域解决）
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.listen(12306);
