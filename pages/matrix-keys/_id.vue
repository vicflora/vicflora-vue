<template>
  <b-container id="lucid-player-container">
    <div v-if="matrixKey">
      <ol class="breadcrumb" v-if="matrixKey.taxonConcepts.length">
        <li 
          v-for="item in matrixKey.taxonConcepts"
          :key="item.id"
          class="breadcrumb-item"
        >
          <nuxt-link
            :to="`/flora/taxon/${item.id}`"
            >{{ item.taxonName.fullName }}</nuxt-link
          >
        </li>
      </ol>
      <h3 class="key-title mt-1 mb-4">{{ matrixKey.title }}</h3>
      <p>
        <icon-button-link
          :to="`/pages/${$route.params.id}`"
          icon="info-circle"
          text="Description of characters"
        />
      </p>
    </div>
    <iframe :src="`/lucid-keys/${slug}`" />
  </b-container>
  
</template>

<script>
const IconButtonLink = () => import("@/components/App/AppIconButtonLink")
import matrixKeyQuery from "@/graphql/queries/matrixKeyQuery"

export default {
  name: 'MatrixKeyPage',
  components: {
    IconButtonLink,
  },
  data() {
    return {
      matrixKey: null,
    }
  },
  apollo: {
    matrixKey: {
      query: matrixKeyQuery,
      result({ data, loading }) {
        if (!loading) {
          this.matrixKey = data.matrixKey
        }
      },
      skip: true,
    },
  },
  computed:{
    slug(){
      return this.$route.params.id
    }
  },
  created() {
    this.$apollo.queries.matrixKey.setVariables({path: this.$route.path})
    this.$apollo.queries.matrixKey.skip = false
  }
}
</script>