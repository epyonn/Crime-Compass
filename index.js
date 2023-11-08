const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const path = require('path');


const app = express();


  app.use(cors());
  
app.use(express.json()); // Don't forget to parse JSON bodies

const CONNECTION_STRING = "mongodb+srv://admin:carrot64@cluster0.retvxxx.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "todoappdb";

// Added for AWS
app.use(express.static(path.join(__dirname,'public','build')));

// Connect to MongoDB
MongoClient.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
.then(client => {
    const database = client.db(DATABASE_NAME);
    console.log('MongoDB Connection Success!');

    app.get("/todoappcollection", async (req, res) => {
        console.log('GET IS CALLED');
        try {
            const items = await database.collection("todoappcollection").find({}).toArray();
            console.log('this works the app get');
            res.status(200).json(items);
        } catch (error) {
            console.error('Error fetching items:', error);
            res.status(500).json({ message: "Error fetching items from todoappcollection", error: error.message });
        }
    });

    app.post("/todoappcollection", async (req, res) => {
        console.log("APP POST IS CALLED");
        const staticData = {
            date: "2023-11-06",
            time: "14:41",
            location: "433 Athol Ave, Oakland, CA 94606, USA"
        };

        const dataToInsert = req.body;

        try {
            console.log(database); 
            console.log(database.collection("todoappcollection"));
            const result = await database.collection("todoappcollection").insertOne(dataToInsert);
            console.log('Data inserted:', result);
            res.status(201).json(result);
        } catch (error) {
            console.error('Error inserting item:', error);
            res.status(500).json({ message: "Error inserting static item", error: error.message });
        }
    });

    // AWS Config
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname+'/public/build/index.html'));
    });

    // Start the Express server
    //const PORT = 5038;
    // AWS Config
    const PORT = process.env.PORT || 5038;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(error => {
    console.error('MongoDB Connection Failed!', error);
    process.exit(1);
});
