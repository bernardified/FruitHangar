import express  from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import fruitsRoutes from "./routes/fruitsRoutes.js"
import ordersRoutes from "./routes/ordersRoutes.js"
import { connectDB } from './config/db.js'
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express()
dotenv.config()

if(process.env.NODE_ENV !== "production") {
    app.use(cors({origin:"http://localhost:5173"}))
}
app.use(express.json()) 
app.use("/api/fruits", fruitsRoutes)
app.use("/api/orders", ordersRoutes)

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")))
}

const PORT = process.env.PORT
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("Server started on PORT: ", PORT)
    })    
})
