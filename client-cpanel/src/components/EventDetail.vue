<template>
    <div>
        <table class="table">
            <thead>
                <td>
                    <th>#</th>
                    <th>Nama</th>
                    <th>Email</th>
                    <th>Nomor Telpon</th>
                </td>
                <td v-for="(applicant, index) in applicants" :key="index">
                    <tr>{{ index }}</tr>
                    <tr>{{ applicant.name }}</tr>
                    <tr>{{ applicant.email }}</tr>
                    <tr>{{ applicant.phone }}</tr>
                </td>
            </thead>
            <tbody>

            </tbody>
        </table>
        <button class="btn btn-primary" @click="goBack">
            <img class="icon" src="../assets/img/back-icon.svg" alt="">
            Kembali
        </button> 
        <div v-if="isLoading" class="loading-state">
            <img src="../assets/img/loading-icon.svg" alt="">
        </div>     
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    created () {
        this.$store.dispatch('applicant/getApplicant', this.$route.params.id)
        .catch(msg => {
            alert(msg)
        })
    },

    methods: {
        goBack () {
            this.$router.go(-1)
        }
    },

    computed: {
        applicants () {
            return this.$store.state.applicant.applicants
        },
        ...mapGetters({
            isLoading: 'applicant/isLoading'
        })
    }
}
</script>

<style>

</style>
