import firebase from 'firebase'
import router from '@/router'

export const actions = {
    userSignUp ({commit}, data)
    {
        // Dil paketi üçün
        //var Lang = require('../lng/' + data.lang + '/msg')

        //commit('setLoading', true)
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(firebaseUser =>
            {
                firebaseUser.updateProfile({
                    displayName: data.name,
                }).then(function ()
                {
                    commit('setUser', firebaseUser)
                    commit('setLoading', false)
                    commit('setError', null)
                    router.push('/home')
                }).catch(function (error)
                {
                    commit('setError', error.message)
                    commit('setLoading', false)
                });

            })
            .catch(error =>
            {
                commit('setError', data.lang[error.code.split("/")[1]])
                commit('setLoading', false)
            })
    },
    userSignIn ({commit}, payload)
    {
        commit('setLoading', true)
        firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            .then(firebaseUser =>
            {
                commit('setUser', firebaseUser)
                commit('setLoading', false)
                commit('setError', null)
                router.push('/home')
            })
            .catch(error =>
            {
                commit('setError', error.message)
                commit('setLoading', false)
            })
    },
    autoSignIn ({commit}, payload)
    {
        commit('setUser', payload)
    },
    userSignOut ({commit})
    {
        firebase.auth().signOut()
        commit('setUser', null)
        router.push('/')
    }
}