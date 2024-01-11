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
        const field = bits[0]
        let layer = ''
        switch (field) {
          case 'bioregion':
            layer = 'bioregion'
            break
          case 'local_government_area':
            layer = 'lga'
            break
          case 'park_or_reserve':
            layer = 'parkres'
            break
          case 'registered_aboriginal_party':
            layer = 'rap'
            break
        }
        return `${this.$route.path}/${layer}/${this.slug}`
      },
    }
  }
</script>