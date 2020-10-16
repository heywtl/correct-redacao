<template>
  <v-app id="app">
    <app-navigation></app-navigation>

    <v-content transition="slide-x-transition">
        <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import AppNavigation from './components/AppNavigation.vue';

export default {
    name: 'App',
    components: {
        AppNavigation
    }
};
</script>
