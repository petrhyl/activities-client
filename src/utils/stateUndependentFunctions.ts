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


    dateString = date.toISOString();

    if (dateString.includes('Z')) {
        const colonPosition = dateString.lastIndexOf(':');
        dateString = dateString.slice(0, colonPosition);
    }

    return dateString;
}