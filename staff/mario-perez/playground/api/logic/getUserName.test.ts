import mongoose from "mongoose"

import { getUserName } from "./getUserName"

mongoose.connect("mongodb://localhost:27017/test-ts")
    .then(() => {
        console.info("TEST getUserName")

        console.info("CASE success on existing user")

        {
            try {
                return getUserName("68410e9266b5ed87be543190")
                    .then((userName) => {
                        console.log("user name gotten", userName)
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())