import {
    IErrorTypeChecklist,
    passwordMatchResults,
} from "../../types/LoginComponentTypes";
import {
    validateEmailFormat,
    validatePassword,
    validateUsername,
    generateIsErrorCheckList,
    matchPassword,
} from "../LoginComponentUtilMethods";

describe(" LoginComponentUtilMethods Test Suite", () => {
    describe("validateEmailFormat test suite", () => {
        it("Should pass when given a proper email", () => {
            const mockInput = "thisValidEmail@validDomain.com";

            expect(validateEmailFormat(mockInput)).toBe(true);
        });

        it("Should pass when given a proper email (series)", () => {
            const mockInputs: string[] = [
                "thisValidEmail@validDomain.com",
                "thisValid_Email@validDomain.com",
                "number123@mobility.com",
            ];

            mockInputs.forEach((mockInput) => {
                expect(validateEmailFormat(mockInput)).toBe(true);
            });
        });

        it("Should fail when email does not match regulations", () => {
            const mockInputs: string[] = [
                "!notaValid@email@validDomain.com",
                "missingDomain-domain.com",
                "missinglevel@domain",
            ];

            mockInputs.forEach((mockInput) => {
                expect(validateEmailFormat(mockInput)).toBe(false);
            });
        });
    });

    describe("validatePassword test suite", () => {
        it("Should pass when given a proper password", () => {
            const mockInput = "ThisIsaVa1idP@ssword";

            expect(validatePassword(mockInput)).toBe(true);
        });

        it("Should pass when given a proper password (series)", () => {
            const mockInputs: string[] = [
                "1MyValidP@ssw-rd!",
                "Als0myV@lidP@ss0wrd",
            ];

            mockInputs.forEach((mockInput) => {
                expect(validatePassword(mockInput)).toBe(true);
            });
        });

        it("Should fail when password does not match regulations", () => {
            const mockInputs: string[] = [
                "notAValidPassword",
                "notLong",
                "MissingSpecialSymbol",
                "M!ssingANumber",
            ];

            mockInputs.forEach((mockInput) => {
                expect(validatePassword(mockInput)).toBe(false);
            });
        });
    });

    describe("validateUsername test suite", () => {
        it("Should pass when given a proper username", () => {
            const mockInput = "AValidUsername";

            expect(validateUsername(mockInput)).toBe(true);
        });

        it("Should pass when given a proper username (series)", () => {
            const mockInputs: string[] = [
                "myUser_nameWillPAss",
                "Okay.Username",
                "1ThinG00D-User"
            ];

            mockInputs.forEach((mockInput) => {
                expect(validateUsername(mockInput)).toBe(true);
            });
        });

        it("Should fail when username does not match regulations", () => {
            const mockInputs: string[] = [
                "short",
                "TooVeryLongAUserNameIsVeryLong",
                "U%ing!Sp@cialS#mbol",
                "_IntheBegingin",
                "-IntheBegingin",
                ".IntheBegingin",
            ];

            mockInputs.forEach((mockInput) => {
                expect(validateUsername(mockInput)).toBe(false);
            });
        });
    });

    describe("generateIsErrorCheckList test suite", () => {
        it("Should generate a default testList object", () => {
            const expectedResult: IErrorTypeChecklist = {
                INVALID_PASSWORD: false,
                MISMATCH_PASSWORD: false,
                MISSING_FIELDS: false,
                INVALID_EMAIL: false,
                USERNAME_TAKEN: false,
                INVALID_USERNAME_LENGTH: false,
            };
            expect(generateIsErrorCheckList()).toEqual(expectedResult);
        });
    });

    describe("matchPassword test suite", () => {
        it("should return passwordMatchResults.NOT_CONCLUSIVE if either fields are empty", () => {
            const password = "ThisIsAP@ssowrd!";
            const emptyPassword = "";
            const confirmPassword = "ThisIsAP@ssowrd!";
            const emptyConfirmPassword = "";
            
            expect(matchPassword(emptyPassword, confirmPassword)).toEqual(
                passwordMatchResults.NOT_CONCLUSIVE
            );
            expect(matchPassword(password, emptyConfirmPassword)).toEqual(
                passwordMatchResults.NOT_CONCLUSIVE
            );
        });
        it("Should return passwordMatchResults.MATCHES if paswords Match", () => {
            const password = "ThisIsAP@ssowrd!";
            const confirmPassword = "ThisIsAP@ssowrd!";
            expect(matchPassword(password, confirmPassword)).toEqual(
                passwordMatchResults.MATCHES
            );
        });
        it("Should return passwordMatchResults.NOT_MATCHES if paswords do not Match", () => {
            const password = "ThisIsAP@ssowrd!";
            const confirmPassword = "DoesNotMatch!";
            expect(matchPassword(password, confirmPassword)).toEqual(
                passwordMatchResults.NOT_MATCHES
            );
        });
    });
});
