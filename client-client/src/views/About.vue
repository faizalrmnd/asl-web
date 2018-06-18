<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ about }}
  </div>
</template>

<script>
export default {
  about () {
    return this.$store.state.about.about
  }
}
</script>

<style>

</style>
