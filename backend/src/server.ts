import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fruitsRoutes from "./routes/fruitsRoutes.js"
import ordersRoutes from "./routes/ordersRoutes.js"
import { connectDB } from './config/db.js'

const app = express()
dotenv.config()

app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json()) 
app.use("/api/fruits", fruitsRoutes)
app.use("/api/orders", ordersRoutes)

const PORT = process.env.PORT
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started on PORT: ", PORT)
    })    
})
