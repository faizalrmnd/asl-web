<template>
  <div>
    <div class="route-header">
      <h1 class="title animated slideInDown">Articles</h1>
    </div>
    <articleList/>
  </div>
</template>

<script>
import articleList from '@/components/articleList.vue'

export default {
  components: {
    articleList
  }
}
</script>

<style>

</style>
