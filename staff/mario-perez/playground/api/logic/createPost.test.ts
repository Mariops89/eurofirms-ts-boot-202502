import mongoose from "mongoose"

import { createPost } from "./createPost"

mongoose.connect("mongodb://localhost:27017/test-ts")
    .then(() => {
        console.info("TEST createPost")

        console.info("CASE success on existing user")

        {
            try {
                return createPost("68410e9266b5ed87be543190", "http://image.com/123", "Hola mundo")
                    .then(result => {
                        console.assert(result === undefined, "result is undefined")
                        console.log("post creado")
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())