const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const errorHandler = require('./middleware/errorHandling');
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const countryRouter = require("./routes/country");
const placeRouter = require("./routes/place");
const hotelRouter = require("./routes/hotel");
const reviewRouter = require("./routes/review");
const reservationRouter = require("./routes/reservation");

const port = 5003

const cors = require("cors");
app.use(cors());
dotenv.config();
mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("database connected"))
.catch((err)=> console.log(err))


app.use(express.json({limit: '10mb'}));
app.use(express.urlencoded({limit: "10mb", extended: true}));
app.use(bodyParser.json())

app.use(errorHandler);
app.use('/api/', authRouter);
app.use('/api/users', userRouter);
app.use('/api/countries', countryRouter);
app.use('/api/places', placeRouter);
app.use('/api/hotels', hotelRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/reservation', reservationRouter);



app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${process.env.PORT }!`))