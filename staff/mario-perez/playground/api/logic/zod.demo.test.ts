import { z, ZodType } from "zod"
import { ValidationError } from "../errors"

const checkId = value => /^[0-9a-fA-F]{24}$/.test(value)
// checkId es una función de validación con el parámetro value que devuelve un booleano

const idSchema = z.string().refine(checkId, { message: "invalid id, not a 24-character hexadecimal string" })
// refine tiene dos parámetros: el primero es la función de validación y el segundo es un mensaje de error que se mostrará si la función devuelve falso

const nameSchema = z.string().min(1).max(30)
// nameSchema es un esquema de validación que valida que el valor sea una cadena de texto con una longitud mínima de 1 y máxima de 30 caracteres

// Con parse

function validateParse<T>(schema: ZodType<T>, data: unknown) {
    try {
        const result = schema.parse(data)
        console.log("Valid:", result)
    } catch (error) {
        if (error instanceof z.ZodError) {
            throw new ValidationError(error.issues[0]?.message || "validation failed")
        }
        throw error // por si es otro tipo de error
    }
}



// Con safeParse

function validateSafeParse<T>(schema: ZodType<T>, data: unknown) {
    const result = schema.safeParse(data)
    // safeParse devuelve un objeto con una propiedad success que indica si la validación fue exitosa o no, y una propiedad data que contiene el valor analizado o un array de errores

    if (result.success) // si el objeto que devuelve safeParse incluye la propiedad success con valor true
        return

    throw new ValidationError(result.error.issues[0]?.message || "validation failed")
}


try {
    const name = "X"

    validateParse(nameSchema, name) // validateParse o validateSafeParse tiene como primer parámetro el esquema de validación y como segundo el dato a validar

    console.log("Valid:", name)
} catch (error) {
    if (error instanceof ValidationError) {
        console.log("Validation Error:", error.message)
    }
}

//Validación con expresiones regulares

const regex = /^[a-zA-Z0-9]+$/

regex.test("validString") // true