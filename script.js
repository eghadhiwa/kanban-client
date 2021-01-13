const app = new Vue({
    el: '#app',
    data:{
        halaman: 'login',
        user:{
            email: '',
            password: ''
        },
        tasks: [],
        regist:{
            email: '',
            password: '',
            fullname: ''
        },
        edit:{
            id: 0,
            title: '',
            description: '',
            category: ''
        },
        inputTodo:{
            title: '',
            description: '',
            category: ''
        },
        server: 'http://localhost:3000'
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
        },
        register(){
            axios({
                method: 'POST',
                url: `${this.server}/register`,
                data:{
                    email: this.regist.email,
                    password: this.regist.password,
                    fullname: this.regist.fullname
                }
            })
            .then(response =>{
                console.log(response.data)
                this.gantiHalaman('login');
            })
            .catch(err =>{
                console.log(err)
            })
        },

        login(){
            axios({
                method: 'post',
                url: `${this.server}/login`,
                data:{
                    email: this.user.email,
                    password: this.user.password
                }
            })
            .then(response =>{
                console.log(response.data)
                localStorage.setItem('access_token', response.data.access_token)
                this.gantiHalaman('isi')
                this.auth()
                this.user.email = ''
                this.user.password = ''
            })
            .catch(err =>{
                console.log(err)
            })
        },
        logout(){
            localStorage.clear()
            this.auth()
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
        addTodo(){
            axios({
                method: 'POST',
                url: `${this.server}/tasks`,
                data:{
                    title: this.inputTodo.title,
                    description: this.inputTodo.description,
                    category: this.inputTodo.category
                },
                headers:{
                    access_token: localStorage.access_token
                }
            })
            .then(response =>{
                this.gantiHalaman('isi')
                this.fetchAllTodo()
                this.inputTodo.title = ''
                this.inputTodo.description = ''
                this.inputTodo.category = ''
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
                console.log(err)
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
                console.log(err)
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
})