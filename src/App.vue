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
            <v-list-item :to="appBarFirstOption">
              <v-list-item-title>
                <template v-if="!isAuthorized">
                  <v-icon>mdi-login</v-icon> Login</template>
                <template v-else>
                  <v-icon>mdi-face-profile</v-icon> Perfil</template>
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="appBarSecondOption">
              <v-list-item-title>
                <template v-if="!isAuthorized">
                  <v-icon>mdi-account-plus</v-icon> Cadastro</template>
                <template v-else>
                  <v-icon>mdi-send</v-icon> Submeter</template>
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
import {mapGetters} from 'vuex'

export default {
    name: 'App',
    components: {},
    computed: {
      ...mapGetters([
        'isAuthorized'
      ]),
      appBarFirstOption() {
        if (!this.isAuthorized)
          return { name:'Login' }
        else
          return { name:'Perfil' }
      },
      appBarSecondOption() {
        if (!this.isAuthorized)
          return { name:'Cadastro' }
        else
          return { name:'Submeter' }
      }
    }
};
</script>
