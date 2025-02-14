import logic from "./logic"
import data from "./data"

try {
    logic.registerUser('Peter Pan', "peter@pan.com", "peterpan", "123123123")

    console.log(data.users)
} catch (error) {
    console.error(error)
}