const BASE_URL = 'https://localhost:5000/api'
const ACTIVITY_URL = BASE_URL + '/activities'
const ACCOUNT_URL = BASE_URL + '/account'
const PHOTO_URL = BASE_URL + '/photos'
const USER_PROFILE = BASE_URL + '/profile/'

export const ApiEndpoints = {
    ACTIVITIES: ACTIVITY_URL,
    ACTIVITY: ACTIVITY_URL + '/',
    ACTIVITY_ATTEND: ACTIVITY_URL + '/attend/',
    ACTIVITY_CATEGORIES: ACTIVITY_URL + '/categories',
    ACTIVITY_CANCEL: ACTIVITY_URL + '/cancel/',
    USER_LOGIN: ACCOUNT_URL + '/login',
    USER_REGISTRATION: ACCOUNT_URL + '/register',
    CURRENT_USER: ACCOUNT_URL + '/current',
    REFRESH_TOKEN: ACCOUNT_URL + '/refresh-token',
    USER_PROFILE: USER_PROFILE,
    TOGGLE_FOLLOW: USER_PROFILE + 'following/',
    REMOVE_FOLLOWER: USER_PROFILE + 'remove-follower/',
    FOLLOWERS: USER_PROFILE + 'followers/',
    FOLLOWEES: USER_PROFILE + 'followees/',
    PHOTO_PROFILE: PHOTO_URL + '/user/',
    PHOTO_ADD: PHOTO_URL,
    PHOTO_SET_MAIN: PHOTO_URL + '/set-main/',
    PHOTO_DELETE: PHOTO_URL + '/',
}