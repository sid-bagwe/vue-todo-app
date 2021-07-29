<template>
  <v-container class="mt-4">
    <v-layout row wrap class="mx-3">
        <v-flex xs12 sm6 offset-sm3>
          <h2 class="primary--text">Create a New Todo</h2>
        </v-flex>
    </v-layout>
    
            <v-form ref="form" lazy-validation @submit.prevent="onAddTodo">
                <v-layout row class="mx-3">
                    <v-flex xs12 sm6 offset-sm3>
                        <v-text-field name="title" id="title" label="Title" v-model="title" required>
                        </v-text-field>

                        <v-textarea label="Description" name="description" v-model="description" id="description" multi-line required>
                        </v-textarea>
                    </v-flex>
            </v-layout>
            <v-layout class="mx-3" justify-center>
                <v-flex xs12 offset-sm3>
                    <h3>Choose Due Date and Time for Todo</h3>
                    <v-row justify="space-around" class="mt-2">
                        <v-col :key="1">
                            <v-date-picker v-model="date"></v-date-picker>
                        </v-col>
                        <v-col :key="2">
                            <v-time-picker v-model="time" format="24hr"></v-time-picker>
                        </v-col>
                    </v-row>
                </v-flex>
            </v-layout>
            <v-layout class="mx-3 my-4" justify-center>
                <v-flex xs12 sm4 offset-sm3>
                    <v-btn :disabled="!isFormValid" color="success" type="submit">
                            ADD TODO
                    </v-btn>
                </v-flex>
            </v-layout> 
        </v-form>
         
  </v-container>
</template>

<script>

export default ({
    data() {
        return {
            title: '',
            description: '',
            date: '',
            time: ''
        }
    },
    computed: {
        isFormValid() {
            return this.title !== '' && this.description !== '' && this.date && this.time;
        },
        checkDateAndTime() {
            const date = new Date(this.date);
            if(typeof this.time == 'string') {
                const hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            } else {
                date.setHours(this.time.getHours());
                date.setMinutes(this.time.getMinutes());
            }
            return date.toString();
        }
    },
    methods: {
        onAddTodo() {
            console.log('Here');
            const todoData = {
                title: this.title,
                description: this.description,
                date: this.checkDateAndTime
            }
            this.$store.dispatch('createTodo', todoData);
            this.$router.push('/');
            console.log('Done');
        }
    }
})
</script>
