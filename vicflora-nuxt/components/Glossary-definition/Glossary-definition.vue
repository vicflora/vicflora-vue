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
      <b-row v-if="definition.relationships.length > 0">
        <b-col>
          <b-row>
            <b-col>
              <h5>Relationships</h5>
            </b-col>
          </b-row>
          <b-row v-for="item in definition.relationships" :key="item.id">
            <b-col>
              <span class="m-relationship-type-name">{{item.relationshipType.name}}</span>
            </b-col>
            <b-col>
              <a :href="`?name=${item.relatedTerm.name}`">{{item.relatedTerm.name}}</a>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
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
    };
  },
  computed: {
  },
  watch: {
  }
};
</script>
