class DuplicityError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class CredentialsError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class NotFoundError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class SystemError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class OwnershipError extends Error {
    constructor(message: string) {
        super(message)
    }
}

class ValidationError extends Error {
    constructor(message: string) {
        super(message)
    }
}

export {
    DuplicityError,
    CredentialsError,
    NotFoundError,
    SystemError,
    OwnershipError,
    ValidationError
}