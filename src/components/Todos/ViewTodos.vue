<template>
  <v-container class="mt-4">
    <v-layout row v-if="enableLoading" class="mt-5">
        <v-flex>
            <v-row justify="center">
                <v-progress-circular indeterminate color="red"></v-progress-circular>
            </v-row>
        </v-flex>
    </v-layout>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-card outlined class="mb-2 mx-3" :color="getColor(todo.status)" v-for="todo in todos" :key="todo.id">
            <v-list-item three-line>
            <v-list-item-content>
                <div class="text-overline mb-4">
                ID: {{todo.id}}
                </div>
                <v-list-item-title class="text-h6 mb-2">
                {{todo.title}}
                </v-list-item-title>
                <v-list-item-subtitle class="mb-1 deep-orange--text text-darken-4 font-weight-bold">
                Due {{todo.date}}
                </v-list-item-subtitle>
                <v-list-item-subtitle>{{todo.description}}</v-list-item-subtitle>
                <!-- <v-list-item-title class="mt-2 text-subtitle-1"><span class="blue--text text--darken-4 font-weight-bold">Status: </span>{{todo.status}}</v-list-item-title> -->
            </v-list-item-content>
            <div class="mr-8">
                <template>
                    <app-edit-todo :todo="todo"></app-edit-todo>
                </template>
            </div>
            <div class="mr-8">
                <template>
                    <app-edit-due-time :todo="todo"></app-edit-due-time>
                </template>
            </div>
            <div class="mr-6">
                <template>
                    <app-edit-due-date :todo="todo"></app-edit-due-date>
                </template>
            </div>
            <div>
                <v-icon class="mr-2" style="cursor: pointer;" @click="deleteTodo(todo.id)">mdi-delete</v-icon>
            </div>
            <v-alert type="warning" v-if="showAlert.id == todo.id && showAlert.show" class="mt-3">
                    <v-spacer></v-spacer>
                    Deleting Todo <v-progress-circular indeterminate color="red"></v-progress-circular>
            </v-alert>
            <div>
                <v-menu
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon
            class="ma-2"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon class="mr-5" v-if="todo.status == 'Completed'">mdi-clipboard-check</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item>
            <v-list-item-title><v-btn @click="reOpenTodo(todo.id)">ReOpen Todo</v-btn></v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
            </div>
            
            </v-list-item>

            <v-card-actions class="col-md-3">
            <v-select label="Change Current Status" dense outlined :items="items" v-model="todo.status" :disabled="todo.status == 'Completed'" @input="changeStatus(todo.status, todo.id)" color="deep-orange"></v-select>
            </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default ({
    data() {
        return {
            items: ['Completed', 'Ongoing', 'Not Started'],
            showAlert: {id: '', show: false},
            colors: ['blue-grey lighten-4', 'amber accent-1', 'green accent-2']
        }
    },
    computed: {
        todos() {
            return this.$store.getters.loadedTodos;
        },
        enableLoading() {
            return this.$store.getters.enableLoading;
        }
    },
    methods: {
        changeStatus(status, todoId) {
            this.$store.dispatch('changeTodoStatus', {status: status, id: todoId});
        },
        deleteTodo(todoId) {
            this.showAlert.id = todoId;
            this.showAlert.show = true;
            this.$store.dispatch('deleteTodo', {id: todoId});
        },
        getColor(todoStatus) {
            if(todoStatus === 'Not Started') {
                return this.colors[0];
            } else if (todoStatus === 'Ongoing') {
                return this.colors[1];
            } else if (todoStatus === 'Completed') {
                return this.colors[2];
            }
        },
        reOpenTodo(todoId) {
            this.$store.dispatch('changeTodoStatus', {status: 'Ongoing', id: todoId});
        }
    }
});
</script>
