<template>
    <v-app :lang="$lang.getLang()" style="font-family: monospace;">

        <v-navigation-drawer fixed temporary v-model="sidebar" app>
            <v-list>
                <v-list-tile
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.path">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title }}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile @click="__userLogout" v-if="__isUser()">
                    <v-list-tile-action>
                        <v-icon>exit_to_app</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{$lang.titles.sign_out}}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

        <v-toolbar color="amber" fixed app>
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click.stop="sidebar = !sidebar">
        </v-toolbar-side-icon>
      </span>
            <v-toolbar-title>
                <router-link to="/" tag="span" style="cursor: pointer">
                    {{$lang.titles.app_title}}
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-xs-only">
                <v-btn
                        flat
                        v-for="item in menuItems"
                        :key="item.title"
                        :to="item.path">
                    <v-icon left>{{ item.icon }}</v-icon>
                    {{ item.title }}
                </v-btn>
                <v-btn flat @click="__userLogout" v-if="__isUser()">
                    <v-icon left>exit_to_app</v-icon>
                    {{$lang.titles.sign_out}}
                </v-btn>
            </v-toolbar-items>
        </v-toolbar>

        <v-content>
            <v-container fluid>
                <v-layout justify-center align-center>
                    <router-view></router-view>
                </v-layout>
            </v-container>
        </v-content>

    </v-app>
</template>

<script>
    //import firebase from 'firebase'
    export default {
        data () {
            return {
                sidebar: false,
                /*                menuItems: [
                 {title: this.$lang.titles.home, path: '/home', icon: 'home'},
                 {title: this.$lang.titles.sign_up, path: '/signup', icon: 'face'},
                 {title: this.$lang.titles.sign_in, path: '/signin', icon: 'lock_open'}
                 ]*/
            }
        },
        created()
        {
        },
        computed: {
            menuItems ()
            {
                if (this.__isUser())
                {
                    return [
                        {title: this.$lang.titles.home, path: '/home', icon: 'home'}
                    ]
                }
                else
                {
                    return [
                        {title: this.$lang.titles.sign_up, path: '/signup', icon: 'face'},
                        {title: this.$lang.titles.sign_in, path: '/signin', icon: 'lock_open'}
                    ]
                }
            }
        },
        methods : {
            __userLogout () {
                this.$store.dispatch('userLogout')
            }
        }
    }
</script>

<style lang="stylus">
    @import '../node_modules/vuetify/src/stylus/main.styl';
</style>