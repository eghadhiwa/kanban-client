<template>
    <div class="container-form-add" >
        <form class="form-add">
            <p style="color: red;" > {{errAdd}}</p>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">Title</label>
              <input type="text" class="form-control" v-model="inputTodo.title" id="title" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Description</label>
              <input type="text" class="form-control" v-model="inputTodo.description" id="description">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Category</label>
                <select class="form-select" aria-label="Default select example" v-model="inputTodo.category" id="category">
                    <option selected>Open this select menu</option>
                    <option value="backlog">backlog</option>
                    <option value="todo">todo</option>
                    <option value="doing">doing</option>
                    <option value="done">done</option>
                  </select>
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent=" addTodo()">Add</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'AddForm',
    data(){
        return {
            inputTodo:{
                title: '',
                description: '',
                category: ''
            }
        }
    },
    props: ['errAdd'],
    methods:{
        addTodo(){
            this.$emit('addTodo', this.inputTodo)
        }
    }
}
</script>

<style>

</style>