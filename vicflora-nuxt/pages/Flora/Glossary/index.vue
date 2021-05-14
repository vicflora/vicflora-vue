<style lang="scss" scoped>
@import "./Glossary.scss";
</style>

<template>
  <b-container class="m-search">
    <ApolloQuery
      :query="require('@/graphql/queries/glossary.gql')"
      :variables="{ name }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo">
          <b-row>
            <b-col class="text-left">
              <div class="m-main-title">
                <h2>
                  Glossary
                </h2>
              </div>
            </b-col>
          </b-row>
          <b-row>
            <b-col sm="3" class="text-left">
              <div class="m-border-right">
                <div class="m-letters-container" >
                  <b-link
                    :to="`/flora/glossary?letter=${item}`"    
                    v-for="item in data.glossaryTermFirstLetters"
                    :key="item"
                    ><span class="m-letter" :class="letter === item?'m-active-letter':''">{{ item }}</span></b-link
                  >
                </div>
                <div class="m-names-list">
                  <li v-for="item in data.glossaryTermsByName" :key="item.id">
                    <b-icon icon="caret-right-fill" variant="dark"></b-icon>
                    <nuxt-link :to="`/flora/glossary?letter=${letter}&name=${item.name}`" :style="taxonName===item.name?'font-weight: bolder;':''">{{
                      item.name
                    }}</nuxt-link>
                  </li>
                </div>
              </div>
            </b-col>
            <b-col class="text-left">
                <GlossaryDefinition :definition="taxonName?data.glossaryTermsByName.filter((ele => ele.name === taxonName))[0]:data.glossaryTermsByName[0]"></GlossaryDefinition>
            </b-col>
          </b-row>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">
          <div class="spinner-border mt-5 mb-1" role="status"></div>
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </b-container>
</template>

<script>
import GlossaryDefinition from "@/components/Glossary-definition/Glossary-definition"
export default {
  name: "Glossary",
  components:{
      GlossaryDefinition
  },
  data() {
    return {
        name: "A",
        content:{},

    };
  },
  computed: {
    letter: function() {
      return this.$route.query.letter;
    },
    taxonName: function() {
      return this.$route.query.name;
    },
  },
  watch:{
      letter:{
        immediate: true,
        handler: function() {
            this.name = this.letter;
        }
      },


  }
};
</script>
