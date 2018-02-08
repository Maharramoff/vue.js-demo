<template>
    <v-layout column>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h2>{{$lang.titles.sign_in_title}}</h2>
        </v-flex>
        <v-flex xs12 mt-5>
            <ul>
                <li>
                    {{ __getUser().displayName}}
                </li>
            </ul>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
            <form>
                <v-layout column>
                    <v-flex>
                        <v-text-field
                                name="email"
                                :label="$lang.labels.email_label"
                                id="email"
                                type="email"
                                required></v-text-field>
                    </v-flex>
                    <v-flex>
                        <v-text-field
                                name="password"
                                :label="$lang.labels.password_label"
                                id="password"
                                type="password"
                                required></v-text-field>
                    </v-flex>
                    <v-flex class="text-xs-center" mt-5>
                        <v-btn color="primary" type="submit">{{$lang.titles.btn_sign_in}}</v-btn>
                    </v-flex>
                </v-layout>
            </form>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {}
</script>