<template>
    <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h3>{{$lang.titles.sign_up_title}}</h3>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
            <v-form ref="form" @submit.prevent="userSignUp">
                <v-layout column>
                    <v-flex>
                        <v-text-field
                                name="name"
                                :label="$lang.labels.name_label"
                                id="name"
                                type="txt"
                                v-model="name"
                                :error-messages="nameErrors"
                                :counter="10"
                                @input="$v.name.$touch()"
                                @blur="$v.name.$touch()"
                                required>
                        </v-text-field>
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
                    <v-flex>
                        <v-text-field
                                name="repassword"
                                :label="$lang.labels.repassword_label"
                                id="repassword"
                                type="password"
                                v-model="repassword"
                                :error-messages="repasswordErrors"
                                @input="$v.repassword.$touch()"
                                @blur="$v.repassword.$touch()">
                        </v-text-field>
                    </v-flex>
                    <v-flex class="text-xs-center" mt-5>
                        <v-btn color="primary" @click="submit">{{$lang.titles.btn_sign_up}}</v-btn>
                        <v-btn @click="clear">{{$lang.titles.btn_clear}}</v-btn>
                    </v-flex>
                </v-layout>
            </v-form>
        </v-flex>
    </v-layout>
</template>

<script>
    import {validationMixin} from 'vuelidate'
    import {required, maxLength, minLength, sameAs, email} from 'vuelidate/lib/validators'

    export default {
        mixins     : [validationMixin],
        validations: {
            name      : {required, minLength: minLength(3), maxLength: maxLength(10)},
            email     : {required, email},
            password  : {required, minLength: minLength(6), maxLength: maxLength(12)},
            repassword: {sameAsPassword: sameAs('password')},
        },
        data () {
            return {
                name      : '',
                email     : '',
                password  : '',
                repassword: '',
            }
        },
        methods    : {
            userSignUp () {
                if (this.comparePasswords !== true)
                {
                    return
                }
                this.$store.dispatch('userSignUp', {email: this.email, password: this.password})
            },
            submit () {
                this.$v.$touch()
            },
            clear () {
                this.$v.$reset()
                this.name       = ''
                this.email      = ''
                this.password   = ''
                this.repassword = ''
            }
        },
        computed   : {
            nameErrors () {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push(this.$lang.msg.name_maxlen_error)
                !this.$v.name.minLength && errors.push(this.$lang.msg.name_minlen_error)
                !this.$v.name.required && errors.push(this.$lang.msg.name_is_empty)
                return errors
            },
            emailErrors () {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push(this.$lang.msg.valid_email_error)
                !this.$v.email.required && errors.push(this.$lang.msg.empty_email_error)
                return errors
            },
            passwordErrors () {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.maxLength && errors.push(this.$lang.msg.password_maxlen_error)
                !this.$v.password.minLength && errors.push(this.$lang.msg.password_minlen_error)
                !this.$v.password.required && errors.push(this.$lang.msg.empty_password_error)
                return errors
            },
            repasswordErrors () {
                const errors = []
                !this.$v.repassword.sameAsPassword && errors.push(this.$lang.msg.passwords_dont_match_error)
                return errors
            }
        }
    }
</script>