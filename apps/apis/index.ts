import { REDIS_CLIENT } from "redis/redis";
import { PRISMA_CLIENT } from "db/client";
import express from "express" 
import cors from "cors" 
import Auth from "./middleware/auth"


const app  = express(); 


app.use(express.json()) 
app.use(cors()) 


app.post("/project" , Auth() ,  async (req , res) => {
    const {title , type } = req.body ; 
    let userId = req.userId; 

    
 
    const user_exist = await PRISMA_CLIENT.user.findUnique({
        where :  { id : userId }  }) 

    console.log(user_exist)     
    console.log(userId) 
    
    const project = await PRISMA_CLIENT.project.create({
        data : { title ,userId , type : type } 
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


app.listen( 4000, ()=>{console.log("server is running successfully on port 4000")})






