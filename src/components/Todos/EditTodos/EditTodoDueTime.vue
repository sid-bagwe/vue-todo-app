<template>
    <v-row justify="center">
        <v-dialog persistent max-width="400px" v-model="dialog">
            <template v-slot:activator= "{ on, attrs}">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-clipboard-clock</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Edit Todo Due Time</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-time-picker v-model="editedTime"></v-time-picker>
                        </v-row>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="deep-orange darken-2" text @click="dialog = false">Close</v-btn>
                    <v-btn color="deep-orange darken-2" text @click="onSaveChanges">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>

<script>
export default ({
    props: ['todo'],
    data() {
        return {
            dialog: false,
            editedTime: null,
            todoId: this.todo.id
        }
    },
    methods: {
        onSaveChanges() {
            if (this.editedTime) {
                const date = new Date(this.todo.date);
                if(typeof this.editedTime == 'string') {
                    const hours = this.editedTime.match(/^(\d+)/)[1]
                    const minutes = this.editedTime.match(/:(\d+)/)[1]
                    date.setHours(hours)
                    date.setMinutes(minutes)
                } else {
                    date.setHours(this.editedTime.getHours());
                    date.setMinutes(this.editedTime.getMinutes());
                }
                this.$store.dispatch('editTodoData', {todoDueDate: date.toString(), todoId: this.todo.id});
                this.dialog = false;
            }
        }
    }
});
</script>
