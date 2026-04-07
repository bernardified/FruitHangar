import express  from 'express'
import dotenv from 'dotenv'
import fruitsRoutes from "./routes/fruitsRoutes.js"
import ordersRoutes from "./routes/ordersRoutes.js"
import { connectDB } from './config/db.js'

const app = express()
dotenv.config()

app.use(express.json()) 
app.use("/api/fruits", fruitsRoutes)
app.use("/api/orders", ordersRoutes)

connectDB().then(() => {
    app.listen(5142, () => {
        console.log("Server started on PORT: 5142")
    })    
})
