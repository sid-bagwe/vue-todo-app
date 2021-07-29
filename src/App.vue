<template>
  <v-app>
    <template>
      <app-toolbar></app-toolbar>
    </template>
      <main>
        <router-view></router-view>
      </main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
};
</script>
