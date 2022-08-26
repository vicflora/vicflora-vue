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
        <b-row>
          <b-card-group 
            v-for="page in pages"
            :key="page.path"
            class="col-md-6 col-lg-4"
          >
            <b-card
              :title="page.title"
              :img-src="page.image"
              img-alt="Card image"
              img-top
              class="card-matrix-key"
            >
              <p>{{ page.description.replace('Introduction\n', '') }}</p>
              <p>
                <icon-button-link
                  :to="page.permalink.replace('/pages/', '/flora/matrix-keys/')"
                  icon="play-btn"
                  text="Lucid key player"
                />
              </p>
              <p>
                <icon-button-link
                  :to="page.permalink"
                  icon="info-circle"
                  text="Character description"
                />
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
  async asyncData({ $content, params }) {
    const markdown = await $content('pages/multi-access-keys').fetch()
    const pages = await $content('pages')
        .where({ display: {$ne: false }, category: 'Multi-access keys' })
        .only(['title', 'description', 'permalink', 'image'])
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

<style lang="scss">
.card.card-matrix-key {
  margin-bottom: 30px;
}
</style>

