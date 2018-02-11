//import firebase from 'firebase'
import router from '@/router'
import {fb, db} from '../config'

const notesRef = db.ref('notes');

export const actions = {
    userSignUp ({commit}, data)
    {
        
        fb.auth().createUserWithEmailAndPassword(data.email, data.password)
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
    userSignIn ({commit}, data)
    {
        fb.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(firebaseUser =>
            {
                commit('setUser', firebaseUser)
                commit('setLoading', false)
                commit('setError', null)
                router.push('/home')
            })
            .catch(error =>
            {
                commit('setError', data.lang[error.code.split("/")[1]])
                commit('setLoading', false)
            })
    },
    autoSignIn ({commit}, payload)
    {
        commit('setUser', payload)
    },
    userLogout ({commit})
    {
        fb.auth().signOut()
        commit('setUser', null)
        router.push('/')
    },
    // Notes
    noteAdd ({commit}, data)
    {
        notesRef.push(data)

        notesRef.on('value', (snapshot) =>
        {
            let notes = snapshot.val()
            console.log(notes)
            //window.alert(notes[0].title)
        })
    }

}
