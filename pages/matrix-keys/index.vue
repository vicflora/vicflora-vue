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
          <h3><a :href="page.path">{{ page.title }}</a></h3>
          <p>{{ page.description.replace('Introduction\n', '') }}</p>
        </div>
      </div>
    </header>
  </article>
</template>

<script>
export default {
  name: 'MatrixKeys',
  async asyncData({ $content, params }) {
    const markdown = await $content('pages/multi-access-keys').fetch()
    const pages = await $content('pages')
        .where({ display: {$ne: false }, category: 'Multi-access keys' })
        .only(['title', 'description'])
        .sortBy('category').sortBy('title')
        .fetch()
    return {
      markdown,
      pages,
    }
  },
}
</script>