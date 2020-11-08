<template>
  <v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                prepend-icon="mdi-face"
                name="email"
                label="Email"
                type="email"
                v-model.lazy="email"
                :rules="emailRules"
                required
              >
              </v-text-field>
              <v-text-field
                prepend-icon="mdi-lock"
                name="password"
                label="Password"
                type="password"
                required
                v-model.lazy="password"
                :rules="passwordRules"
              >
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <!-- <v-btn 
              @click="googleLogin"
              class="mx-2"
              dark
              small
              color="red">
              <b>GOOGLE</b></v-btn
            > -->
            <!-- <v-btn 
                @click="facebookLogin"
                class="mx-2"
                dark
                small
                color="blue">
                <b>FACEBOOK</b></v-btn
            > -->
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :disabled="!valid"
              @click="submit"
              data-cy="joinSubmitBtn"
              >Entrar</v-btn
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
    name: 'Join',
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
            loading: {
                signInButton: false,
            }
        };
    },
    methods: {
        ...mapActions([
            'signInUser',
            'googleSignIn'
        ]),
        submit() {
            this.loading.signInButton = true
            let payload = {
                email: this.email,
                password: this.password
            }
            this.signInUser(payload).then(() => {
                this.$router.push({ name: 'Home' })
            })
        },
        googleLogin() {
            this.loading.signInButton = true
            this.googleSignIn()
        }
    }
};
</script>

<style scoped></style>
