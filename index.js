import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";


//create a function-> Run the funciton
// "()() :- IIFE (Immediately Invoked Function Expression) 
//   This type is used when the function is defined and executed immediately
//   (async ()=>{})()
( async () => {
    try {
        await mongoose.connect(config.MONGODB_URL)
        console.log(`Connected to Database`);
        
        // app.on('mount', callback(parent))  
        //--- The mount event is fired on a sub-app, when it is mounted on a parent app. The parent app is passed to the callback function.
        //  The error is being passed back to the call back function
        app.on('error', (err) => {
            console.log("ERROR: ", err);
            throw err;
        })

        const onlistening = () => {
            console.log(`Application is running at ${config.PORT}`);
        }

        app.listen(config.PORT , onlistening)

    } catch (err) {
        console.log("ERROR", err);
        throw err;
    }

})()