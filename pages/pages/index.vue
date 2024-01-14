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
  name: "StaticPages",
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
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
  data() {
    return {
      categories: [
        'About',
        'Multi-access keys',
        'Bioregions',
        'Miscellaneous'
      ],
      pageTitle: 'VicFlora: Static pages',
      structuredData: {
        "@context": "http://schema.org",
        "@type": "WebPage",
        headline: 'VicFlora: Static pages',
        description: "Index of static pages in VicFlora",
        datePublished: "2022-07-28",
        dateModified:"2022-07-28",
        publisher: {
          "@type": "Organization",
          name: "Royal Botanic Gardens Victoria",
          url: "https://www.rbg.vic.gov.au"
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: [ "botany", "flora", "Australia", "Victoria" ]
      }
    }
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