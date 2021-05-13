<style lang="scss" scoped>
@import "./Download.scss";
</style>

<template>
  <!-- <b-row>
        <b-col>
            <div>DownLoad</div>
            <b-btn size="sm">Back to search result</b-btn>
        </b-col>
    </b-row> -->
  <b-container class="m-search">
    <ApolloQuery
      :query="require('@/graphql/queries/download.gql')"
      :variables="{ input }"
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
                  Download
                </h2>
              </div>
            </b-col>
          </b-row>
          <!-- query -->
          <b-row>
            <b-col class="text-left">
              <span class="m-subtitle">
                Query string
              </span>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-left"> <b>q: </b>{{ q }} </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col v-if="fq" class="text-left"> <b>fq: </b>{{ fq }} </b-col>
          </b-row>

          <!-- fields -->
          <b-row>
            <b-col class="text-left">
              <span class="m-subtitle">
                Fields
              </span>
            </b-col>
          </b-row>

          <b-row>
            <b-col sm="6" cols="12" class="text-left">
              <b-form-checkbox-group
                v-model="fieldsSelected"
                :options="fieldsOptions"
                stacked
              ></b-form-checkbox-group>
              <div class="mt-3">
                Selected: <strong>{{ fieldsSelected }}</strong>
              </div>
            </b-col>
          </b-row>
        </div>
        <div v-else class="no-result apollo">
          <div class="spinner-border mt-5 mb-1" role="status"></div>
          <h5>Loading...</h5>
        </div>
      </template>
    </ApolloQuery>
  </b-container>
</template>
<script>
export default {
  name: "Dowload",
  data() {
    return {
      input: {
        q: "**"
      },
      fieldsSelected: [
        "scientific_name",
        "scientific_name_authorship",
        "taxon_rank",
        "accepted_name_usage",
        "taxonomic_status",
        "occurrence_status",
        "establishment_means"
      ],
      fieldsOptions: [
        { item: "id", name: "id", notEnabled: true },
        "taxon_rank",
        "scientific_name",
        "scientific_name_authorship",
        "taxonomic_status",
        "family",
        "occurrence_status",
        "establishment_means",
        "accepted_name_usage_id",
        "accepted_name_usage",
        "accepted_name_usage_authorship",
        "accepted_name_usage_taxon_rank",
        "name_according_to",
        "sensu",
        "threat_status",
        "profile",
        "vernacular_name"
      ]
    };
  },
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    fq: function() {
      // more than 1 filter in fq
      if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq;
        //1 filter in fq
      } else if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq];
        // null in fq
      } else {
        return "";
      }
    }
  }
};
</script>
