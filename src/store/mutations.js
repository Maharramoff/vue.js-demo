/**
 * Created by ADMIN on 04.02.2018.
 */
export const mutations = {
    setUser (state, payload) {
        state.user = payload
    },
    setError (state, payload) {
        state.error = payload
    },
    setLoading (state, payload) {
        state.loading = payload
    }
}