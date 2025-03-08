import {createClient} from "redis" 
// import {} from "dotenv" 

export const REDIS_CLIENT = createClient({
    url : process.env.REDIS_URL 
})