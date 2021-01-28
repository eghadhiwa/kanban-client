<template>
    <div class="container-nav" >
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent"  >
            <div class="container-fluid">
              <a class="navbar-brand" href="#">KANBAN</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div class="navbar-nav">
                  
                  <a class="nav-link" href="#" v-if="halaman == 'login'" v-on:click.prevent="gantiHalaman('register')">Register</a>
                  <a class="nav-link" href="#" v-else-if="halaman == 'register'" v-on:click.prevent="gantiHalaman('login')">Login</a>
                  <a class="nav-link" href="#" v-else-if="halaman == 'isi'" v-on:click.prevent="logout()">Logout</a>
                  <a class="nav-link" href="#" v-if="halaman == 'isi'" v-on:click.prevent="gantiHalaman('add')">Add</a>
                  <a class="nav-link" href="#" v-else-if="halaman == 'add'||halaman == 'edit'" v-on:click.prevent="gantiHalaman('isi')">List</a>
                  
                </div>
              </div>
            </div>
          </nav>
    </div>

</template>

<script>
export default {
    name: 'NavBar',
    props: ['halaman'],
    methods:{
        gantiHalaman(page){
            this.$emit('gantiHalaman', page)
        },
        logout(){
            this.$emit('logout')
        }
    }
}
</script>

<style>

</style>