import express from "express"
import { SystemError } from "./errors"
import logic from "./logic"

const api = express()

api.get('/', (req, res) => {
    res.send('Hello, API')
})

// TODO implement routes

api.use(express.json())

api.post('/users', (req, res) => {
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)
        res.status(201).send()
    } catch (error) {
        res.status(500).json({ error: SystemError.name, message: error.message })
    }

})

api.listen(8080, () => console.log('API is up'))