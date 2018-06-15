<template>
    <div>
        <div class="pure-g">
            <div class="pure-u-1-2">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <h1>Register</h1>

                        <div class="pure-control-group">
                            <label for="name">Username</label>
                            <input type="text" placeholder="Username" v-model="userName">
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-control-group">
                            <label for="email">Email Address</label>
                            <input type="email" placeholder="Email Address" v-model="emailRegister">
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-control-group">
                            <label for="password">Password</label>
                            <input type="password" placeholder="Password" v-model="passwordRegister">
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-controls">
                            <button class="pure-button pure-button-primary" @click.prevent="register">Submit</button>
                        </div>
                    </fieldset>
                </form>
            </div>
            <div class="pure-u-1-2">
                <form class="pure-form pure-form-aligned">
                    <fieldset>
                        <h1>Log In</h1>

                        <div class="pure-control-group">
                            <label for="email">Email Address</label>
                            <input type="email" placeholder="Email Address" v-model="emailLogin">
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-control-group">
                            <label for="password">Password</label>
                            <input type="password" placeholder="Password" v-model="passwordLogin">
                            <span class="pure-form-message-inline">This is a required field.</span>
                        </div>

                        <div class="pure-controls">
                            <button class="pure-button pure-button-primary" @click.prevent="login">Submit</button>
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

            this.$store.dispatch('register', user)
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

            this.$store.dispatch('login', user)
            .then(() => {
                this.$router.push('/')
            })
            .catch(err => {
                alert('Terjadi kesalahan')
            })
        }
    },

    beforeCreate () {
    if (localStorage.getItem('adminToken')) {
        this.$store.dispatch('verifyToken')
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
