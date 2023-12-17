import type { FormInputToValidate } from "@/models/auxillary/interfaces";

/**
 * @param {Date} dateObject - date to be stringify
 * @returns {string} - Date in ISO string format without trailing letter 'Z' and seconds
 * - If you pass through invalid date, returns date with value 0.
 */
export const DateToISOStringWithoutSeconds = (dateObject: Date | string): string => {
    let dateString: string;
    let date: Date;

    date = new Date(dateObject)

    if (date.toString() === 'Invalid Date' || date.toString() === '') {
        date = new Date(0);
    }

    const utcOffsetMinutes = date.getTimezoneOffset();
    const utcOffsetHours = Math.round(utcOffsetMinutes / 60);
    let hoursToSet = date.getHours() - utcOffsetHours;

    date.setHours(hoursToSet);

    dateString = date.toISOString();

    if (dateString.includes('Z')) {
        const colonPosition = dateString.lastIndexOf(':');
        dateString = dateString.slice(0, colonPosition);
    }

    return dateString;
}

/**
 * @param {Date} dateObject - date to be stringify
 * @returns {string} - Date in czech format with one or two digit day and month
 * @example 3.10.2023
 */
export const DateTimeToCzechFormat = (dateObject: Date | string): string => {
    let dateString: string;
    let date: Date;

    date = new Date(dateObject)

    if (date.toString() === 'Invalid Date' || date.toString() === '') {
        date = new Date(0);
    }

    dateString = date.toLocaleDateString(undefined, { day: 'numeric', month: 'numeric', year: 'numeric' });
    dateString = dateString.split(' ').join('');

    return dateString + '\xa0' + date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
}


export const ScrollPageToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}


export const defineChangeOfInput = (formInput: FormInputToValidate) => {
    if (formInput.value !== '') {
        formInput.isChanged = true;
        formInput.isValid = true;
        formInput.warning = '';
    }
}


export const getCookieValueByName = (cookieName: string) : string => {
    let nameWithEqualSign = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let splitedCookies = decodedCookie.split(';');
    for(let i = 0; i <splitedCookies.length; i++) {
      let singleCookie = splitedCookies[i];
      while (singleCookie.charAt(0) == ' ') {
        singleCookie = singleCookie.substring(1);
      }
      if (singleCookie.indexOf(nameWithEqualSign) !== -1) {
        return singleCookie.substring(nameWithEqualSign.length, singleCookie.length);
      }
    }
    return "";
}

export const setCookie = (cookieName: string, valueAsString: string, expiresIn: Date) :void => {
    document.cookie = `${cookieName}=${valueAsString};expires=${expiresIn.toUTCString()};path=/`
}