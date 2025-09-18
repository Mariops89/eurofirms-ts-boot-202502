import express from "express";
import { jsonBodyParser } from "../middlewares";
import { logic } from "../logic";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

export const usersRouter = express.Router();

usersRouter.post('/', jsonBodyParser, (req, res, next) => {
    try {
        const { name, email, username, password } = req.body

        logic.registerUser(name, email, username, password)
            .then(() => res.status(201).send())
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

})

usersRouter.post('/auth', (req, res, next) => {
    try {
        const { username, password } = req.body

        logic.authenticateUser(username, password)
            .then(userId => {
                const token = jwt.sign({ sub: userId }, JWT_SECRET!)

                res.json(token)
            })
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

})

usersRouter.get('/self', (req, res, next) => {
    try {
        const authorization = req.headers.authorization!


        const token = authorization.slice(7)

        const { sub: userId } = jwt.verify(token, JWT_SECRET!)

        logic.getUser(userId as string)
            .then(user => res.json(user))
            .catch(error => next(error))
    } catch (error) {
        next(error)
    }

})