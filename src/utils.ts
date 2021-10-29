import { newPatient } from "./types"

const parseNewPatient = (patientData: any) : newPatient => {
    const {name, dateOfBirth, ssn, gender, occupation} = patientData

    const parsedPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn,
        gender,
        occupation
    }

    return parsedPatient;
}

const isString = ((name: unknown) : name is string => {
    return typeof name === 'string' || name instanceof String 
})

const parseString = ((name: unknown) : string => {
    if(!name || !isString(name)) {
        throw new Error(`Missing name or invalid data`)
    }

    return name
})

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date))
}

// isString operation runs first so that's why isDate can take the date in as string since it comes AFTER parsing for a string
const parseDate = (date: unknown) : string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error(`Missing date or invalid data`)
    }

    return date
}

export { parseNewPatient }