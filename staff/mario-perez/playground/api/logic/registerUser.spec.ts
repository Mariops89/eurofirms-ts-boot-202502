import { expect } from "chai"
import mongoose from "mongoose"
import { IUser, User } from "../data/models"
import { registerUser } from "./registerUser"
import { DuplicityError } from "com/errors"


describe("registerUser", () => {
    before(() => mongoose.connect(process.env.MONGODB_URL_TEST!))

    beforeEach(() => User.deleteMany({}))

    it("registers a new user", () => {
        let value: void, user: IUser | null
        return registerUser("Peter Pan", "peter@pan.com", "peterpan", "123123123")
            .then(_value => value = _value)
            .then(() => User.findOne().lean())
            .then(_user => user = _user!)
            .finally(() => {
                expect(value).to.be.undefined
                expect(user).to.exist
                expect(user?.name).to.equal("Peter Pan")
                expect(user?.email).to.equal("peter@pan.com")
                expect(user?.password).to.not.equal("123123123")

            })
    })

    it("fails trying to a register a user that already exists", () => {
        let error: Error
        return User.create({ name: "Wendy Darling", email: "wendy@darling.com", username: "wendydarling", password: "123123123" })
            .then(() => registerUser("Wendy Darling", "wendy@darling.com", "wendydarling", "123123123"))
            .catch(_error => error = _error)
            .finally(() => {
                expect(error).to.be.instanceOf(DuplicityError)
                expect(error.message).to.equal("user already exists")

            })
    })

    afterEach(() => User.deleteMany({}))

    after(() => mongoose.disconnect())

})
