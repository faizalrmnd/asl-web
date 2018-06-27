<template>
    <div>
        <ul class="nav content-headings">                
            <li class="nav-item content-heading" :class="{ 'active' : (selectedMenu==0) }">
                <a class="nav-link" @click="selectedMenu = 0">Lihat detail</a>
            </li>
            <li class="nav-item content-heading" :class="{ 'active' : (selectedMenu==1) }">
                <a class="nav-link" @click="selectedMenu = 1">Ubah detail</a>
            </li>
            <li class="nav-item content-heading" :class="{ 'active' : (selectedMenu==2) }">
                <a class="nav-link" @click="selectedMenu = 2">Ganti Password</a>
            </li>
            <li class="nav-item content-heading" :class="{ 'active' : (selectedMenu==3) }">
                <a class="nav-link" @click="selectedMenu = 3">Hapus Akun</a>
            </li>
        </ul>
        <form>
            <div v-if="selectedMenu === 0">
                <div class="container card admin-detail col-md-6 offset-md-3">
                    <div class="row">
                        <div class="col-md-12 text-center">
                            <img src="../assets/avatar_default.png" width="70" height="70"/>
                            <p class="admin-name">{{ user.name }}</p>
                            <p>{{ user.email }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="selectedMenu === 1" class="col-md-6 offset-md-3">
                <div class="form-group">
                    <label for="email">Email</label>
                    <input id="email" type="email" class="form-control" placeholder="Email" v-model="email">
                </div>

                <div class="form-group">
                    <label for="nama">Nama</label>
                    <input id="nama" type="text" class="form-control" placeholder="Nama" v-model="name">
                </div>

                <button class="btn btn-primary" @click.prevent="updateAccount">Submit</button>
            </div>

            <div v-if="selectedMenu === 2" class="col-md-6 offset-md-3">
                <div class="form-group">
                    <label for="password">Password</label>
                    <input id="password" type="password" class="form-control" placeholder="Password" v-model="password">
                </div>
                <div class="form-group">
                    <label for="confirm">Confirm Password</label>
                    <input id="confirm" type="password" class="form-control" placeholder="Confirm password" v-model="passwordConfirm">
                </div>

                <button class="btn btn-primary" @click.prevent="changePassword">Submit</button>
            </div>

            <div v-if="selectedMenu === 3" class="col-md-6 offset-md-3">
                <div class="form-group">
                    <label>Yakin hapus akun ini ?</label>
                </div>
                
                <button class="btn btn-danger" @click.prevent="deleteAccount">Ya</button>
            </div>
        </form>
        <div v-if="isLoading" class="loading-state">
            <img src="../assets/img/loading-icon.svg" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            selectedMenu: 0,
            name: this.$store.state.admin.user.name,
            email: this.$store.state.admin.user.email,
            password: '',
            passwordConfirm: ''
        }
    },

    methods: {
        updateAccount () {
            let payload = {
                name: this.name,
                email: this.email
            }
            // this.name =  ''
            // this.email =  ''

            this.$store.dispatch('admin/updateAccount', payload)
            .then(message => {
                alert(message)
            })
            .catch(message => {
                alert(message)
            })
        },

        changePassword () {
            if (this.password !== this.passwordConfirm) {
                alert('Password tidak sama')
            } else {
                let payload = {
                    password: this.password
                }

                this.password = ''
                this.passwordConfirm = ''

                this.$store.dispatch('admin/changePassword', payload)
                .then(message => {
                    alert(message)
                })
                .catch(message => {
                    alert(message)
                })
            }
        },

        deleteAccount () {
            this.$store.dispatch('admin/deleteAccount')
                .then(message => {
                    alert(message)
                    localStorage.removeItem('adminToken')
                    this.$router.push('register')
                })
                .catch(message => {
                    alert(message)
                })
        }
    },

    computed: {
        user () {
            return this.$store.state.admin.user
        },
        ...mapGetters({
            isLoading: 'admin/isLoading'
        })
    }
}
</script>

<style>

</style>
