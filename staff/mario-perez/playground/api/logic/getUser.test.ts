import mongoose from "mongoose"

import { getUser } from "./getUser"

mongoose.connect(process.env.MONGODB_URL_TEST!)
    .then(() => {
        console.info("TEST getUserName")

        console.info("CASE success on existing user")

        {
            try {
                return getUser("68410e9266b5ed87be543190")
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