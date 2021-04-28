<style lang="scss" scoped>
.m-search-input::v-deep {
  @import "./Search-input.scss";
}
</style>

<template>
          <div class=".m-search-input">
            <VueTypeaheadBootstrap
              class="mb-4"
              size="sm"
              v-model="query"
              :data="[query,...nameTypeAhead]"
              :serializer="item => item"
              placeholder="Enter taxon name..."
              @input="searchWords"
              @keyup.enter="search"
              :maxMatches=100
            >
              <template slot="append">
                <b-button size="sm">
                  <b-icon font-scale="1" icon="search"  @click="search"/>
                </b-button>
              </template>
            </VueTypeaheadBootstrap>        
          </div>
</template>

<script>
import VueTypeaheadBootstrap from 'vue-typeahead-bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import {debounce} from 'lodash';

import gql from 'graphql-tag';
var nameTypeAheadGql=gql`query nameTypeAhead($q: String!){
  nameTypeAhead(q:$q)
}`;

export default {
    components:{
      VueTypeaheadBootstrap
    },
    data(){
      return {
        nameTypeAhead:[],
        query: '',
        userRepositories: {},
        users: []

      }
    },

    methods: {
      search:function () {
       this.$router.push({
            query: {
                q:`*${this.query}*`.replace(/ /g, ' AND '),
            }
        });
      },
      searchWords: debounce(function(){
          this.$apollo.addSmartQuery('nameTypeAhead', {
              query:nameTypeAheadGql,
              variables: {
                  q: `${this.query}`
              },
              result ({data}) {
                return data
              },
              error (error) {
                    console.error('We\'ve got an error!', error)
              }
          })
      },1000),
    },
    watch:{
      '$route':{
        immediate:true,
        handler:function(){
          this.query = this.$route.query.q.replace(/[*]/g,"").replace(/ AND /g, ' ')
        }       
      }  
    },
  }
</script>