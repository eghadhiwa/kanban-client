<template>
    <div class="container-form-register" >
        <form class="form-regist">
            <div class="mb-3">
                <p style="color: red;" > {{errorRegist}}</p>
              <label for="exampleInputEmail1" class="form-label">Email address</label>
              <input type="email" class="form-control" id="email-regis" v-model="regist.email" aria-describedby="emailHelp">
              <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">Password</label>
              <input type="password" class="form-control" v-model="regist.password" id="password-regis">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Full Name</label>
                <input type="text" class="form-control" v-model="regist.fullname" id="fullname-regis">
            </div>
            <button type="submit" class="btn btn-primary" @click.prevent=" register()">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'RegisterForm',
    data(){
        return{
            regist:{
                email: '',
                password: '',
                fullname: ''
            }
        }
    },
    props: ['errorRegist'],
    methods:{
        register(){
            this.$emit('register', this.regist)
        }
    }
}
</script>

<style>

</style>