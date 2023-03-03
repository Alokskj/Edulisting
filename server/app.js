import  express  from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express()
const port = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://vercel-admin-user:M4zoQK9SxvK4K6TY@cluster0.s2kgswl.mongodb.net/Edulisting?retryWrites=true&w=majority');
}

const userSchema = new mongoose.Schema({
    name: String,
    email : String,
    password : String,
})

const user = mongoose.model('user', userSchema)

app.get('/register',async (req, res)=>{
    const User = await user.find()
    res.send({
        User
    })
})

app.post("/register", async (req,res)=>{
 const {name, email, password} = req.body
   const newUser = new user()
   newUser.name = name
   newUser.password = password
   newUser.email = email
   const doc = await newUser.save()


})

app.listen(port,()=>{
console.log(`server is running on ${port}`)
})