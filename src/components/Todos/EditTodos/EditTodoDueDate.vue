<template>
    <v-row justify="center">
        <v-dialog persistent max-width="400px" v-model="dialog">
            <template v-slot:activator= "{ on, attrs}">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-calendar-edit</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Edit Todo Due Date</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-date-picker width="100%" v-model="editedDate"></v-date-picker>
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
            editedDate: null,
            todoId: this.todo.id
        }
    },
    methods: {
        onSaveChanges() {
            const newDate = new Date(this.editedDate);
            this.$store.dispatch('editTodoData', {todoDueDate: newDate.toString(), todoId: this.todo.id});
            this.dialog = false;
        }
    }
});
</script>
