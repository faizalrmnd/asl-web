<template>
    <div class="col-md-2 navbar-side">
        <ul class="list-group sidebar-nav-group">
            <li class="list-group-item brand-logo heading">
                <img src="../assets/img/logo.png" alt="">
                <h2 class="heading-text">Admin Panel</h2>
            </li>
            <router-link to="/admin"  tag="li" class="list-group-item">
                <img src="../assets/img/admin-icon.svg" alt="">
                <a><span @click="hideNav">Admin</span></a>
            </router-link>
            <router-link to="/about"  tag="li" class="list-group-item">
                <img src="../assets/img/about-icon.svg" alt="">
                <a><span @click="hideNav">About</span></a>
            </router-link>
            <router-link to="/artikel"  tag="li" class="list-group-item">
                <img src="../assets/img/article-icon.svg" alt="">
                <a><span @click="hideNav">Artikel</span></a>
            </router-link>
            <router-link to="/testimoni"  tag="li" class="list-group-item">
                <img src="../assets/img/testimoni-icon.svg" alt="">
                <a><span @click="hideNav">Testimoni</span></a>
            </router-link>
            <router-link to="/service"  tag="li" class="list-group-item">
                <img src="../assets/img/service-icon.svg" alt="">
                <a><span @click="hideNav">Service</span></a>
            </router-link>
            <router-link to="/merchandise"  tag="li" class="list-group-item">
                <img src="../assets/img/merch-icon.svg" alt="">
                <a><span @click="hideNav">Merchandise</span></a>
            </router-link>
            <router-link to="/event"  tag="li" class="list-group-item">
                <img src="../assets/img/events-icon.svg" alt="">
                <a><span @click="hideNav">Events</span></a>
            </router-link>
            <router-link to="/enquiry"  tag="li" class="list-group-item">
                <img src="../assets/img/enquiry-icon.svg" alt="">
                <a><span @click="hideNav">Enquiry</span></a>
            </router-link>
            <br>
            <hr>
            <li class="list-group-item" @click="logOut">
                <img src="../assets/img/logout-icon.svg" alt="">
                <a><span @click="hideNav">Log Out</span></a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    methods: {
        logOut () {
            localStorage.removeItem('adminToken')
            this.$store.commit('admin/changeLoggedInStatus')
            this.$router.push('/register')
        },
        hideNav () {
          if (this.$mq == 'mobile') {
              this.$store.dispatch('sidenav/changeSidebarOpened', false)
          }
        }
    }
}
</script>

