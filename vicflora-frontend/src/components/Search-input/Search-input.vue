<style lang="scss" scoped>
.m-search-input::v-deep {
  @import "./Search-input.scss";
}
</style>

<template>
  <ApolloQuery
      :query="require('../../graphql/queries/nameTypeAhead.gql')"
      :variables="{ q }"
    >
      <template v-slot="{ result: { loading, error, data } }">
        <!-- Loading -->
        <div v-if="loading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="result apollo m-search-input">
          <div>
            <b-input-group>

              <b-form-input v-model="q" list="search-list-id" size="sm" placeholder="Enter taxon name..." @change="submit"></b-form-input>
              <b-form-datalist v-if="q.length > 3" id="search-list-id" :options="data.nameTypeAhead"></b-form-datalist>
              <b-input-group-append>
                        <b-button size="sm" @click="submit">
                          <b-icon font-scale="1" icon="search" />
                        </b-button>
              </b-input-group-append>

              
            </b-input-group>
            
          </div>
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :(</div>
      </template>
    </ApolloQuery>
</template>

<script>
export default {
  name:"SearchInput",
  components:{
  },
  data(){
    return{
      q:"",
    }
  },
  methods:{
    submit:function(){
       this.$router.push({
            query: {
                q:`*${this.q}*`,
            }
        });
    },
    
  },
  watch:{
    '$route'() {
      this.q = this.$route.query.q.replace(/[*]/g,"");
    }
    
  },
  mounted(){
    this.q = this.$route.query.q.replace(/[*]/g,"");
  },
}
</script>