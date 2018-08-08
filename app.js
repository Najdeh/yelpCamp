var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({
    extended: true
}))
app.set("view engine", "ejs")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/* Campground.create({
    name: "Granite Hill",
    image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
    description: "this is an amazing place"
}, function (err, campground) {
    if (err) {
        console.log(err);
    } else {
        console.log("Newly created Campground");
        console.log(campground);
    }
})
 */

app.get("/", function (req, res) {
    console.log('Valamit kiir');
    console.log(req.body)
    res.render("landing")
})



app.get("/campgrounds", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            console.log('Valamit kiir');
            res.render("index", {
                campgrounds: allCampgrounds
            })
        }
    })
})

app.get("/campgrounds", function (req, res) {
    res.render("index", {
        campgrounds: campgrounds
    })
})




app.post('/campgrounds', function (req, res) {
    var name = req.body.name
    var image = req.body.image
    var desc = req.body.description
    var newCampground = {
        name: name,
        image: image,
        description: desc
    }
    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    })
})

app.get('/campgrounds/new', function (req, res) {
    res.render("new")
})

app.get("/campgrounds/:id", function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            res.render("show", {
                campground: foundCampground
            })
        }
    })

})

app.listen(4200, function () {
    console.log('YelpCamp server started at: 4200');
})