import mongoose from "mongoose"
import { expect } from "chai"
import { UserDocType, User } from "../data/models"
import { authenticateUser } from "./authenticateUser"
import { NotFoundError, CredentialsError, SystemError } from "com/errors"

describe("authenticateUser", () => {
    before(() => mongoose.connect(process.env.MONGODB_URL_TEST!))

    beforeEach(() => User.deleteMany({}))

    it("authenticates an existing user", () => {
        let userId: string, user: UserDocType | null
        return User.create({
            name: "James Hook",
            email: "james@hook.com",
            username: "jameshook",
            password: "123123123"
        })
            .then(_user => user = _user)
            .then(() => authenticateUser("jameshook", "123123123"))
            .then(_userId => userId = _userId)
            .finally(() => {
                expect(userId).to.be.a("string")
                expect(userId).to.equal(user?._id.toString())

            })
    })

    it("fails on no-existing user", () => {
        let error: Error
        return authenticateUser("campanilla", "123123123")
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal("user not found")

            })
    })

    it("fails on existing user but wrong password", () => {
        let error: Error
        return User.create({
            name: "James Hook",
            email: "james@hook.com",
            username: "jameshook",
            password: "123123123"
        })
            .then(() => authenticateUser("jameshook", "321321321"))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(CredentialsError)
                expect(error.message).to.equal("Wrong credentials")

            })
    })

    after(() => mongoose.disconnect())

})