<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>Static pages</h1>
    </header>
    <div v-for="(category, index) in pagesByCategory" :key="index">
      <div v-if="category.pages.length">
        <h2>{{ category.category }}</h2>
        <ul>
          <li v-for="page in category.pages" :key="page.href">
            <nuxt-link v-if="page.permalink" :to="page.permalink">{{ page.title }}</nuxt-link>
            <span v-else>{{ page.title }}</span>
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
        'Multi-access keys',
        'Bioregions',
        'Miscellaneous'
      ],
    }
  },
  async asyncData({ $content, params }) {
    const pages = await $content('pages')
        .where({ display: {$ne: false } })
        .only(['title', 'category', 'permalink'])
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