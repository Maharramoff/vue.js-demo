<template>
    <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h2>{{$lang.titles.sign_in_title}}</h2>
        </v-flex>
        <v-flex flex xs12 sm10 lg6 offset-xs0 offset-sm1 offset-lg3 mt-3>
            <v-form ref="form" @submit.prevent="userSignIn">
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
                                :error-messages="emailErrors"
                                @input="$v.email.$touch()"
                                @blur="$v.email.$touch()"
                                required>
                        </v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                                name="password"
                                :label="$lang.labels.password_label"
                                id="password"
                                type="password"
                                v-model="password"
                                :error-messages="passwordErrors"
                                @input="$v.password.$touch()"
                                @blur="$v.password.$touch()"
                                required>
                        </v-text-field>
                    </v-flex>
                    <v-flex class="text-xs-center" mt-5>
                        <v-btn
                                color="primary"
                                @click="submit"
                                @click.native="loader = 'loading2'"
                                :loading="loading"
                                :disabled="loading"
                        >{{$lang.titles.btn_sign_in}}
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, email} from 'vuelidate/lib/validators'
    export default {
        mixins     : [validationMixin],
        validations: {
            email   : {required, email},
            password: {required}
        },
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
        computed   : {
            error () {
                return this.$store.getters.getError
            },
            loading () {
                return this.$store.getters.getLoading
            },
            emailErrors()
            {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push(this.$lang.msg.valid_email_error)
                !this.$v.email.required && errors.push(this.$lang.msg.empty_email_error)
                return errors
            },
            passwordErrors()
            {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.required && errors.push(this.$lang.msg.empty_password_error)
                return errors
            }
        },
        watch      : {
            error (value)
            {
                this.alert = value || false
            },
            alert (value) {
                if (!value)
                {
                    this.loader = null
                }
            }
        },
        methods    : {
            submit () {

                this.$v.$touch()

                if (!this.$v.$error)
                {

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
    }
</script>