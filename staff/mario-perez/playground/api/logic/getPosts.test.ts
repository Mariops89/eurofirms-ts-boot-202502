import mongoose from "mongoose"

import { getPosts } from "./getPosts"

mongoose.connect("mongodb://localhost:27017/test-ts")
    .then(() => {
        console.info("TEST getPost")

        console.info("CASE success on existing user")

        {
            try {
                return getPosts("68410e9266b5ed87be543190")
                    .then(posts => {
                        console.log("posts", posts)
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())