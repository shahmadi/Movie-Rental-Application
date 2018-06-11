var express=require("express"),
app=express(),
bodyParser=require("body-parser"),
methodOverride=require("method-override"),
mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/webapplication");

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true})); 
app.use(methodOverride("_method"));


var webAppSer=new mongoose.Schema({
    title:String,
    image:String,
    descr:String
});


// service schema
var service=mongoose.model("service",webAppSer);


// service.create({
//     title:"tom",
//     descr: "cruise"
//     },function(err,webdb){
//         if(err){
//             console.log(err);
//         }
//         else{
//             console.log("new created");
//             console.log(webdb);
//         }
//     })
    
    
    
//request schema
var webAppReq=new mongoose.Schema({
    name: String,
    phone: String,
    email:String,
    message:String,
    time: String,
    date: String
});

var request=mongoose.model("request",webAppReq);

//home page
app.get("/",function(req,res){
    res.render("index");
})


//asking for new request and adding it
app.get("/req/new",function(req,res){
    res.render("req");
})

app.post("/req",function(req,res){
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var message=req.body.message;
    var time=req.body.time;
    var date=req.body.date;
    var newrequest={name: name,phone: phone, email: email, message: message, time:time, date:date};
    request.create(newrequest,function(err,nc){
        //if we had error in filling form we might wanna redirect user to form again and show them error message and why
       if(err){
           console.log(err);
       } 
       else{
           res.redirect("/");
       }
       
    });
});

//asking for new service and adding it
app.get("/service",function(req,res){
    service.find({},function(err,allserv){
       if(err){
           console.log(err);
       }
       else{
           res.render("service",{serv:allserv});
       } 
    });
});

app.get("/service/new",function(req,res){
    res.render("newserv");
})

app.get("/service/:id/edit",function(req,res){
    service.findById(req.params.id,function(err,serv){
       if(err){
           res.redirect("/service");
       }
       else{
           res.render("editserv",{serv:serv});
       }
    });
})

//update
app.put("/service/:id",function(req,res){
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var updatedserv={title: title, image:image, descr: descr};
    service.findByIdAndUpdate(req.params.id,updatedserv,function(err,updated){
        if(err){
            res.redirect("/service");
        }
        else{
            res.redirect("/service/"+req.params.id);
        }
    });
});

 app.delete("/service/:id",function(req,res){
     service.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/service");
         }
         else{
             res.redirect("/service");
         }
 })
});

app.get("/service/:id",function(req,res){
    service.findById(req.params.id,function(err,foundServ){
        if(err){
            res.redirect("/service");
        }
        else{
            res.render("showserv",{serv:foundServ})
        }
    })
   // res.send("HELLOo");
    
});

app.post("/service",function(req,res){
    console.log("HELLOO");
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var newservice={title: title, image:image, descr: descr};
    service.create(newservice,function(err,nc){
        //if we had error in filling form we might wanna redirect user to form again and show them error message and why
       if(err){
           console.log(err);
       } 
       else{
           res.redirect("/");
       }
    });
});




// REPLICATE


var webAppPost=new mongoose.Schema({
    title:String,
    image:String,
    descr:String
});


// service schema
var post=mongoose.model("post",webAppPost);

app.get("/post",function(req,res){
    post.find({},function(err,allpost){
       if(err){
           console.log(err);
       }
       else{
           res.render("post",{post:allpost});
       } 
    });
});

app.get("/post/new",function(req,res){
    res.render("newpost");
})

app.get("/post/:id/edit",function(req,res){
    post.findById(req.params.id,function(err,post){
       if(err){
           res.redirect("/post");
       }
       else{
           res.render("editpost",{post:post});
       }
    });
})

//update
app.put("/post/:id",function(req,res){
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var updatedserv={title: title, image:image, descr: descr};
    post.findByIdAndUpdate(req.params.id,updatedserv,function(err,updated){
        if(err){
            res.redirect("/post");
        }
        else{
            res.redirect("/post/"+req.params.id);
        }
    });
});

 app.delete("/post/:id",function(req,res){
     post.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/post");
         }
         else{
             res.redirect("/post");
         }
 })
});

app.get("/post/:id",function(req,res){
    post.findById(req.params.id,function(err,foundPost){
        if(err){
            res.redirect("/post");
        }
        else{
            res.render("showpost",{post:foundPost})
        }
    })
   // res.send("HELLOo");
    
});

app.post("/post",function(req,res){
    console.log("HELLOO");
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var newpost={title: title, image:image, descr: descr};
    post.create(newpost,function(err,nc){
        //if we had error in filling form we might wanna redirect user to form again and show them error message and why
       if(err){
           console.log(err);
       } 
       else{
           res.redirect("/");
       }
    });
});


// REPLICATE AGAIN

var webAppShop=new mongoose.Schema({
    title:String,
    image:String,
    descr:String
});


// service schema
var shop=mongoose.model("shop",webAppShop);

app.get("/shop",function(req,res){
    shop.find({},function(err,allshop){
       if(err){
           console.log(err);
       }
       else{
           res.render("shop",{shop:allshop});
       } 
    });
});

app.get("/shop/new",function(req,res){
    res.render("newshop");
})

app.get("/shop/:id/edit",function(req,res){
    shop.findById(req.params.id,function(err,serv){
       if(err){
           res.redirect("/shop");
       }
       else{
           res.render("editshop",{shop:shop});
       }
    });
})

//update
app.put("/shop/:id",function(req,res){
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var updatedserv={title: title, image:image, descr: descr};
    shop.findByIdAndUpdate(req.params.id,updatedserv,function(err,updated){
        if(err){
            res.redirect("/shop");
        }
        else{
            res.redirect("/shop/"+req.params.id);
        }
    });
});

 app.delete("/shop/:id",function(req,res){
     shop.findByIdAndRemove(req.params.id,function(err){
         if(err){
             res.redirect("/shop");
         }
         else{
             res.redirect("/shop");
         }
 })
});

app.get("/shop/:id",function(req,res){
    shop.findById(req.params.id,function(err,foundShop){
        if(err){
            res.redirect("/shop");
        }
        else{
            res.render("showshop",{shop:foundShop})
        }
    })
   // res.send("HELLOo");
    
});

app.post("/shop",function(req,res){
    console.log("HELLOO");
    var title=req.body.title;
    var descr=req.body.descr;
    var image=req.body.image;
    var newservice={title: title, image:image, descr: descr};
    shop.create(newservice,function(err,nc){
        //if we had error in filling form we might wanna redirect user to form again and show them error message and why
       if(err){
           console.log(err);
       } 
       else{
           res.redirect("/");
       }
    });
});

app.listen(process.env.PORT,process.env.IP,function(){
    console.log("SERVER IS RUNNING");
})