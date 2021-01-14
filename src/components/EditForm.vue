<template>
    <div class="container-form-add"  >
      <form class="form-add" >
        <p style="color: red;" > {{errEdit}}</p>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Title</label>
            <input type="text" class="form-control"  id="title-edit" v-model="edit.title" aria-describedby="emailHelp">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Description</label>
            <input type="text" class="form-control" v-model="edit.description" id="description-edit">
          </div>
          <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Category</label>
              <select class="form-select" aria-label="Default select example" v-model="edit.category" id="category-edit">
                  <option selected>Open this select menu</option>
                  <option value="backlog">backlog</option>
                  <option value="todo">todo</option>
                  <option value="doing">doing</option>
                  <option value="done">done</option>
                </select>
          </div>
          <button type="submit" class="btn btn-primary" @click="update(edit.id)" >Edit</button>
      </form>
    </div>
</template>

<script>
export default {
    name: 'EditForm',
    props: ['edit', 'errEdit'],
    methods:{
        update(id){
            this.$emit('update', id)
        }
    }

}
</script>

<style>

</style>