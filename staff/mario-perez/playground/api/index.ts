import express from "express"
import jwt from 'jsonwebtoken'
import mongoose from "mongoose"

import { SystemError } from "./errors"
import logic from "./logic"


const JWT_SECRET = 'un secreto muy secreto ...'
const PORT = 8080
const MONGO_URL = 'mongodb://localhost:27017/test-ts'

mongoose.connect(MONGO_URL)
    .then(() => {



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
                    .then(() => res.status(201).send())
                    .catch(error => res.status(500).json({ error: SystemError.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: SystemError.name, message: error.message })
            }

        })

        api.post('/users/auth', (req, res) => {
            try {
                const { name, email, username, password } = req.body

                logic.authenticateUser(username, password)
                    .then(userId => {
                        const token = jwt.sign({ sub: userId }, JWT_SECRET)

                        res.json(token)
                    })
                    .catch(error => res.status(500).json({ error: SystemError.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: SystemError.name, message: error.message })
            }

        })

        api.get('/users/self', (req, res) => {
            try {
                const authorization = req.headers.authorization

                if (!authorization) {
                    res.status(400).json({ error: SystemError.name, message: 'no authorization received' })

                    return
                }

                const token = authorization.slice(7)

                const { sub: userId } = jwt.verify(token, JWT_SECRET)

                logic.getUserName(userId as string)
                    .then(name => res.json(name))
                    .catch(error => res.status(500).json({ error: SystemError.name, message: error.message }))
            } catch (error) {
                res.status(500).json({ error: SystemError.name, message: error.message })
            }

        })

        api.listen(PORT, () => console.log('API is up'))
    })