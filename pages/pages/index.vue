<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>Static pages</h1>
    </header>
    <div v-for="category in pagesByCategory" :key="category">
      <div v-if="category.pages.length">
        <h2>{{ category.category }}</h2>
        <ul>
          <li v-for="page in category.pages" :key="page.path">
            <nuxt-link :to="page.path">{{ page.title }}</nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  data() {
    return {
      categories: [
        'About',
        'Bioregions',
        'Multi-access keys',
      ],
    }
  },
  async asyncData({ $content, params }) {
    const pages = await $content('pages')
        .where({ display: {$ne: false } })
        .only(['title', 'category'])
        .sortBy('category').sortBy('title')
        .fetch()
    return { pages }
  },
  computed: {
    pagesByCategory() {
      const pagesByCategory = [];
      this.categories.forEach((element) => {
        const category = {}
        category.category = element
        category.pages = this.pages.filter((page) => {
          if (page.category === element) {
            return page
          }
        })
        pagesByCategory.push(category)
      })
      return pagesByCategory
    }
  }
}
</script>