/**
 * Created by ADMIN on 04.02.2018.
 */
export const getters = {
    appTitle (state) {
        return state.appTitle
    },    
    welcomeTitle (state) {
        return state.welcomeTitle
    },
    homeTitle (state) {
        return state.homeTitle
    },
    signupTitle (state) {
        return state.signupTitle
    },
    signinTitle (state) {
        return state.signinTitle
    },
    madeWith (state) {
        return state.madeWith
    },
    getUser (state) {
        return state.user
    },
    getError (state) {
        return state.error
    },
    getLoading (state) {
        return state.loading
    }
}