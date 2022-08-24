const express=require("express");
const bodyParser=require("body-parser")
const https=require("https")
const app=express();
app.use(bodyParser.urlencoded({extended:true}))
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})



app.use(express.static("public"))

app.post("/",function(req,res){
    const fname=req.body.firstName
    const lname=req.body.lastName
    const email=req.body.eMail
    //console.log(fname,lname,email)
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:fname,
                    LNAME:lname
                }
            }
        ]
    }
    const jsonData=JSON.stringify(data)
    
    //const url="https://usX{replace  X with number at the end of api key}.api.mailchimp.com/3.0/lists/{list_id}"
    const options={
        method:"POST",
        auth:"{any name}:{api-key}"
    }
    const request =https.request(url,options,function(response){
        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html")
        }
        else{
            res.sendFile(__dirname+"/failure.html")
        }
        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()

})

app.post("/failure",function(req,res){
    res.redirect("/")
})

app.listen(3000,function(){
    console.log("server started")
})