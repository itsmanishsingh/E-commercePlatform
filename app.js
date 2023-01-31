import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

// npm i morgan - it prints the information about api request and response in the console
// npm i cors - allows the middleware ,it gives access to the certain selective hoisting site to interact with the backend

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser())

//morgan logger
app.use(morgan('tiny'));

export default app;