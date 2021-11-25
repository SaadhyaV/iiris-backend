var http = require('http');
require('./config/db');

var cors = require('cors');
var express     = require('express');  
// var mongoose    = require('mongoose');  
var multer      = require('multer');  
var path        = require('path');  
const AlertModel     = require('./models/alerts');
var csv         = require('csvtojson');  
var bodyParser  = require('body-parser'); 

const app = express();
app.use(cors)
app.use(express.json());
const port = process.env.PORT || 8800;

app.get("/", async (req, res) => {
    // res.send("Hello from IIRIS");
    try{
        const alerts = await AlertModel.find({});
        console.log(alerts);
        res.status(200).send(alerts);
    }catch(e){
        res.status(400).send(e);
    }
})

app.post('/alerts', async (req, res) =>{
    try{
        const addAlerts = new AlertModel(req.body);
        console.log(req.body);
        const addedData = await addAlerts.save();
        res.status(200).send(addedData);
    }
    catch(e){
        res.status(400).send(e);
    }
})

var uploads = multer({
    limits: {fileSize: 1024 * 1024 * 5}
});  

//fetch data from the request  
app.use(bodyParser.urlencoded({extended:false}));  
//static folder  
app.use(express.static(path.resolve(__dirname,'public')));  
//default pageload  
app.get('/getData',(req,res)=>{  
    csvModel.find((err,data)=>{  
        if(err){  
            console.log(err);  
        }else{  
            if(data!=''){  
            res.render('demo',{data:data});  
            }else{  
            res.render('demo',{data:''});  
        }  
    }  
});  
});  
    var temp ;  
app.post('upload', async (req, res) =>{
    console.log("-----------upload csv------------");
    const fileName = req.body.fileName;
    console.log(fileName);

    // convert csv to json
    // data read from file and save it to db
    // notify user file or data readed successfully
    // no need of keeping the csv file in server

})
app.post('/uploadCsv',uploads.single('csv'),(req,res)=>{  
    console.log("-----------Upload CSV------------");
    //convert csvfile to jsonArray     
    const fileName = req.body.fileName;
    const name = req.file.originalname;
    // const path = req.files.up;
    console.log(name);
    console.log(fileName);

    csv()  
    .fromFile(fileName)  
    // .fromFile(req.file.path)  
    .then((jsonObj)=>{  
    console.log(jsonObj);  

    console.log(req.file.path)
    
    //insertmany is used to save bulk data in database.
    //saving the data in collection(table)
        // AlertModel.insertMany(jsonObj, (err, data)=>{  
        //     if(err){  
        //         console.log(err);  
        //         res.send(err);
        //     }else{  
        //         // res.redirect('/');  
        //         res.send('uploaded successfully!')
        //     }  
        // });  
    });  
    });
    

app.get('/get-facility-alerts', async (req, res) =>{
    try{
        const facilityAlerts = await AlertModel.find({$and:[{type: "BMS-HVAC"},{type: "IOT"}, {type: "UPS" }, {category: "Facility"}]}, 
        function(err, user){
            if (err)
            {
                res.send(err);
            }
            console.log(user)
        });
        console.log(req.body);
        console.log(facilityAlerts);
        res.status(200).send(facilityAlerts);
    }
    catch(e){
        res.status(400).send(e);
    }
})

app.post('/ticket-raise', async (req, res) =>{
    try{
        req.body.isTicketRaised = true;
        const addAlerts = new AlertModel(req.body);
        console.log(req.body);
        const addedData = await addAlerts.save();
        res.status(200).send(addedData);
    }
    catch(e){

    }
})
    

app.listen(port, ()=>{
    `Connnection is live at port : ${port}`
})


// function onRequest(req, res){
//     res.writeHead(200, {
//         'Content-Type':'text/plain'
//     });
//     res.write('Hello world');
//     res.end();
// }
// http.createServer(onRequest).listen(8800)