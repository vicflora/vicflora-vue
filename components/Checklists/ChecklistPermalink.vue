<template>
  <p>
    Permalink: <nuxt-link :to="permalink">{{ `${appUrl}${permalink}` }}</nuxt-link>
  </p>
</template>

<script>
  export default {
    name: 'ChecklistPermalink',
    props: {
      q: {
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
        let area = encodeURI(bits[1].replace(/^"+|"+$/g, ''))
        return `${this.$route.path}/${layer}/${area}`
      },
    }
  }
</script>