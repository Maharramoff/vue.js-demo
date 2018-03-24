<template>
    <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h2>{{$lang.titles.sign_up_title}}</h2>
        </v-flex>
        <v-flex xs12 sm10 lg6 offset-xs0 offset-sm1 offset-lg3 mt-3>
            <v-form ref="form" @submit.prevent="userSignUp">
                <v-layout column>
                    <v-flex>
                        <v-alert error dismissible v-model="alert">
                            {{ error }}
                        </v-alert>
                    </v-flex>
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
                        <v-btn color="primary"
                               @click="submit"
                               @click.native="loader = 'loading2'"
                               :loading="loading"
                               :disabled="loading"
                        >
                            {{$lang.titles.btn_sign_up}}
                            <span slot="loader">{{$lang.titles.btn_loading}}</span>
                        </v-btn>
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
                alert     : false,
                lang      : this.$lang.msg,
                loader    : null,
                loading2  : false,
            }
        },
        methods    : {
            submit () {
                this.$v.$touch()

                if (!this.$v.$error)
                {
                    // No errors found. Now we can register user
                    this.$store.commit('setLoading', true)

                    setTimeout(() => (
                            this.$store.dispatch('userSignUp', {
                            email   : this.email,
                            password: this.password,
                            name    : this.name,
                            lang    : this.lang
                        })
                    ), 3000)
                }
                else
                    console.log("Cant reg!")

            },
            clear()
            {
                this.$v.$reset()
                this.name       = ''
                this.email      = ''
                this.password   = ''
                this.repassword = ''
                this.alert      = false
            }
        },
        computed   : {
            error()
            {
                return this.$store.getters.getError
            },
            loading()
            {
                return this.$store.getters.getLoading
            }
            ,
            nameErrors()
            {
                const errors = []
                if (!this.$v.name.$dirty) return errors
                !this.$v.name.maxLength && errors.push(this.$lang.msg.name_maxlen_error)
                !this.$v.name.minLength && errors.push(this.$lang.msg.name_minlen_error)
                !this.$v.name.required && errors.push(this.$lang.msg.name_is_empty)
                return errors
            }
            ,
            emailErrors()
            {
                const errors = []
                if (!this.$v.email.$dirty) return errors
                !this.$v.email.email && errors.push(this.$lang.msg.valid_email_error)
                !this.$v.email.required && errors.push(this.$lang.msg.empty_email_error)
                return errors
            }
            ,
            passwordErrors()
            {
                const errors = []
                if (!this.$v.password.$dirty) return errors
                !this.$v.password.maxLength && errors.push(this.$lang.msg.password_maxlen_error)
                !this.$v.password.minLength && errors.push(this.$lang.msg.password_minlen_error)
                !this.$v.password.required && errors.push(this.$lang.msg.empty_password_error)
                return errors
            }
            ,
            repasswordErrors()
            {
                const errors = []
                !this.$v.repassword.sameAsPassword && errors.push(this.$lang.msg.passwords_dont_match_error)
                return errors
            }
        }
        ,
        watch      : {
            error(value)
            {
                this.alert = value || false
            }
            ,
            alert(value)
            {
                if (!value)
                {
                   // this.$store.commit('setError', null)
                    this.loader = null
                }

            }
        }
    }
</script>