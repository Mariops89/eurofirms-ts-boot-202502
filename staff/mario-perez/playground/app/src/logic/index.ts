import { registerUser } from "./registerUser"
import { loginUser } from "./loginUser"
import { getUser } from "./getUser"
import { Logic } from "./types"


export const logic: Logic = {
    registerUser,
    loginUser,
    getUser
}
