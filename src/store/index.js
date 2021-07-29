import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/fb.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loadedTodos: [],
    enableLoader: false
  },
  mutations: {
    setLoader(state, payload) {
      state.enableLoader = payload;
    },
    setLoadedTodos(state, payload) {
      state.loadedTodos = payload;
    },
    createTodo(state, payload) {
      state.loadedTodos.push(payload)
    },
    changeTodoStatus(state, payload) {
      state.loadedTodos.forEach(todo => {
        if(todo.id == payload.id) {
          todo.status = payload.status;
        }
      });
    },
    deleteTodo(state, payload) {
      const index = state.loadedTodos.findIndex((todo)=> {
        return todo.id == payload.id;
      });
      state.loadedTodos.splice(index, 1);
    },
    updateTodo(state, payload) {
      state.loadedTodos.forEach(todo => {
        if(todo.id == payload.todoId) {
          if(payload.editedTitle) {
            todo.title = payload.editedTitle;
          } 
          if(payload.editedDescription) {
            todo.description = payload.editedDescription;
          }
          if(payload.todoDueDate) {
            todo.date = payload.todoDueDate;
          }
        }
      });
    }

  },
  actions: {
    loadTodos({commit}) {
      commit('setLoader', true);
      const todos = [];
      db.collection('Todos').get().then(docs => {
        docs.forEach(doc => {
          console.log(doc.id);
          todos.push({
                title: doc.data().title,
                description: doc.data().description,
                date: doc.data().date,
                status: doc.data().status,
                id: doc.id
          });
        });
        commit('setLoadedTodos', todos);
        commit('setLoader', false);
      }).catch(err => {
        console.log(err);
      })
    },
    createTodo({commit}, payload) {
      commit('setLoader', true);
      const todo = {
        title: payload.title,
        description: payload.description,
        date: payload.date,
        status: 'Not Started'
      }
      // Add the toddo to firebase
      db.collection('Todos').add(todo).then(data => {
        console.log(data);
        const id = data.id;
        commit('createTodo', {
          ...todo,
          id: id
        });
        commit('setLoader', false);
      }).catch(error => {
        console.log(error);
      });
    }, 
    changeTodoStatus({commit}, payload) {
      commit('setLoader', true);
      db.collection('Todos').doc(payload.id).update({
        status: payload.status
      }).then(data => {
        console.log(data);
        commit('changeTodoStatus', payload);
        commit('setLoader', false);
      })
    },
    deleteTodo({commit}, payload) {
      db.collection('Todos').doc(payload.id).delete().then(data => {
        console.log(data);
        commit('deleteTodo', payload);
      }).catch(err => {
        console.log(err);
      })
    },
    editTodoData({commit}, payload) {
      commit('setLoader', true);
      const updateJson = {};
      if(payload.editedTitle) {
        updateJson.title = payload.editedTitle;
      } 
      if(payload.editedDescription) {
        updateJson.description = payload.editedDescription;
      }
      if(payload.todoDueDate) {
        updateJson.date = payload.todoDueDate;
      }
      db.collection('Todos').doc(payload.todoId).update(updateJson).then(data => {
        console.log(data);
        commit('updateTodo', payload);
        commit('setLoader', false);
      }).catch(err => {
        console.log(err);
      })
    }
  },
  getters: {
    loadedTodos (state) {
      return state.loadedTodos.sort((todoA, todoB) => {
        return todoA.date > todoB.date;
      })
    },
    enableLoading(state) {
      return state.enableLoader;
    }
  }
})
