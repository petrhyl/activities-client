const NAME_REGEX =
    /^(([A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]{1}[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]*[ \-']*[A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]*[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]+)+|([A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý]{1}[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ]+))$/;
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-zšžřčťďňěľĺŕůśźćńà-ïñ-öù-ÿ])(?=.*[A-ZŠŽČŘĎŤŇŸĹĽŔŚŹĆŃÀ-ÖÙ-Ý])(?!.* )(?!.*\t).{6,}$/;
const USERNAME_REGEX = /^[\w\-]{3,}$/;
const PHONE_REGEX = /^\+?[0-9 ?]{6,14}$/;

export const isNameValid = (input: string): boolean => {
    return NAME_REGEX.test(input)
}

export const isTitleValid = (input: string):boolean=>{
    return input.trim().length > 2
}

export const isUserNameValid = (input: string): boolean => {
    return USERNAME_REGEX.test(input)
}

export const isEmailValid = (input: string): boolean => {
    return EMAIL_REGEX.test(input)
}

export const isPasswordValid = (input: string): boolean => {
    return PASSWORD_REGEX.test(input)
}

export const isDateValid = (input: string): boolean => {
    return !(input === new Date(0).toString() || new Date(input).toString() === 'Invalid Date')
}