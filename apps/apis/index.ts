import { REDIS_CLIENT } from "redis/redis";
import { PRISMA_CLIENT } from "db/client";
import express from "express" 
import cors from "cors" 
import Auth from "./middleware/auth"


const app  = express(); 


app.use(express.json()) 
app.use(cors()) 


app.post("/project" , Auth() ,  async (req , res) => {
    const {title , description} = req.body ; 
    const userId = req.userId; 
    console.log("title :" , title)
    console.log("description :" , description)
    const project = await PRISMA_CLIENT.project.create({
        data : { title ,userId , description} 
    })
    res.json({ projectId : project.id}) 
})


app.get("/projects" , Auth() , async ( req , res) => {
    const userId = req.userId ;  
    const projects = await PRISMA_CLIENT.project.findUnique({
      where : {id : userId } 
    })
    res.json({projects : projects})
})





app.listen(3000 , ()=>{console.log("server is running successfully")})






