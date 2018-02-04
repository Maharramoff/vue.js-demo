/**
 * Created by ADMIN on 04.02.2018.
 */
export const getters = {
    appTitle (state) {
        return state.appTitle
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