import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import router from './router'
import {store} from './store'
import {appConfig, fb, db} from './config'
import Vuefire from 'vuefire'

// DB üçün
Vue.use(Vuefire);

// Dil paketi üçün
var Lang = require('vuejs-localization');
Lang.requireAll(require.context('./lng', true, /\.js$/));
Vue.use(Lang);

// Vuetify frontend framework
Vue.use(Vuetify);
Vue.config.productionTip = false;

Vue.mixin({
    methods: {
        __someGlobalFunction: function (str, type)
        {
            //return this.$lang.labels.str;
        },
        __getUser           : function ()
        {
            return fb.auth().currentUser
        },
        __isUser            : function ()
        {
            return this.__getUser() ? this.__getUser().uid : false
        }
    }
})

/* eslint-disable no-new */
const initApp = fb.auth()
    .onAuthStateChanged((firebaseUser) =>
    {
        new Vue({
            el    : '#app',
            router,
            store,
            render: h => h(App),
            created () {

                this.$lang.setLang(appConfig.defaultLang);

                if (firebaseUser)
                {

                    store.dispatch('autoSignIn', firebaseUser)
                    store.dispatch('noteAdd', {title: 'Hello world', content: 'Lorem ipsum'})
                    //this.$store.state.user = firebase.auth().currentUser
                }
            }
        });
        initApp()
    });