<template>
    <div>
        <div class="pure-menu pure-menu-horizontal">
            <ul class="pure-menu-list">                
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 0">Lihat detail</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 1">Ubah detail</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 2">Ganti Password</a></li>
                <li class="pure-menu-item"><a class="pure-menu-link" @click="selectedMenu = 3">Hapus Akun</a></li>
            </ul>
        </div>
        <form class="pure-form pure-form-stacked">
            <fieldset>                

                <div v-if="selectedMenu === 0">
                    <img src="../assets/avatar_default.png" width="70" height="70"/>
                    <p>{{ user.name }}</p>
                    <p>{{ user.email }}</p>
                </div>

                <div v-if="selectedMenu === 1">
                    <label for="email">Email</label>
                    <input id="email" type="email" placeholder="Email" v-model="email">

                    <label for="nama">Nama</label>
                    <input id="nama" type="text" placeholder="Nama" v-model="name">

                    <button class="pure-button" @click.prevent="updateAccount">Submit</button>
                </div>

                <div v-if="selectedMenu === 2">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Password" v-model="password">

                    <label for="confirm">Confirm Password</label>
                    <input id="confirm" type="password" placeholder="Confirm password" v-model="passwordConfirm">

                    <button class="pure-button" @click.prevent="changePassword">Submit</button>
                </div>

                <div v-if="selectedMenu === 3">
                    <label>Yakin hapus akun ini ?</label>
                    <button class="pure-button" @click.prevent="deleteAccount">Ya</button>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
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
            this.name =  ''
            this.email =  ''

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
        }
    }
}
</script>

<style>

</style>
