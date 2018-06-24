<template>
    <div>
        <div class="row">
            <div class="col-6">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <h1>Register</h1>

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

                        <div class="pure-controls">
                            <button class="btn btn-primary" @click.prevent="register">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="col-6">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <h1>Log In</h1>

                        <div class="form-group">
                            <label for="email">Email Address</label>
                            <input type="email" class="form-control" placeholder="Email Address" v-model="emailLogin">
                        </div>

                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" class="form-control" placeholder="Password" v-model="passwordLogin">
                        </div>

                        <div class="pure-controls">
                            <button class="btn btn-primary" @click.prevent="login">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            userName: '',
            emailRegister: '',
            passwordRegister: '',
            emailLogin: '',
            passwordLogin: ''
        }
    },

    methods: {
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
                this.$router.push('/')
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
                this.$router.push('/')
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
          this.$router.push('/')
        })
        .catch(err => {
          localStorage.removeItem('adminToken')
          alert('Tolong log in ulang')
        })
    }
  }
}
</script>
