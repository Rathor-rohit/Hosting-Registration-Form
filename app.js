import express from 'express';
import connectDB from './db/connectdb.js';
import web from './routes/web.js';
const app = express();
const port = 3000 || process.env.PORT;
const DATABASE_URL = "mongodb+srv://rohitBhai:rohit123@cluster0.tmysc.mongodb.net/registration-form" //"mongodb://localhost:27017" || process.env.DATABASE_URL;

// databse connection 
connectDB(DATABASE_URL);
// This is a middle ware which is used to take reuested data from body in our database
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
app.use('/', web);



app.listen(port, () => {
    console.log(`listening at ${port}`);
})