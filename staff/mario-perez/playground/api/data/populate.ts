import mongoose from "mongoose"
import { IUser, User } from "./models"

mongoose.connect('mongodb://localhost:27017/test-ts')
    .then(() => {
        const user = new User<IUser>({
            name: 'Peter Pan',
            email: 'peter@pan.com',
            username: 'peterpan',
            password: '123123123'
        })

        return user.save()
    })
    .then(() => console.debug('populated'))
    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())