<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>Multi-access keys</h1>
      <nuxt-content :document="markdown" class="m-content" />
      <div v-if="pages_vascular.length" class="linked-pages">
        <a id="vascular-plants"></a>
        <h2>Vascular plants</h2>
        <b-row>
          <b-card-group v-for="page in pages_vascular" :key="page.path" class="col-md-6 col-lg-4">
            <b-card :title="page.title" title-tag="h2" :img-src="page.image" img-alt="" img-top class="card-matrix-key">
              <p>{{ page.description.replace('Introduction\n', '') }}</p>
              <p>
                <icon-button-link :to="page.permalink.replace('/pages/', '/flora/matrix-keys/')" icon="play-btn"
                  text="Lucid key player" />
              </p>
              <p>
                <icon-button-link :to="page.permalink" icon="info-circle" text="Character description" />
              </p>
            </b-card>
          </b-card-group>
        </b-row>
      </div>
      <div v-if="pages_bryophytes.length" class="linked-pages">
        <a id="bryophytes"></a>
        <h2>Bryophytes</h2>
        <b-row>
          <b-card-group v-for="page in pages_bryophytes" :key="page.path" class="col-md-6 col-lg-4">
            <b-card :title="page.title" title-tag="h2" :img-src="page.image" img-alt="" img-top class="card-matrix-key">
              <p>{{ page.description.replace('Introduction\n', '') }}</p>
              <p>
                <icon-button-link :to="page.permalink.replace('/pages/', '/flora/matrix-keys/')" icon="play-btn"
                  text="Lucid key player" />
              </p>
              <p>
                <icon-button-link :to="page.permalink" icon="info-circle" text="Character description" />
              </p>
            </b-card>
          </b-card-group>
        </b-row>
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
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
    }
  },
  async asyncData({ $content, params }) {
    const markdown = await $content('pages/multi-access-keys').fetch()
    const pages_vascular = await $content('pages')
      .where({ display: { $ne: false }, category: 'Multi-access keys vascular plants' })
      .only(['title', 'description', 'permalink', 'image'])
      .sortBy('category').sortBy('title')
      .fetch()

    const pages_bryophytes = await $content('pages')
      .where({ display: { $ne: false }, category: 'Multi-access keys bryophytes' })
      .only(['title', 'description', 'permalink', 'image'])
      .sortBy('category').sortBy('title')
      .fetch()

    const pageTitle = `VicFlora: ${markdown.title}`

    const structuredData = {
      "@context": "http://schema.org",
      "@type": "WebPage",
      headline: pageTitle,
      description: markdown.description,
      publisher: {
        "@type": "Organization",
        name: "Royal Botanic Gardens Victoria",
        url: "https://www.rbg.vic.gov.au"
      },
      license: "https://creativecommons.org/licenses/by/4.0/",
      keywords: [
        "botany",
        "flora",
        "Australia",
        "Victoria",
        "identification",
        "multi-access",
        "key"
      ]
    }

    if ('datePublished' in markdown) {
      structuredData.datePublished = markdown.datePublished
    }

    if ('dateModified' in markdown) {
      structuredData.dateModified = markdown.dateModified
    }

    return {
      pageTitle,
      structuredData,
      markdown,
      pages_vascular,
      pages_bryophytes,
    }
  },
  data() {
    return {
      pageTitle: null,
      structuredData: null,
    }
  },
}
</script>

<style lang="scss">
.card.card-matrix-key {
  margin-bottom: 30px;
}

.card-title {
  font-size: 1.5rem;
}
</style>

