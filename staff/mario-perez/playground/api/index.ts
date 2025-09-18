import mongoose from "mongoose"
import express from "express"
import cors from "cors"
import { usersRouter } from "./routes"
import { errorHandler } from "./middlewares"

const { JWT_SECRET, PORT, MONGO_URL } = process.env

mongoose.connect(MONGO_URL!)
    .then(() => {

        const api = express()

        api.use(cors())

        api.get('/', (req, res) => {
            res.send('Hello, API')
        })

        // TODO implement routes

        api.use(express.json())

        api.use(errorHandler)



        const usersRouter = express.Router()


        api.use('/users', usersRouter)

        api.listen(PORT, () => console.log('API is up'))
    })