<template>
    <v-container fill-height>
        <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
                <v-card class="elevation-12">
                    <v-toolbar dark color="primary">
                        <v-toolbar-title>Cadastro</v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-form ref="form" v-model="valid">
                            <v-text-field
                                prepend-icon="mdi-face"
                                name="email"
                                label="Email"
                                type="email"
                                v-model.lazy="email"
                                :rules="emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="password"
                                label="Senha"
                                type="password"
                                v-model.lazy="password"
                                :rules="passwordRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                prepend-icon="mdi-lock"
                                name="confirmPassword"
                                label="Confirme sua senha"
                                type="password"
                                :rules="confirmPasswordRules"
                                required
                            ></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            :disabled="!valid"
                            @click="submit"
                            data-cy="signinSubmitBtn"
                            >Enviar</v-btn
                        >
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Signin',
    data() {
        return {
            valid: false,
            email: '',
            password: '',
            emailRules: [
                v => !!v || 'Esse campo é obrigatório',
                v => /.+@.+/.test(v) || 'Este E-mail não é válido'
            ],
            passwordRules: [
                v => !!v || 'Esse campo é obrigatório',
                v => v.length >= 6 || 'Senhas devem ter mais de 6 caractéres'
            ],
            confirmPasswordRules: [
                v => !!v || 'Você precisa conferir a senha',
                v => this.password == v || 'As senhas não conferem'
            ]
        };
    },
    methods: {
        ...mapActions([
            'signUpUser'
        ]),
        submit() {
            let payload = {
                email: this.email,
                password: this.password
            }
            this.signUpUser(payload).then(() => {
                this.$router.push({ name: 'Home' })
            })
        }
    }
};
</script>

<style scoped></style>
