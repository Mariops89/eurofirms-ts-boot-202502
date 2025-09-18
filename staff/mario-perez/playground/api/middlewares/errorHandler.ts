import { ValidationError, DuplicityError, NotFoundError, CredentialsError, SystemError } from "com/errors"
import { Request, Response, NextFunction } from "express"


interface ErrorResponse {
    error: string
    message: string
}

interface CustomError extends Error {
    message: string
}

export const errorHandler = (
    error: Error,
    req: Request,
    res: Response<ErrorResponse>,
    next: NextFunction
) => {
    let status: number = 500
    let errorName: string = SystemError.name

    if (error instanceof ValidationError) {
        status = 400
        errorName = ValidationError.name
    } else if (error instanceof DuplicityError) {
        status = 409
        errorName = DuplicityError.name
    } else if (error instanceof NotFoundError) {
        status = 404
        errorName = NotFoundError.name
    } else if (error instanceof CredentialsError) {
        status = 401
        errorName = CredentialsError.name
    }

    res.status(status).json({ error: errorName, message: error.message })
}