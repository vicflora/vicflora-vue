<template>
  <div class="col" v-if="definition">
    <h3 class="m-name mb-3">{{ definition.name }}</h3>
    <div v-html="definition.definition"></div>

    <GlossaryTermRelationships 
      v-if="definition.relationships.length"
      :relationships="definition.relationships"
    />

    <!-- images -->
    <GlossaryTermImages 
      v-if="definition.images.length"
      :images="definition.images"
    />

    <GlossaryTermUse
      v-if="termName"
      :key="termName"
      :term="termName"
    />
  </div>
</template>

<script>
import GlossaryTermImages from "@/components/Glossary/GlossaryTermImages"
import GlossaryTermRelationships from "@/components/Glossary/GlossaryTermRelationships"
import GlossaryTermUse from "@/components/Glossary/GlossaryTermUse"
import glossaryTermQuery from "@/graphql/queries/glossaryTermByNameQuery"


export default {
  name: "GlossaryTerm",
  components: {
    GlossaryTermRelationships,
    GlossaryTermImages,
    GlossaryTermUse,
  },
  data() {
    return {
      termName: 'abaxial',
      definition: false,
      term: null,
    }
  },
  apollo: {
    term: {
      query: glossaryTermQuery,
      variables() {
        return {
          name: this.termName,
        }
      },
      result({ data, loading }) {
        this.definition = data.term[0]
      },
      skip: true,
    }
  },
  watch: {
    '$route.query.name': {
      immediate: true,
      deep: true,
      handler(name) {
        if (name && name.length > 1) {
          this.termName = name
        }
      }
    }
  },
  created() {
    this.$apollo.queries.term.skip = false
  },
}
</script>