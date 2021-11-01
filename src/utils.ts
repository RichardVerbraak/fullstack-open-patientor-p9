import { Gender } from "../patientor/src/types";
import { newPatient } from "./types"

const parseNewPatient = (patientData: any) : newPatient => {
    const {name, dateOfBirth, ssn, gender, occupation} = patientData

    const parsedPatient = {
        name: parseString(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSSN(ssn),
        gender: parseGender(gender),
        occupation: parseOccupation(occupation)
    }

    return parsedPatient as newPatient
}

const isString = ((name: unknown) : name is string => {
    return typeof name === 'string' || name instanceof String 
})

const isDate = (date: string) : boolean => {
    return Boolean(Date.parse(date))
}

const isGender = (gender: any) : gender is Gender => {
    return Object.values(Gender).includes(gender)
}

const parseString = ((name: unknown) : string => {
    if(!name || !isString(name)) {
        throw new Error(`Missing name or invalid data -- ${name}`)
    }

    return name
})

// isString operation runs first so that's why isDate can take the date in as string since it comes AFTER parsing for a string
const parseDate = (date: unknown) : string => {
    if(!date || !isString(date) || !isDate(date)) {
        throw new Error(`Missing date or invalid data -- ${date}`)
    }

    return date
}

const parseSSN = (ssn: unknown) : string => {
    if(!ssn || !isString(ssn)) {
        throw new Error(`Missing ssn or invalid data -- ${ssn}`)
    }

    return ssn
}

const parseGender = (gender: any) : Gender => {
    if(!gender || !isGender(gender)) {
        throw new Error(`Missing gender or invalid data -- ${gender}`)
    }

    return gender
}

const parseOccupation = (occupation: unknown) : string => {
    if(!occupation || !isString(occupation)) {
        throw new Error(`Missing occupation or invalid data -- ${occupation}`)
    }

    return occupation
}

export { parseNewPatient }