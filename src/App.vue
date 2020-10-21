<template>
  <v-app id="app">
    <v-main transition="slide-x-transition">
      <v-toolbar dark dense
        color="primary">
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

        <v-toolbar-title>
          <v-btn
            color="blue darken-3"
            :to="{ name: 'Home' }">
            <b>CORRECT</b></v-btn>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <v-menu left bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon
              v-bind="attrs"
              v-on="on">
              <v-icon>mdi-face</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="option.route"
              v-for="(option, index) in menuOptions"
              :key="'option ' + index">
              <v-list-item-title>
                <v-icon>{{ option.icon }}</v-icon> {{ option.name }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item v-if="isAuthorized"
              v-on:click="logout">
              <v-list-item-title>
                <v-icon>mdi-exit-to-app</v-icon> Sair
              </v-list-item-title>
            </v-list-item>
          </v-list>    
        </v-menu>
      </v-toolbar>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { mapGetters, mapActions } from 'vuex'

export default {
    name: 'App',
    components: {},
    computed: {
      ...mapGetters([
        'isAuthorized'
      ]),
      menuOptions() {
        if (!this.isAuthorized)
          return [
            { route: 'Login', icon: 'mdi-login', name: 'Login'},
            { route: 'Cadastro', icon: 'mdi-account-plus', name: 'Cadastro'},
            ]
        else
          return [
            { route: 'Perfil', icon: 'mdi-face-profile', name: 'Perfil'},
            { route: 'Submeter', icon: 'mdi-send', name: 'Submeter'},
            ]
      }
    },
    methods: {
      ...mapActions([
        'signUserOut'
      ]),
      logout() {
        this.signUserOut()
      }
    }
};
</script>
