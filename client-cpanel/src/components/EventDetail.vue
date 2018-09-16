<template>
    <div>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nama</th>
                    <th scope="col">Email</th>
                    <th scope="col">Nomor Telfon</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(applicant, index) in applicants" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ applicant.name }}</td>
                    <td>{{ applicant.email }}</td>
                    <td>{{ applicant.phone }}</td>
                </tr>
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
        this.$store.dispatch('applicant/getApplicantsByEventId', this.$route.params.id)
        .then(() => {
            if(this.applicants[0]) {
                window.document.title = this.applicants[0].event.name
            }
        })
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
            return this.$store.state.applicant.applicantsOnEvent
        },
        ...mapGetters({
            isLoading: 'applicant/isLoading'
        })
    }
}
</script>

<style>

</style>
