<template>
    <v-layout column class="text-xs-center">
        <v-flex xs12 mt-5>
            <h2>{{$lang.titles.welcome_title}}</h2>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
            <blockquote>
                {{$lang.titles.made_with}}
            </blockquote>
        </v-flex>
        <v-flex mt-5>
            <v-btn flat color="primary" to="/signup">{{$lang.titles.sign_up}}</v-btn>
            <v-btn flat to="/signin">{{$lang.titles.sign_in}}</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                //foo: bar
            }
        }
    }
</script>
