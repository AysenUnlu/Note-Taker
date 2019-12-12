//Dependencies

const fs=require("fs");
var appRoot = require('app-root-path');
const express=require("express");
//Set Up Express
const app=express();

//Server will be listening on port 3000
const PORT=process.env.PORT||3000;
app.listen(PORT,function(){
    console.log("Server started listening on http://localhost:"+PORT);
});


//express.static built-in middleware function to serve static file such as css
app.use(express.static(appRoot.resolve("public","assets")));
//for parsin requests with incoming json or url encoded payloads
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let JData; //array that holds the the list of notes to be written to the database or read from the database

//sends the client the notes.html
app.get("/notes",(req,res)=>{
    res.sendFile(appRoot.resolve("public/notes.html"));
});

//read the db.json file and return all saved notes as JSON.
app.get("/api/notes",(req,res)=>{
   
   fs.readFile(appRoot.resolve("/db/db.json"),(err,data)=>{
        if(err){throw err;}
        JData= JSON.parse(data);
        res.json(JData);
    })
});

// Recieves a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
app.post("/api/notes",(req,res)=>{
        let data=req.body;
        console.log(JSON.stringify(data)+" is added to the database");
        JData.push(data);
        //console.log("cp:"+JSON.stringify(JData));

        if (data){
            fs.writeFile(appRoot.resolve("/db/db.json"),JSON.stringify(JData),()=>{
                res.json(data);
            });
               
        }
        
});

//Recieves a query paramter containing the id of a note to delete. 
//Each note has a unique id when it's saved. 
//In order to delete a note, all notes are read from the db.json file, the note with the given id property is deleted, 
//and then the notes are rewritten to the db.json file.

app.delete("/api/notes/:id",(req,res)=>{
    let index=req.params.id;
   
    fs.readFile(appRoot.resolve("/db/db.json"),(err,data)=>{
        if(err){throw err;}
        JData= JSON.parse(data);
        //res.json(JData);
        const element=JData.splice(index-1,1);
        fs.writeFile(appRoot.resolve("/db/db.json"),JSON.stringify(JData),()=>{
            console.log(JSON.stringify(element)+ " is removed");
            res.send(element);
        });
    })
      
   
});

//all other routes lead to index.html
app.get("*",(req,res)=>{

    res.sendFile(appRoot.resolve("public/index.html"));
});



