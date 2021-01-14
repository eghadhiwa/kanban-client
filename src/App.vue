<template>
    <div>
    <NavBar
    v-if="halaman == 'login' || halaman == 'register'|| halaman == 'isi'||halaman == 'add'||halaman == 'edit'" 
    @gantiHalaman="gantiHalaman"
    @logout="logout"
    :halaman="halaman">
    </NavBar>

    <LoginForm
    v-if="halaman == 'login'"
    @login="login"
    @auth="auth"
    :error="error"
    @success="onSignInSuccess"
    @error="onSignInError">
    </LoginForm>


    <RegisterForm
    v-if="halaman == 'register'"
    @register="register"
    :errorRegist="errorRegist">
    </RegisterForm>

    <Home
    v-if="halaman == 'isi'"
    :backlog="backlog"
    :todo="todo"
    :doing="doing"
    :done="done"
    @patch="patch"
    @getEdit="getEdit"
    @destroy="destroy"
    :errAuth="errAuth">
    </Home>

    <EditForm
    v-if="halaman == 'edit'"
    :edit="edit"
    @update="update"
    :errEdit="errEdit">
    </EditForm>

    <AddForm
    v-if="halaman == 'add'"
    @addTodo="addTodo"
    :errAdd="errAdd">
    </AddForm>

    </div>
</template>

<script>
import axios from 'axios'
import NavBar from './components/NavBar'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import EditForm from './components/EditForm'
import AddForm from './components/AddForm'


export default {
    name: 'App',
    data(){
        return {
            halaman: 'login',
            server: 'http://localhost:3000',
            tasks: [],
            edit:{
                id: 0,
                title: '',
                description: '',
                category: ''
            },
            
            error : '',
            errorRegist: '',
            errAuth: '',
            errEdit: '',
            errAdd: ''
        }
    },
    components:{
        NavBar,
        LoginForm,
        RegisterForm,
        Home,
        EditForm,
        AddForm
        
    },
    methods:{
        auth(){
            if(localStorage.access_token){
                this.gantiHalaman('isi')
                this.fetchAllTodo()
            }else {

                this.gantiHalaman('login')
            }
        },
        gantiHalaman(page){
            this.halaman = page
            this.errAuth = ''
            this.errEdit = ''
            this.errAdd = ''
            this.error = ''
            this.errorRegist = ''
        },
        logout(){
            localStorage.clear()
            let auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function () {
                console.log('User signed out.');
            });
            this.auth()
        },
        login(user){
            axios({
                method: 'post',
                url: `${this.server}/login`,
                data:{
                    email: user.email,
                    password: user.password
                }
            })
            .then(response =>{
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access_token)
                this.gantiHalaman('isi')
                this.auth()
            })
            .catch(err =>{
                console.log(err.response)
                this.error = err.response.data.message
            })
        },
        register(regist){
            axios({
                method: 'POST',
                url: `${this.server}/register`,
                data:{
                    email: regist.email,
                    password: regist.password,
                    fullname: regist.fullname
                }
            })
            .then(response =>{
                console.log(response.data)
                this.gantiHalaman('login');
            })
            .catch(err =>{
                console.log(err.response.data)
                let msg = err.response.data
                let temp = []
                for(let i = 0; i < msg.length; i++){
                    if(msg.length >1){
                        temp.push(msg[i])
                        let str = temp.join(', ')
                        this.errorRegist = str
                    }else if(msg.length <= 1){
                        this.errorRegist = msg[i]
                    }
                }
            })
        },
         fetchAllTodo(){
            axios({
                method: 'GET',
                url: `${this.server}/tasks`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                console.log(response.data)
                this.tasks = response.data
            })
            .catch(err =>{
                console.log(err)
            })
        },
        addTodo(inputTodo){
            axios({
                method: 'POST',
                url: `${this.server}/tasks`,
                data:{
                    title: inputTodo.title,
                    description: inputTodo.description,
                    category: inputTodo.category
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.gantiHalaman('isi')
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err.response.data)
                let msg = err.response.data
                let temp = []
                for(let i = 0; i < msg.length; i++){
                    if(msg.length >1){
                        temp.push(msg[i])
                        let str = temp.join(', ')
                        this.errAdd = str
                    }else if(msg.length <= 1){
                        this.errAdd = msg[i]
                    }
                }
            })
        },
        patch(id, value){
            axios({
                method: 'PATCH',
                url: `${this.server}/tasks/${id}`,
                data:{
                    category: value
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getEdit(id){
            axios({
                method: 'GET',
                url: `${this.server}/tasks/${id}`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                console.log(response.data)
                this.edit.id = response.data.id
                this.edit.title = response.data.title,
                this.edit.description = response.data.description,
                this.edit.category = response.data.category
                
                this.gantiHalaman('edit')
            })
            .catch(err =>{
                console.log(err.response.data)
                this.errAuth = err.response.data.message
            })
        },
        update(id){
            axios({
                method: 'PUT',
                url: `${this.server}/tasks/${id}`,
                data: {
                    title: this.edit.title,
                    description: this.edit.description,
                    category: this.edit.category
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
                this.auth()
            })
            .catch(err =>{
                let msg = err.response.data
                let temp = []
                for(let i = 0; i < msg.length; i++){
                    if(msg.length >1){
                        temp.push(msg[i])
                        let str = temp.join(', ')
                        this.errEdit = str
                    }else if(msg.length <= 1){
                        this.errEdit = msg[i]
                    }
                }
            })
        },
        destroy(id){
            axios({
                method: 'DELETE',
                url: `${this.server}/tasks/${id}`,
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.fetchAllTodo()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        onSignInSuccess (googleUser) {
            const profile = googleUser.getBasicProfile()
            let id_token = googleUser.getAuthResponse().id_token
            
            //console.log(id_token)
            
            axios({
                method:'POST',
                url: `${this.server}/googleLogin`,
                data:{
                    id_token
                }
            })
            .then(response =>{
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access_token)
                this.gantiHalaman('isi')
                this.auth()
            })
            .catch(err =>{
                console.log(err)
            })
        },
        onSignInError (error) {
            console.log('OH NOES', error)
        }
    },
    created(){
        this.auth()
    },
    computed: {
        backlog(){
            return this.tasks.filter(el=> el.category == 'backlog')
        },
        todo(){
            return this.tasks.filter(el=> el.category == 'todo')
        },
        doing(){
            return this.tasks.filter(el=> el.category == 'doing')
        },
        done(){
            return this.tasks.filter(el=> el.category == 'done')
        }
    }
}
</script>

<style>

</style>