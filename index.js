const express = require('express');
const port = 8000;
const app = express();
const expressLayouts = require('express-ejs-layouts');

//express layouts
app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//accessing static files
app.use(express.static("assets"));

//set up view engine
app.set('view engine', 'ejs');
app.set('views', './views');

//set up the route
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log("Error in starting the server");
        return;
    }

    console.log("Server is running on port:", port);
});