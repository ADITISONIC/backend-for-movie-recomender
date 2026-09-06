import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { recommendedRouter } from './routes/recommended.route.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health',(req,res)=>{
    res.json({status:'ok'})
})

app.use("/api/recommend",recommendedRouter)

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})