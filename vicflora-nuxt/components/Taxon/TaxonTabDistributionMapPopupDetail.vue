<template>
  <ApolloQuery
    :query="
      require('@/graphql/queries/taxonConceptOccurrencesAtPointQuery.gql')
    "
    :variables="{ taxonConceptId, latitude, longitude }"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <!-- Loading -->
      <div v-if="loading" class="loading apollo">Loading...</div>

      <!-- Error -->
      <div v-else-if="error" class="error apollo">An error occurred</div>

      <!-- Result -->
      <div v-else-if="data" class="result apollo">
        <div
          v-if="data.taxonOccurrencesAtPoint.data.length === 0"
          class="m-popup"
        >
          {{ "No information here!" }}
        </div>
        <div v-else class="m-popup">
          <div>
            <h5><b>{{data.taxonOccurrencesAtPoint.data[page].properties.scientificName}}</b></h5>
            <p><b>Catalog Number: </b>{{data.taxonOccurrencesAtPoint.data[page].properties.catalogNumber}}</p>
            <p><b>Occurrence Status: </b>{{data.taxonOccurrencesAtPoint.data[page].properties.occurrenceStatus}}</p>
            <p><b>Establishment Means: </b>{{data.taxonOccurrencesAtPoint.data[page].properties.establishmentMeans}}</p>
          </div>
          <div class="m-btn-group"> 
            <b-icon icon="arrow-left-circle" aria-hidden="true" @click="goPrev" class="m-btn" v-show="page!==0"></b-icon>
            <div v-if="page===0"></div>
            <b-icon icon="arrow-right-circle" aria-hidden="true" @click="goNxt" class="m-btn" v-show="page!==data.taxonOccurrencesAtPoint.data.length-1"></b-icon>
          </div>
        </div>
      </div>
      <!-- No result -->
      <div v-else class="no-result apollo">
        <div class="spinner-border mt-5 mb-1" role="status"></div>
        <h5>Loading...</h5>
      </div>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: "PopupDetail",
  props: {
    taxonConceptId: {
      type: String,
      required: true
    },
    layer: {
      type: String
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  data(){
    return {
      page:0,
    }
  },
  methods:{
    goPrev:function(){
      this.page -= 1
    },
    goNxt:function(){
      this.page += 1
    },
  }
};
</script>

<style lang="scss" scoped>
.m-popup {
  min-width: 100px;
  font-size: medium;
  p {
    margin: 0;
  }
  .m-btn-group{
    padding-top: 10px;
    display: flex;
    justify-content: space-between;
    .m-btn {
      display:inline-block;
      cursor:pointer;
    }
  }
}
</style>
