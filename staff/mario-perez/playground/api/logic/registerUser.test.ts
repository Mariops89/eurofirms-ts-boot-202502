import mongoose from "mongoose"
import { registerUser } from "./registerUser"

mongoose.connect(process.env.MONGODB_URL_TEST!)
    .then(() => {

        console.info("TEST registerUser")

        console.info("CASE success on new user")

        {
            try {
                return registerUser("Peter Pan", "peter@pan.com", "peterpan", "123123123")
                    .then(() => {
                        console.log("user saved")
                    })
                    .catch(error => console.error(error))

            } catch (error) {
                console.error(error)
            }
        }
    })
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())