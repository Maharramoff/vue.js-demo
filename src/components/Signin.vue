<template>
    <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h2>{{$lang.titles.sign_in_title}}</h2>
        </v-flex>
        <v-flex flex xs12 sm10 lg6 offset-xs0 offset-sm1 offset-lg3 mt-3 mt-3>
            <form @submit.prevent="userSignIn">
                <v-layout column>
                    <v-flex>
                        <v-alert error dismissible v-model="alert">
                            {{ error }}
                        </v-alert>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                                name="email"
                                :label="$lang.labels.email_label"
                                id="email"
                                type="email"
                                v-model="email"
                                required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                                name="password"
                                :label="$lang.labels.password_label"
                                id="password"
                                type="password"
                                v-model="password"
                                required></v-text-field>
                    </v-flex>
                    <v-flex class="text-xs-center" mt-5>
                        <v-btn
                                color="primary"
                                type="submit"
                                @click.native="loader = 'loading2'"
                                :loading="loading"
                                :disabled="loading"
                        >{{$lang.titles.btn_sign_in}}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </form>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data () {
            return {
                email   : '',
                password: '',
                alert   : false,
                lang    : this.$lang.msg,
                loader  : null,
                loading2: false,
            }
        },
        computed: {
            error () {
                return this.$store.getters.getError
            },
            loading () {
                return this.$store.getters.getLoading
            }
        },
        watch   : {
            error (value) {
                if (value)
                {
                    this.alert = true
                }
            },
            alert (value) {
                if (!value)
                {
                    //this.$store.dispatch('setError', false)
                    this.loader = null
                }
            }
        },
        methods : {
            userSignIn () {

                this.$store.commit('setLoading', true)

                setTimeout(() => (
                        this.$store.dispatch('userSignIn', {
                            email   : this.email,
                            password: this.password,
                            lang    : this.lang
                        })
                ), 3000)
            }
        }
    }
</script>