import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import EditTodo from './components/Todos/EditTodos/EditTodo.vue'
import EditTodoDueDate from './components/Todos/EditTodos/EditTodoDueDate.vue'
import EditTodoDueTime from './components/Todos/EditTodos/EditTodoDueTime.vue'
import Toolbar from './components/Toolbar/Toolbar.vue'

Vue.config.productionTip = false
Vue.component('app-edit-todo', EditTodo);
Vue.component('app-edit-due-date', EditTodoDueDate);
Vue.component('app-edit-due-time', EditTodoDueTime);
Vue.component('app-toolbar', Toolbar);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('loadTodos')
  }
}).$mount('#app')