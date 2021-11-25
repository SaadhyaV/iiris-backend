const mongoose = require('mongoose');

// connection establishment
mongoose.connect("mongodb://localhost:27017/iiris", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, } )
.then( () => console.log('DB Connection successful......'))
.catch( (err) => console.log(err)) ;

