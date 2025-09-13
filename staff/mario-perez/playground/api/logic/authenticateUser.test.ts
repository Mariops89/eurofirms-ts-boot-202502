import mongoose from "mongoose"

import { authenticateUser } from "./authenticateUser"

mongoose.connect(process.env.MONGODB_URL_TEST!)
    .then(() => {
        console.info("TEST authenticateUser")

        console.info("CASE success on existing user")

        {
            try {
                return authenticateUser("peterpan", "123123123")
                    .then((userId) => {
                        console.log("user authenticated", userId)
                    })
                    .catch(error => console.error(error))
            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())