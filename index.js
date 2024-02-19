import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
const app=express();
const port=3000;
const directoryPath = 'data';
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
app.listen(port,(req,res)=>{
    console.log("Blog App is running on "+port);
})

app.get("/",(req,res)=>{
    let allData = [];
    var BlogName="abc",Content="";
    fs.readdir(directoryPath, (err, files) => {
        if (err) throw err;
        files.forEach(file => {
            if (path.extname(file) === '.json') {
                const data = fs.readFileSync(path.join(directoryPath, file), 'utf8');
                allData.push(JSON.parse(data));
            }
        });
        console.log('All data:', allData[0].BlogName);
        res.render("index.ejs",{BlogName,Content,allData});
    });
    // fs.readFile('data/ChatGPT Vs Bard.json', 'utf-8', (err, data) => {
    //     if (err) throw err;
    //     const jsonData = JSON.parse(data); // Parse JSON string to object
    //     BlogName = jsonData.BlogName; // Access the value of BlogName property
    //     Content = jsonData.Content; 
    //     console.log(BlogName);
    //     res.render("index.ejs",{BlogName,Content});
    // });
})

app.get("/data/:title",(req,res)=>{
    let id = req.params.title;
    var BlogName="abc",Content="";
    fs.readFile(`data/${id}.json`, 'utf-8', (err, data) => {
        if (err) throw err;
        const jsonData = JSON.parse(data); // Parse JSON string to object
        BlogName = jsonData.BlogName; // Access the value of BlogName property
        Content = jsonData.Content; 
        console.log(BlogName);
        res.render("read.ejs",{BlogName,Content});
    });
})

app.get("/write",(req,res)=>{
    res.render("write.ejs",{});
})

app.post("/write",(req,res)=>{
    console.log(req.body);
    res.render("write.ejs",{});
    fs.writeFile('data/'+req.body.BlogName+'.json', JSON.stringify(req.body), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
})