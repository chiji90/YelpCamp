const var = require('dependency'); ---- for access to dependencies installed

app.use() ---- allows to run code on every request

morgan is a middleware installed and used as a logging tool

app.use('/',function(req,res,next)=>{})  ----- Signature of middleware
    -Use next() to move on or you will hold up program
    -can return next() to make sure no code after executes in current use block
    -Path argument not necessary