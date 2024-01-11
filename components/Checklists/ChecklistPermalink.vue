<template>
  <p>
    <nuxt-link :to="permalink">{{ `${appUrl}${permalink}` }}</nuxt-link>
  </p>
</template>

<script>
  export default {
    name: 'ChecklistPermalink',
    props: {
      q: {
        type: String,
        required: true
      },
      slug: {
        type: String,
        required: true
      }
    },
    computed: {
      appUrl() {
        return process.env.appUrl
      },
      permalink() {
        let bits = this.q.split(':')
        let layer = bits[0].replace(/_/g, '-')
        return `${this.$route.path}/${layer}/${this.slug}`
      },
    }
  }
</script>