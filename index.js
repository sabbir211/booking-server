const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000
app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
    res.send("Server is running well")
})

const uri = "mongodb+srv://calendar-user:FQJi1MKIGN6XFOM5@cluster0.tyx9l.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect()
        console.log("connected");
        const dateCollection = client.db("dates").collection("dates")
        app.get("/dates", async(req, res) => {
            const query={}
            const result =await dateCollection.find(query).toArray()
            res.send(result)
        })
        app.post("/addDate",async(req,res)=>{
            const data=req.body
            const result=await dateCollection.insertOne(data)
            res.send(result)
        })
    }
    finally {

    }
}
run().catch(console.dir)
// calendar-user
// FQJi1MKIGN6XFOM5
app.listen(port, () => {
    console.log("well")
})