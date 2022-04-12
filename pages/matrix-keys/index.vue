<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>Multi-access keys</h1>
      <nuxt-content
        :document="markdown"
        class="m-content"
      />
      <div 
        v-if="pages.length"
        class="linked-pages"
      >
        <div v-for="page in pages" :key="page.path">
          <h3 v-if="page.permalink">{{ page.title }}</h3>
          <h3 v-else>{{ page.title }}</h3>
          <p>{{ page.description.replace('Introduction\n', '') }}</p>
          <p>
            <icon-button-link
              :to="page.permalink.replace('/pages/', '/matrix-keys/')"
              icon="play-btn"
              text="Lucid key player"
            />
            <icon-button-link
              :to="page.permalink"
              icon="info-circle"
              text="Character description"
            />
          </p>
        </div>
      </div>
    </header>
  </article>
</template>

<script>
const IconButtonLink = () => import("@/components/App/AppIconButtonLink")

export default {
  name: 'MatrixKeys',
  components: {
    IconButtonLink,
  },
  async asyncData({ $content, params }) {
    const markdown = await $content('pages/multi-access-keys').fetch()
    const pages = await $content('pages')
        .where({ display: {$ne: false }, category: 'Multi-access keys' })
        .only(['title', 'description', 'permalink'])
        .sortBy('category').sortBy('title')
        .fetch()
    return {
      markdown,
      pages,
    }
  },
  computed: {
    subpages() {
      return this.pages.map((page) => {
        page.href = page.path
        
      })
    }
  },
}
</script>

