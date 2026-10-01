const express = require("express");
const {connectToMongoDB}= require("./connect")
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const path  = require("path");
const staticRoute = require("./routes/staticRouter")
const userRoute = require("./routes/user")
const cookieParser = require("cookie-parser");
const {restrictToUserLoginOnly,checkAuth} = require("./middlewares/auth")

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("MongoDB Connected..."))

app.set("view engine", "ejs");
app.set("views",path.resolve("./views"))
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get("/url/:shortId",async (req,res)=>{
  const allUrls = await URL.find({});
  return res.render("home",{
    urls: allUrls,
  })
});

app.use("/", checkAuth,staticRoute)
app.use("/url",restrictToUserLoginOnly,urlRoute)
app.use("/user",userRoute)
app.use(cookieParser());

app.get('/:shortId',async (req,res)=>{
  const shortId = req.params.shortId;
  const entry= await URL.findOneAndUpdate({
    shortId
  },{$push:{
    visitHistory: {
      timestamp:Date.now()
    }
  }})
  if (!entry) {
  return res.status(404).json({
    error: "Short URL not found"
  });
}
  res.redirect(entry.redirectURL)

})

app.listen(PORT,()=> console.log(`Server Started at PORT : ${PORT}`))