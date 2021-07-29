<template>
    <div>
        <v-toolbar dense class="blue-grey lighten-5 flex-grow-0">
        <v-app-bar-nav-icon @click.native.stop="sideNav = !sideNav" class="d-flex d-sm-none"></v-app-bar-nav-icon>
        <v-toolbar-title>
          <router-link to="/" tag="span" style="cursor: pointer;">Vue ToDo App</router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        

        <v-btn color="primary" class="ma-2 pt-2 d-none d-sm-block" depressed v-for="item of menuItems" :key="item.title" router :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
        
      </v-toolbar>
      <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="item of menuItems" :key="item.title" router :to="item.link">
            <v-btn color="primary" elevation="2" class="ma-2">
            <v-icon left>{{item.icon}}</v-icon>
              {{item.title}}
            </v-btn>
          </v-list-item>

        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    </div>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      menuItems: [
        { icon: 'mdi-clipboard-plus', title: 'Add Todos', link: '/addTodo'},
        { icon: 'mdi-clipboard-check', title: 'View Todos', link: '/'}
      ]
    }
  }
};
</script>