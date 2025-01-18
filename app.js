const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./model/user'); // Ensure the path to your model is correct
const { log } = require('console');

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes

// Home Route
app.get('/', (req, res) => {
    res.render("index");
});

// Create User Route
app.post('/create', async (req, res) => {
    try {
        let { name, email, image_url } = req.body;
        await userModel.create({
            name,
            email,
            image_url,
        });
        res.redirect('/read'); // Correctly redirect to the read page
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating user");
    }
});

// Read Users Route
app.get('/read', async (req, res) => {
    try {
        let users = await userModel.find();
        res.render("read", { users });
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching users");
    }
});
app.get("/delete/:id",async (req,res)=>{
    let user= await userModel.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})
app.get('/edit/:id',async (req,res)=>{
    let user=await userModel.findOne({_id:req.params.id})
    res.render('edit',{user})
})
app.post('/update/:id', async (req, res) => {
    try {
        const { name, email, image_url } = req.body;
        const updatedUser = await userModel.findOneAndUpdate(
            { _id: req.params.id },
            { name, email, image_url },
            { new: true } // Returns the updated document
        );
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.redirect('/read');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating user');
    }
});

// Start the Server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
