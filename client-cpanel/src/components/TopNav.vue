<template>
    <nav class="top-navbar no-padding" :class="{'col-md-12': !sidebarOpened, 'col-md-10 offset-md-2': sidebarOpened}">
        <ul class="">
            <li>
                <div class="burger-icon" @click="setSidebar">
                    <div class="burger-line first"></div>
                    <div class="burger-line second"></div>
                    <div class="burger-line third"></div>
                </div>
            </li>
            <li><a href=""><img class="nav-logo" src="../assets/img/logo.png" alt=""></a></li>
        </ul>
    </nav>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            sidebarOpened: 'sidenav/sidebarOpened'
        })
    },
    methods: {
        setSidebar () {
            this.$store.dispatch('sidenav/changeSidebarOpened', !this.sidebarOpened)
        }
    }
}
</script>


