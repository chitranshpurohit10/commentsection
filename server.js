const http = require("http");
const fs = require("fs");
const con = require("./DBConnection");

const hostname = "127.0.0.1";
const port = "3000"

const server = http.createServer((req,res)=>{
    if(req.method=="GET" && req.url=="/"){
        res.statusCode = 200;
        res.setHeader("Content-Type","text/html");
        fs.createReadStream("./index.html").pipe(res);

        var conn = con.getConnection();

        conn.query("SELECT * FROM comment.comments", function(error,results,fields){
            if(error) throw error;

            results.forEach((comment)=> {
                console.log(comment); /*comment.username or comment.date or any field*/ 
                
            });
        });

        conn.end();
    }
    else if(req.method=="GET" && req.url=="/style.css"){
        res.statusCode=200;
        res.setHeader("Content-Type","text/css");
        fs.createReadStream("./style.css").pipe(res);
    }
});

server.listen(port,hostname,()=>{
    console.log(`Server started at ${hostname} and port : ${port}`);
})