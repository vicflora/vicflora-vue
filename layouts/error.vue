<template>
  <div>
    <h2 v-if="error.statusCode == 404">404 error</h2>
    <h2 v-else>500 server error</h2>
    <nuxt-link to="/">HOME</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>
