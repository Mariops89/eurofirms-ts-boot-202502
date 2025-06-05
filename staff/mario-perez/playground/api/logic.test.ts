import mongoose from "mongoose"

import logic from "./logic"
import { CredentialsError, DuplicityError, NotFoundError } from "./errors"

mongoose.connect('mongodb://localhost:27017/test-ts')
    .then(() => {


        console.info('SUITE logic')

        console.info('TEST registerUser')

        console.info('CASE success on new user')

        {
            try {
                return logic.registerUser('Peter Pan', "peter@pan.com", "peterpan", "123123123")
                    .then(() => {
                        console.log('user saved')
                    })
                    .catch(error => console.error(error))

                // manualmente
                //console.log(data.users)

                //automáticamente

                /*
                const user = data.users.find(user => user.username === 'peterpan')
                console.assert(user !== undefined, 'user exists')
                console.assert(user && user?.name === 'Peter Pan', 'user name is Peter Pan')
                console.assert(user && user.email === 'peter@pan', 'user email is peter@pan')
                console.assert(user && user.username === 'peterpan', 'user username is peterpan')
                console.assert(user && user.password === '123123123', 'user password is 123123123')
                */

            } catch (error) {
                console.error(error)
            }
        }

        console.info('CASE fails on already existing user')

        {
            // TODO case
        }

        console.info('TEST authenticateUser')

        console.info('CASE success on existing user')

        {
            // TODO case
        }

        console.info('CASE fails on existing user but wrong username')

        {
            // TODO case
        }

        console.info('CASE fails on existing user but wrong password')

        {
            // TODO case
        }

        console.info('CASE fails no existing user')

        {
            // TODO case
        }

        console.info('TEST getUserName')

        console.info('CASE success on existing user')

        {
            // TODO case
        }

        console.info('CASE fails on non-existing user')

        {
            // TODO case
        }
    })

    .catch(error => console.error(error))
    .finally(() => mongoose.disconnect())