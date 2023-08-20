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

    return dateString + '\xa0' + date.toLocaleTimeString( undefined, { hour: '2-digit', minute: '2-digit'});
}
