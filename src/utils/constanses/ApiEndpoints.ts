const BASE_URL = 'https://localhost:5000/api'
const ACTIVITY_URL = BASE_URL + '/activities'
const ACCOUNT_URL = BASE_URL + '/account'
const PHOTO_URL = BASE_URL + '/photos'

export const ApiEndpoints = {
    ACTIVITIES: ACTIVITY_URL,
    ACTIVITY: ACTIVITY_URL + '/',
    ACTIVITY_ATTEND: ACTIVITY_URL + '/attend/',
    ACTIVITY_CATEGORIES: ACTIVITY_URL + '/categories',
    ACTIVITY_CANCEL: ACTIVITY_URL + '/cancel/',
    USER_LOGIN: ACCOUNT_URL + '/login',
    USER_REGISTRATION: ACCOUNT_URL + '/register',
    CURRENT_USER: ACCOUNT_URL + '/current',
    USER_PROFILE: BASE_URL + '/profile/',
    PHOTO_PROFILE: PHOTO_URL + '/user/',
    PHOTO_ADD: PHOTO_URL,
    PHOTO_SET_MAIN: PHOTO_URL + '/set-main/',
    PHOTO_DELETE: PHOTO_URL + '/'
}