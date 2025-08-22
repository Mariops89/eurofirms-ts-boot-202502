import mongoose from "mongoose"

import { deletePost } from "./deletePost"

mongoose.connect("mongodb://localhost:27017/test-ts")
    .then(() => {
        console.info("TEST deletePost")

        console.info("CASE success on existing user")

        {
            try {
                return deletePost("68410e9266b5ed87be543190", "67d30e37088eca4212679f62")
                    .then(result => {
                        console.assert(result === undefined, "result is undefined")

                        console.log("post deleted", result)
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())