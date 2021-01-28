<template>
    <div class="container-content" >
        <div class="row content">
            <!--backlog-->
          <p style="color: red;" > {{errAuth}}</p>
            <div class="col-sm-3 Backlog" style="width: 23%; ">
              <div class="card bg-secondary mb-3 ">
                <div class="card-body ">
                  <h5 class="card-title">Backlog</h5>
                  <div class="card kanban-todo" style="width: 100%; ">
                   <Card
                   v-for="(item, id) in backlog" :key="id"
                   :item="item"
                   @patch="patch"
                   @getEdit="getEdit"
                   @destroy="destroy">
                   </Card>
                  </div><br>
                </div>
              </div>
            </div>
            <!--Todo-->
            <div class="col-sm-3 todo" style="width: 23%; ">
              <div class="card bg-warning mb-3 ">
                <div class="card-body kanban-doing">
                  <h5 class="card-title">ToDo</h5>
                  <div class="card kanban-todo" style="width: 100%;">
                    <Card
                   v-for="(item, id) in todo" :key="id"
                   :item="item"
                   @patch="patch"
                   @getEdit="getEdit"
                   @destroy="destroy">
                   </Card>
                  </div><br>
                </div>
              </div>
            </div>
            <!--doing-->
            <div class="col-sm-3 doing" style="width: 23%; ">
                <div class="card bg-danger mb-3">
                  <div class="card-body">
                    <h5 class="card-title">Doing</h5>
                    <div class="card kanban-todo" style="width: 100%;">
                    <Card
                    v-for="(item, id) in doing" :key="id"
                    :item="item"
                    @patch="patch"
                    @getEdit="getEdit"
                    @destroy="destroy">
                    </Card>
                    </div><br>
                  </div>
                </div>
            </div>
            <!--Done-->
            <div class="col-sm-3 done" style="width: 23%; ">
                <div class="card bg-success mb-3">
                  <div class="card-body">
                    <h5 class="card-title">Done</h5>
                    <div class="card kanban-todo" style="width: 100%;">
                    <Card
                    v-for="(item, id) in done" :key="id"
                    :item="item"
                    @patch="patch"
                    @getEdit="getEdit"
                    @destroy="destroy">
                    </Card>
                    </div><br>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Card from './Card'

export default {
    name: 'Home',
    props: ['backlog', 'todo', 'doing', 'done', 'errAuth'],
    components:{
        Card
    },
    methods:{
        patch(item, str){
            this.$emit('patch', item, str)
        },
        getEdit(item){
            console.log(item)
            this.$emit('getEdit', item)
        },
        destroy(item){
          this.$emit('destroy', item)
        }
    }
}
</script>

<style>

</style>