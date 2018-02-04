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

/* eslint-disable no-new */
new Vue({
    el     : '#app',
    router,
    store,
    render : h => h(App),
    created: function ()
    {
        this.$lang.setLang(appConfig.defaultLang)
    }
});
