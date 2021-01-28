<template>
     <div class="card-body bg-transparent mb-3" >
        <h5 class="card-title">{{item.title}}</h5>
        <p class="card-text">{{item.description}}</p>
        <p class="card-text"> <small class="text-muted"> From: {{item.User.fullname}}</p>
        <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="patch(item.id, panahKiri)"><</button>
        <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="getEdit(item.id)">Edit</button>
        <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="destroy(item.id)">Delete</button>
        <button type="button" class="btn btn-outline-dark btn-sm" @click.prevent="patch(item.id, panahKanan)">></button>
        
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: ['item'],
    methods:{
        patch(item, str){
            this.$emit('patch', item, str)
        },
        getEdit(item){
            //console.log(item)
            this.$emit('getEdit', item)
        },
        destroy(item){
            this.$emit('destroy', item)
        }
    },
    computed:{
        panahKanan(){
            if(this.item.category === 'done'){
                return 'backlog'
            }else if(this.item.category === 'todo'){
                return 'doing'
            }else if(this.item.category === 'doing'){
                return 'done'
            }else if(this.item.category === 'backlog'){
                return 'todo'
            }
        },
        panahKiri(){
            if(this.item.category === 'done'){
                return 'doing'
            }else if(this.item.category === 'todo'){
                return 'backlog'
            }else if(this.item.category === 'doing'){
                return 'todo'
            }else if(this.item.category === 'backlog'){
                return 'done'
            }
        }
    }
}
</script>

<style>

</style>