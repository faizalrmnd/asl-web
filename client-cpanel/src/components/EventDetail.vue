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
    </div>
</template>

<script>
export default {
    created () {
        this.$store.dispatch('applicant/getApplicant', this.$route.params.id)
        .catch(msg => {
            alert(msg)
        })
    },

    computed: {
        applicants () {
            return this.$store.state.applicant.applicants
        }
    }
}
</script>

<style>

</style>
