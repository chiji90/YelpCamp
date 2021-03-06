const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');  //Need to npm install method-override
const Campground = require('./models/campground');
const { findById } = require('./models/campground');

//link database
mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//Check for Error Connecting to Database
const db= mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error:"));
db.once("open", ()=>{
    console.log("Database Connected");
});

const app = express();


//EJS view engines to render pages
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Needed to Parse Body
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'));

//Handle Request to Home
app.get('/',(req,res)=>{
    res.render('home');
})

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds});
})

app.get('/campgrounds/new', (req,res)=>{
    res.render('campgrounds/new');
})

app.post('/campgrounds', async (req,res) =>{
    //Create new campground and save
    const campground = new Campground(req.body.campground);
    await campground.save();   
    //Redirect to view the new campground ( from get request below)
    res.redirect(`/campgrounds/${campground._id}`);
})

app.get('/campgrounds/:id', async (req,res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/show', {campground})
})

app.get('/campgrounds/:id/edit', async (req, res)=>{
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', {campground});
})

app.put('/campgrounds/:id', async(req,res)=>{
    const {id} = req.params;
    const campground = await Campground.findByIdAndUpdate(id,{...req.body.campground});
    res.redirect(`/campgrounds/${campground._id}`);
});

app.delete('/campgrounds/:id', async (req,res)=>{
    const {id} = req.params;
    await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
})
//Run Server on Port 3000
app.listen(3000, ()=>{
    console.log('Serving on Port 3000');
})