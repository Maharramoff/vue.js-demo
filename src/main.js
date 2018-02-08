import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import {store} from './store'
import firebase from 'firebase'
import {firebaseConfig, appConfig} from './config'

// Dil paketi üçün
var Lang = require('vuejs-localization');
Lang.requireAll(require.context('./lng', true, /\.js$/));
Vue.use(Lang);

// Vuetify frontend framework
Vue.use(Vuetify);
Vue.config.productionTip = false;

firebase.initializeApp(firebaseConfig);

Vue.mixin({
    methods: {
        __someGlobalFunction: function (str, type)
        {
            //return this.$lang.labels.str;
        },
        __getUser: function ()
        {
            return firebase.auth().currentUser
        },
        __isUser: function ()
        {
            return this.__getUser().uid || false
        }
    }
})

/* eslint-disable no-new */
const initApp = firebase.auth()
    .onAuthStateChanged((firebaseUser) =>
    {
        new Vue({
            el    : '#app',
            router,
            store,
            render: h => h(App),
            created () {
                //store.commit('setLang', appConfig.defaultLang)
                this.$lang.setLang(appConfig.defaultLang);

                firebase.auth().onAuthStateChanged((firebaseUser) =>
                {
                    if (firebaseUser)
                    {
                        store.dispatch('autoSignIn', firebaseUser)
                        //this.$store.state.user = firebase.auth().currentUser
                    }
                })
            }
        })
        initApp()
    })