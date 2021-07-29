<template>
    <v-row justify="center">
        <v-dialog persistent max-width="400px" v-model="dialog">
            <template v-slot:activator= "{ on, attrs}">
                <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon>mdi-clipboard-edit</v-icon>
                </v-btn>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Edit Todo</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-text-field label="Title" required v-model="editedTitle"></v-text-field>
                        </v-row>
                        <v-row>
                            <v-textarea label="Description" required v-model="editedDescription"></v-textarea>
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
            editedTitle: this.todo.title,
            editedDescription: this.todo.description,
            todoId: this.todo.id
        }
    },
    methods: {
        onSaveChanges() {
            if(this.editedDescription.trim() === '' || this.editedTitle.trim() === '') {
                return;
            } else {
                this.$store.dispatch('editTodoData', {editedDescription: this.editedDescription, editedTitle: this.editedTitle, todoId: this.todoId});
                this.dialog = false;
            }
        }
    }
});
</script>
