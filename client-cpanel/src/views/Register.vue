<template>
    <div class="container col-md-4 card register-form">
        <div class="row">
            <div class="col-md-12" v-if="selectedMenu == 1">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <div class="brand-logo">
                            <img src="../assets/img/logo.png" alt="">
                        </div>
                        <h1 class="text-center">Register</h1>
                        <br>
                        <div class="form-group">
                            <label for="name">Username</label>
                            <input type="text" class="form-control" placeholder="Username" v-model="userName">
                        </div>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address" v-model="emailRegister">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="passwordRegister">
                        </div>
                        <br>
                        <div class="pure-controls">
                            <button class="btn btn-primary" @click.prevent="register">
                                <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                                Register
                            </button>
                        </div>
                        <br>
                        <p>
                            <small>
                                <a @click="selectedMenu = 0">Klik di sini</a> jika sudah memiliki akun
                            </small>
                        </p>
                    </fieldset>
                </form>
            </div>
            <div class="col-md-12" v-if="selectedMenu == 0">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <div class="brand-logo">
                            <img src="../assets/img/logo.png" alt="">
                        </div>
                        <h1 class="text-center">Log In</h1>
                        <br>
                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address" v-model="emailLogin">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="passwordLogin">
                        </div>
                        <br>
                        <div class="pure-controls">
                            <button class="btn btn-primary" @click.prevent="login">
                                <img class="icon" src="../assets/img/submit-icon.svg" alt="">
                                Log in
                            </button>
                        </div>
                        <br>
                        <p>
                            <small>
                                <a @click="selectedMenu = 1">Klik di sini</a> untuk register jika belum memiliki akun
                            </small>
                        </p>
                    </fieldset>
                </form>
            </div>
        </div>
        <div v-if="isLoading" class="loading-state register-page">
            <img src="../assets/img/loading-icon.svg" alt="">
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data () {
        return {
            userName: '',
            emailRegister: '',
            passwordRegister: '',
            emailLogin: '',
            passwordLogin: '',
            selectedMenu: 0
        }
    },

    methods: {
        registerPage () {
            this.selectedMenu = 1
        },
        register () {
            let user = {
                name: this.userName,
                email: this.emailRegister,
                password: this.passwordRegister
            }

            this.userName =  ''
            this.emailRegister =  ''
            this.passwordRegister =  ''

            this.$store.dispatch('admin/register', user)
            .then(() => {
                this.$router.push('/admin')
            })
            .catch(err => {
                alert('Terjadi kesalahan')
            })
        },

        login () {
            let user = {
                email: this.emailLogin,
                password: this.passwordLogin
            }

            this.emailLogin =  ''
            this.passwordLogin =  ''

            this.$store.dispatch('admin/login', user)
            .then(() => {
                this.$router.push('/admin')
            })
            .catch(err => {
                alert('Terjadi kesalahan')
            })
        }
    },

    beforeCreate () {
        // Buat verify token, ini token buatan kita atau orang lain
        // kalau buatan kita, nanti simpan data user di store
        if (localStorage.getItem('adminToken')) {
            this.$store.dispatch('admin/verifyToken')
            .then(res => {
            this.$router.push('/admin')
            })
            .catch(err => {
            localStorage.removeItem('adminToken')
            alert('Tolong log in ulang')
            })
        }
    },

    computed: {
        ...mapGetters({
            isLoading: 'admin/isLoading'
        })
    }
}
</script>
