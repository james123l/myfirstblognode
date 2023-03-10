// 开启服务
const express = require("express");
const app = express();
//加载配置文件.env
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const multer = require("multer");
const ApolloServer = require("apollo-server-express");
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 配置
dotenv.config();
// 使用json
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).
    then(console.log("database myblog connected...")).catch(err=> console.log(err));

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"image");
    },filename:(req,file,cb)=>{
        cb(null,req.body.name);
    }
});
const upload= multer({storage:storage});



// 绑定路径和中间件
//app.use(path,callback)中的callback既可以是router对象又可以是函数
//app.get(path,callback)中的callback只能是函数
app.use("/", require("./routes"))
// app.post("/api/upload",upload.single("file"),(req,res)=>{
//     res.status(200).json("File has been uploaded");
// })

// 监听5000端口 启动时执行consolelog
// 定义 typeDefs
const typeDefs = `
    type Query {
        hello: String
    }
`;

// 定义 resolver
const resolvers = {
    Query: {
        hello: () => 'Hello Rest Blog!'
    }
};

const apolloServer = new ApolloServer({

    typeDefs,

    resolvers

});
app.use("/", require("./routes"))
const port = process.env.PORT || "5000"
mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(async() =>{
        await apolloServer.start();
        apolloServer.applyMiddleware({ app });
        app.listen(port, () => {
            console.log("Server start on port " + port);
        });
    });

