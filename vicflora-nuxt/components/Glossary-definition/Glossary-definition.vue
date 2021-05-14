<style lang="scss" scoped>
@import "./Glossary-definition.scss";
</style>

<template>
  <b-row>
    <b-col>
      <b-row>
        <b-col>
          <h3 class="m-name mb-3">{{ definition.name }}</h3>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <div v-html="definition.definition"></div>
        </b-col>
      </b-row>
      <!-- <b-row v-if="definition.relationships.length > 0">
        <b-col>
          <h5>Relationships</h5>
        </b-col>
        <b-row>
          <b-col>
            Is related to:
          </b-col>
          <b-col>
            Is related to:
          </b-col>
        </b-row>
      </b-row> -->
    </b-col>
    <!-- {{ definition }} -->
  </b-row>
</template>

<script>
export default {
  name: "GlossaryDefinition",
  props: ["definition"],
  data() {
    return {
      name: ""
    };
  },
  computed: {
    letter: function() {
      return this.$route.query.letter;
    },
    taxonName: function() {
      return this.$route.query.name;
    }
  },
  watch: {
    letter: {
      immediate: true,
      handler: function() {
        this.name = this.letter;
      }
    }
  }
};
</script>
