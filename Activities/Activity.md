## Express ##
## Acrivity 2: Two Servers ##

*  In this activity, we created an app that has two web servers: one that listens on port 7000 and one that listens on port 7500

* Each server responds with a different inspirational quote we choose

**Bonus**
* Randomly select the quotes from a predefined array.


 ```javascript
 	const http=require("http");
const PORT1=7000;
const PORT2=7500;

//create an app that has two web servers: one that listens on port 7000 and one that listens on port 7500.
//Each server responds with a different inspirational quote of our choosing.
//arr1 holds the quotes to return by the server listening on PORT1

const arr1=["The greatest glory in living lies not in never falling, but in rising every time we fall.","The way to get started is to quit talking and begin doing.","Your time is limited, so don't waste it living someone else's life. Don't be trapped by dogma – which is living with the results of other people's thinking." ,
            "If life were predictable it would cease to be life, and be without flavor.","If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.",
            "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success."];
            
//arr12 holds the quotes to return by the server listening on PORT2

const arr2=["Life is what happens when you're busy making other plans.","Spread love everywhere you go. Let no one ever come to you without leaving happier.","When you reach the end of your rope, tie a knot in it and hang on.",
          "Always remember that you are absolutely unique. Just like everyone else.","Don't judge each day by the harvest you reap but by the seeds that you plant.",
          "The future belongs to those who believe in the beauty of their dreams."];

//Randomly select the quotes from a predefined array. arr1 is for server 1 and arr2 is for server2.
function random(arr){
   var r=  Math.floor(Math.random()*arr.length);
   return arr[r];
}
function handleRequest1(request,response){
    //response.end("Your limitation\-it's only your imagination.")
    response.end(random(arr1));
}

function handleRequest2(request,response){
   // response.end("Push yourself, because no one else is going to do it for you.")
   response.end(random(arr2));
}

var server1=http.createServer(handleRequest1);
var server2=http.createServer(handleRequest2);

server1.listen(PORT1,()=>{
     
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT1);
});

server2.listen(PORT2,()=>{
     
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT2);
  });


```
---
## Activity 5: Serve Favorites ##

* In this activity, I created a website with four routes:
  * Home
  * Favorite Foods
  * Favorite Movies
  * Favorite CSS Frameworks

* Each route is triggered by a different URL.
* Each route displays an HTML page listing my favorite three things of each.
* `fs` is used to serve my HTML files.

## Bonuses
* Home page has links to all of my other pages.
* I have a single `readFile`

* home.html
`
 <!DOCTYPE html>
<html>
<head>
	<title>Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
	<div class="jumbotron bg-info">
		<h1 class="text-center">Welcome to My Page!!</h1>
	</div>
	<div class="container">
		<div class="col-sm-6 col-sm-offset-3">
				<h2>Here are some of my favorite things!</h2>
				<ul>
					<li><a href="/movies">Favorite Movies</a></li>
					<li><a href="/food">Favorite Food</a></li>
					<li><a href="/frameworks">Favorite Frameworks</a></li>
					
				</ul>
		</div>

	</div>
	</div>
	</div>
</body>
</html>
`

* FavFoods.html
`
 <!DOCTYPE html>
<html>
<head>
	<title>Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
	<div class="jumbotron bg-info">
		<h1 class="text-center">My Favorite Food</h1>
	</div>
	<div class="container">
		<div class="col-sm-6 col-sm-offset-3">
				<h2>Here are some of my favorite food!</h2>
				<ul>
					<li>Tacos</li>
					<li>Burgers</li>
					<li>Salads</li>
					<li>Sandwiches</li>
				</ul>
        </div>
        <a href="/">Go Home</a>
	</div>
</body>
</html>

`
* FavFrameworks.html
`
  <!DOCTYPE html>
<html>
<head>
	<title>Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
	<div class="jumbotron bg-info">
		<h1 class="text-center">My Favorite Frameworks</h1>
	</div>
	<div class="container">
		<div class="col-sm-8 col-sm-offset-3">
				<h2>Here are some of my favorite frameworks!</h2>
				<ul>
					<li>Bootstrap</li>
					<li>Bulma</li>
					<li>Tailwind CSS</li>
					<li>Semantic UI</li>
				</ul>
        </div>
        <a href="/">Go Home</a>
	</div>
</body>
</html>
`
* FavMovies.html

`
 <!DOCTYPE html>
<html>
<head>
	<title>Page</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
</head>
<body>
	<div class="jumbotron bg-info">
		<h1 class="text-center">My Favorite Movies</h1>
	</div>
	<div class="container">
		<div class="col-sm-6 col-sm-offset-3">
				<h2>Here are some of my favorite movies!</h2>
				<ul>
					<li>Patch Adams</li>
					<li>The Big Lebowski</li>
					<li>Pulp Fiction</li>
					<li>Resorvoir Dogs</li>
				</ul>
        </div>
        <a href="/">Go Home</a>
	</div>
</body>
</html>
`
* server.js 

```javascript
var http = require("http");
var fs=require("fs");

var PORT = 8080;

var server = http.createServer(handleRequest);

// Start our server
server.listen(PORT, function() {
  // Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:" + PORT);
});

// Create a function which handles incoming requests and sends responses
function handleRequest(req, res) {

  // Capture the url the request is made to
  var path = req.url;

  // Depending on the URL, display a different HTML file.
  switch (path) {

  case "/":
    return readMyFile("./home.html",res);

  case "/movies":
    return readMyFile("./FavMovies.html",res);
    
  case "/food":
    return readMyFile("./FavFoods.html",res); 

  case "/frameworks":
    return readMyFile("./FavFrameworks.html",res);    

  default:
    return display404(path, res);
   }
} 

//reads the html and sends the client the string which will be rendered as html file
function readMyFile(path,res){
    fs.readFile(path,"utf8",function(err,data){
        if (err){
            throw err;
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
});

}
// when the url is not among the specified URLs, send to client an html that shows the error message

function display404(url, res) {
  
  var myHTML = "<html>" +
    "<body><h1>404 Not Found </h1>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";

  // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
  res.writeHead(404, { "Content-Type": "text/html" });

  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  res.end(myHTML);
}
		   
```
---
## Activity 7: POST METHOD ##

* In this activity, we created an HTML file with a form that will post data.
* Next, we created a server that accepts the POSTed data and log it to the console as well as sends the client what he posted.

* index.html
`
 <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>FAVORITE BAND</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
    <div class="container">
        <div class="jumbotron text-center">
             <h1>FAVORITE BAND</h1>
        </div>
        
        <div class="row">
          <div class="col-sm-8 ">
              <form action="http://localhost:8080/Thanks" method="POST">
                    <div class="form-group">
                            <label for="name">Your Name:</label>
                            <input type="text" class="form-control" name="name">
                    </div>

                    <div class="form-group">
                            <label for="band">Favorite Band:</label>
                            <input type="text" class="form-control" name="band">
                    </div>

                    <button type="submit" class="btn btn-primary">Submit</button>

              </form> 
          </div>

        </div>
    </div>
    
</body>
</html>
`

```javascript
const http=require("http");
const fs=require("fs");

const PORT=8080;

var server=http.createServer(handleRequest);
server.listen(PORT,function(){
    console.log("Server started to listen at http://localhost:"+PORT);
});

function handleRequest(req,res){
    var path=req.url;
    
    switch (path){
        case "/": displayWelcomePage(res);break;
        case "/Thanks": displayThanks(req,res);break;
        default: displayWelcomePage(res);break;
        
    }
}

function displayWelcomePage(res){

    fs.readFile(__dirname+"/index.html","utf8",(error,data)=>{
        if(error){
            res.writeHead(500,{"Content-Type":"text/html"});
            res.end("<html>"+"<body><h1>OOOPS there was an error</h1></body></html>");
        }    
        else{
          res.writeHead(200,{"Content-Type":"text/html"});
          res.end(data);
        }
        
    });
    
};

function displayThanks(req,res){
    var myHTML="<html>"+"<body> <h1>You Have Not Entered Any Data!!</h1></body></html>";
    

    req.on("data",function(data){
        console.log("You posted "+data+" to the server");
        myHTML="<html>"+"<body> <h1> Thank you for your data!!</h1><code>"+data+"</code></body></html>";

    });
    req.on("end",function(){
        res.writeHead(200,{"Content-Type":"text:html"});
        res.end(myHTML)

    });

}    

 ```
---

## Activity 8: STARWARS-1:   

* In this activity, we create a new `Obi Wan Kenobi route` to display Kenobi's information

```javascript

//Create one more data entry for the character Obi Wan Kenobi.
// Enter any values you like for the parameters following the same format as the Yoda and Darth Maul character

const obi={
  name:"Obi Wan Kenobi",
  role:"Magician",
  age:200,
  forcePoints:10000
};
//Routes
// ===========================================================
app.get("/obi", function(req, res) {
  res.json(obi);
});
```
--- 
## Activity 9: STARWARS-2

* In this activity, we tried to understand the significance of the `/:character` and `req.params.character` .
```javascript
 // Routes
// ===========================================================
app.get("/", function(req, res) {
  res.send("Welcome to the Star Wars Page!");
});

app.get("/:character", function(req, res) {
  var chosen = req.params.character;

  // What does this log?
  console.log(chosen);

  res.end();
});
```
* Here `/:character` allows us to specify `character` route parameter. Route parameters are named URL segments that are used to capture values specified at their position in the URL. The captured values are populated in the req.params object with the name of the route parameter specified in the path as their respective keys. So we can access the `character` parameter with `req.params.character`. console.log above logs the value of the route parameter.
---
## Activity 10: STARWARS-3 ##

* In this activity, we explained the code below.

```javascript
// Routes
// ===========================================================

app.get("/", function(req, res) {
  res.send("Welcome to the Star Wars Page!");
});

// What does this route do?
//it sends the users all the characters in the `characters` array in json format
app.get("/api/characters", function(req, res) {
  return res.json(characters);
});

// What does this route do?
//this route captures the route parameter that  the user sent. 
app.get("/api/characters/:character", function(req, res) {
  // What does this code do?
  //This code stores the passed route paramerer in variable `chosen` and logs it to the console.
  var chosen = req.params.character;
  console.log(chosen);

  // What does this code do?
  //This code searches the character array for the user entered character passed by the route parameter. And sends the corresponding
  //object in json format.

  for (var i = 0; i < characters.length; i++) {
    if (chosen === characters[i].routeName) {
      return res.json(characters[i]);
    }
  }

  // What does this code do?
  // if the character is not found and then the  `No character found` message is passed to the user.
  return res.send("No character found");
});
```

---

## Activity 12: STARWARS-5 ##

* In this activity, we tried to surmize what `req.body` does.


```javascript
// Create New Characters - takes in JSON input
app.post("/api/characters", function(req, res) {
  var newCharacter = req.body;

  console.log(newCharacter);

  characters.push(newCharacter);

  res.json(newCharacter);
});

```
* `req.body` contains key-value pairs of data submitted in the request body. By default it's `udefined` and is populated when you use a parsing middleware such as express.json() or express.urlencoded().
--- 
## Activity 13: STARWARS-6 ##
* In this activity, we answered the questions stated in the javascript code in view.html

```javascript
 
    // QUESTION: What is this code doing?
    // It adds a listener on the search button. When the button is clicked, the function is executed
    $("#search-btn").on("click", function() {
      // The contents of the text field is received and before and after trailing spaces are removed
      var searchedCharacter = $("#character-search").val().trim();

      // Using a RegEx Pattern to remove spaces from searchedCharacter
      // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
      searchedCharacter = searchedCharacter.replace(/\s+/g, "").toLowerCase();

      // QUESTION: What does $.get do? What are the parameters it is expecting?
      //it does a get request to the url containing the path (first parameter) updated with the search character.
      //It's expecting character data from the server, so it can show the statistics and poplate the related fields on
      //the html
      $.get("/api/characters/" + searchedCharacter, function(data) {
        console.log(data);
        if (data) {
          $("#stats").show();
          $("#name").text(data.name);
          $("#role").text(data.role);
          $("#age").text(data.age);
          $("#force-points").text(data.forcePoints);
        }
        //if no character data is returned, then `character not found` message is displayed and stats section of the html is hiden
        //from the user view.
        else {
          $("#name").text("The force is not strong with this one. Your character was not found.");
          $("#stats").hide();
        }
      });
    });

```
---

## Activity 14:FINAL STARWARSAPP##

* In this activity, we examined the JavaScript code found at the bottom of `add.html`.
* We explained what the code does, what its for, and why its relevant to the application so far. We explained what`$.post` code is doing.
* add.html (We take from the user the fields we need to create a new character. Instead of using postman to post data, we use add.html with the javascript that parses the data and makes a post request.)
```javascript
 // Question: What does this code do?
   // When add new character button is clicked, this callback function is executed which takes the event object as parameter. 
   // By default, the form to be sent to the server is prevented with `preventDefault` function.
    $("#add-btn").on("click", function(event) {
      event.preventDefault();
      // We read the related fields from `add.html` to get the data to create a new object with name, rol, age and force-points fields
      var newCharacter = {
        name: $("#name").val().trim(),
        role: $("#role").val().trim(),
        age: $("#age").val().trim(),
        forcePoints: $("#force-points").val().trim()
      };

      // Question: What does this code do??
      //we make a post request to the URL that contains the below path and pass the newly created character as data
      //Then, the server sends back the object data that's added to the  Characters array and then we log it to the console and
      //raise an alert.
      $.post("/api/characters", newCharacter)
        .then(function(data) {
          console.log("add.html", data);
          alert("Adding character...");
        });
    });

``` 
-- 
## Activity 15:Hot Restaurant ##

* In this activity we created a restaurant app. There are 5 tables and the restaurant takes reservations from at most 5 people and put the rest in a waiting list. The reservations and waiting list can be viewed. There are also api's where you can view the reservations in json format and also waitinglist in json format

* index.html

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Welcome Page</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<body>
   <div class="container"> 
      <div class="jumbotron">
            <h1 class="text-center"><img src="https://img.icons8.com/cute-clipart/64/000000/fire-element.png" class="text-centered">HOT RESTAURANT</h1>
            <hr>
            <h2 class="text-center">We only have 5 tables!! Book your seat before they're all gone!!</h2>
            <div class="text-center mt-4">
               <a href="/tables"><button type="button" class="btn btn-primary btn-md" id="vT"><img src="https://img.icons8.com/material-outlined/34/000000/view-module.png">&nbspView Tables</button></a>
               <a href="/reservation"><button type="button" class="btn btn-danger btn-md" id="reservation"><img src="https://img.icons8.com/dusk/34/000000/restaurant-table.png">&nbspMake Reservation</button></a>
            </div>   
      </div>
      <a href="#">API Table Link</a>|<a href="#">API Wait List</a>
   </div>

</body>
</html>
```
* makeReservation.html

```html

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>View Tables</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery.js"></script>
</head>
<body>
   <div class="container"> 
      <div class="jumbotron">
            <h1 class="text-center"><img src="https://img.icons8.com/cute-clipart/64/000000/fire-element.png" class="text-centered">HOT RESTAURANT</h1>
            <hr>
            <h2 class="text-center">Make Your Reservation</h2>
            <div class="text-center mt-4">
              <a href="/tables"> <button type="button" class="btn btn-primary btn-md"><img src="https://img.icons8.com/material-outlined/34/000000/view-module.png">&nbspView Tables</button></a>
               <a  href="/"><img src="https://img.icons8.com/ios/55/000000/home-buton.png"></a>
            </div>   
      </div>
      <div class="row">
          <div class="col-sm-12">
                <div class="card" style="width: auto;">
                        <div class="card-body">
                          <h5 class="card-title bg-light p-2">Table Reservation</h5>
                          <form method="post" role="form">
                                <div class="form-group">
                                  <label for="name">Name</label>
                                  <input type="text" class="form-control" id="name" >
                                </div>
                                <div class="form-group">
                                        <label for="pn">Phone Number</label>
                                        <input type="text" class="form-control" id="pn" >
                                </div>
                                <div class="form-group">
                                        <label for="email">Email</label>
                                        <input type="email" class="form-control" id="email" >
                                </div>
                                <div class="Unique ID">
                                        <label for="ID">Unique ID</label>
                                        <input type="text" class="form-control" id="ID" >
                                </div>
                                
                                <button type="submit" class="btn btn-primary mt-3" id="submit">Submit</button>
                         </form>
                             
                        </div>
                </div>
                <a href="#">API Table Link</a>|<a href="#">API Wait List</a>
            </div>    

               
          </div>
      </div>
   </div>
    <script type="text/javascript">
      $("#submit").on("click",function(event){
              event.preventDefault();
              const newReservation={};
              newReservation.name=$("#name").val().trim();
              newReservation.phone=$("#pn").val().trim();
              newReservation.email=$("#email").val().trim();
              newReservation.id=$("#ID").val().trim();
             
              $.post("/reservation/add/",newReservation,function(data){
                      
                      if (data){
                              alert("You successfully reserved a Table");
                      }
                      else{
                              alert("Reservation is full, you are put on a waiting list!!");
                      }

              });



      });
    </script>
</body>
</html>

```
* viewTables.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>View Tables</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery.js"></script>
  </head>
</head>
<body>
   <div class="container"> 
      <div class="jumbotron">
            <h1 class="text-center"><img src="https://img.icons8.com/cute-clipart/64/000000/fire-element.png" class="text-centered">HOT RESTAURANT</h1>
            <hr>
            <h2 class="text-center">Current Reservations and Waiting List</h2>
            <div class="text-center mt-4">
              <a href="/reservation"><button type="button" class="btn btn-danger btn-md"><img src="https://img.icons8.com/dusk/34/000000/restaurant-table.png">&nbspMake Reservation</button></a>
               <a  href="/"><img src="https://img.icons8.com/ios/55/000000/home-buton.png"></a>
            </div>   
      </div>
      <div class="row">
          <div class="col-sm-12" >
                <div class="card mb-4" style="width: auto;">
                        <div class="card-body ">
                          <h5 class="card-title bg-light p-2" >Current Reservations</h5>
                          <div class=" m-2 p-3" id="add">
                           
                          </div> 
                         
                        </div>
                </div>

                <div class="card mb-4" style="width: auto;">
                        <div class="card-body ">
                          <h5 class="card-title bg-light p-2">Waiting List</h5>
                          <div class=" m-2 p-3" id="addw"> 
                            
                         </div>  
                         
                        </div>
                </div>
          </div>
      </div>
   </div>
    <script type="text/javascript">
        $.get("/api/tables",(data)=>{
           let myHTML;
          for (let i=0;i<data.length;i++){
            myHTML=`
                  <div class="border m-3 p-3">
                    <h2>${"Table#"+parseInt(i+1)}</h2>
                    <hr>
                    <h2>ID:<span>${data[i].id}</span></h2>
                    <h2>Name:<span>${data[i].name}</span></h2>
                    <h2>Email:<span>${data[i].email}</span></h2>
                    <h2>Phone:<span>${data[i].phone}</span></h2>   
                  </div>    
                    `

            $("#add").append(myHTML);
            
          }

        });

        $.get("/api/waitingList",(data)=>{
           let myHTML;
          for (let i=0;i<data.length;i++){
            myHTML=`
                   <div class="border m-3 p-3">
                     <h2>${"Table#"+parseInt(i+1)}</h2>
                     <hr>
                     <h2>ID:<span>${data[i].id}</span></h2>
                     <h2>Name:<span>${data[i].name}</span></h2>
                     <h2>Email:<span>${data[i].email}</span></h2>
                     <h2>Phone:<span>${data[i].phone}</span></h2>     
                    </div>     
                         
                    `

            $("#addw").append(myHTML);
            
          }

        });
    </script>
</body>
</html>
```
* server.js

```javascript
   const express= require("express");
const path= require("path");
const app=express();
const PORT=3000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const reservationArr=[];
const waitingListArr=[];

app.listen(PORT,function(){
    console.log("The server is listening at http://localhost:"+PORT);
})

app.get('/',(req,res)=>{
     res.sendFile(path.join(__dirname,"index.html"));
});
app.get('/reservation',(req,res)=>{
    res.sendFile(path.join(__dirname,"makeReservation.html"));
});
app.get('/tables',(req,res)=>{
    res.sendFile(path.join(__dirname,"viewTables.html"));
});

app.get('/api/tables',function(req,res){
    res.json(reservationArr);
    
});

app.get('/api/waitinglist',(req,res)=>{
    res.json(waitingListArr);
});

app.post('/reservation/add',(req,res)=>{
    const newEntry=req.body;
    if(newEntry){
        if (reservationArr.length<5){
            reservationArr.push(newEntry);
            res.send(newEntry);
            
        }
        else{
            waitingListArr.push(newEntry);
            res.send(null);
        }
    }
    else{
        res.sendFile(path.join(__dirname,"makeReservation.html"));
    }
});

```

