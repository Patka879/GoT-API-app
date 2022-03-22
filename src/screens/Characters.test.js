"use strict"


const { expect } = require("@jest/globals")
const { checkAliveStatus } = require("./Characters.jsx")

describe("checkAliveStatus function", () => {
    test("returns uknown if there is no born and death date", () => {
        expect(checkAliveStatus({born: "", died: ""})).toEqual("Unknown")
    })
    test('returns "No" if only date of death is provided', () => {
        expect(checkAliveStatus({died: "263"})).toEqual("No")
    })
    test("returns characters age at death based on dates of birth and death", () => {
        expect(checkAliveStatus({born: "In 233", died: "in 344 AC"})).toEqual("No, died at 111 years old")
    })
    test('returns "Yes" if only date of birth was provided', () => {
        expect(checkAliveStatus({born: "In 121"})).toEqual("Yes")
    })
})

