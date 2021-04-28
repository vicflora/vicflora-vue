<style lang="scss" scoped>
.taxon::v-deep {
  @import "./Taxon.scss";
}
</style>

<template>
  <div class="taxon">
    <b-container>
      <ApolloQuery
        :query="require('@/graphql/queries/taxonConcept-description.gql')"
        :variables="{ id, imagesPage, specimenImagesPage }"
      >
        <template v-slot="{ result: { loading, error, data } }">
          <!-- Loading -->
          <div v-if="loading" class="loading apollo">Loading...</div>

          <!-- Error -->
          <div v-else-if="error" class="error apollo">An error occurred</div>

          <!-- Result -->
          <div v-else-if="data" class="result apollo">
            <!-- Breadcrumb -->
            <b-row>
              <b-col>
                <Breadcrumb :data="data"></Breadcrumb>
              </b-col>
            </b-row>
            <!-- Name -->
            <b-row>
              <b-col class="text-left">
                <TaxonName :data="data"></TaxonName>
              </b-col>
            </b-row>
            <!-- Status -->
            <b-row class="m-row">
              <b-col class="text-left">
                <TaxonStatus :data="data"></TaxonStatus>
              </b-col>
            </b-row>
            <!-- classification -->
            <b-row
              class="m-row"
              v-if="
                data.taxonConcept.taxonTreeDefItem.rankId < rankClass.family
              "
            >
              <b-col class="text-left">
                <p class="m-status-class">Classification</p>
                <TaxonClassificationComponent></TaxonClassificationComponent>
              </b-col>
            </b-row>
            <!-- Tabs -->
            <b-row class="m-row" v-else>
              <b-col>
                <TaxonTabs :data="data" class="w-100"></TaxonTabs>
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
  </div>
</template>

<script>
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import TaxonName from "@/components/Taxon-name/Taxon-name";
import TaxonStatus from "@/components/Taxon-status/Taxon-status";
import TaxonTabs from "@/components/Taxon-tabs/Taxon-tabs";
import TaxonClassificationComponent from "@/components/Taxon-classification-component/Taxon-classification-component";

export default {
  name: "Taxon",
  components: {
    Breadcrumb,
    TaxonName,
    TaxonStatus,
    TaxonTabs,
    TaxonClassificationComponent
  },
  data() {
    return {
      id: "6abc498a-70de-11e6-a989-005056b0018f",
      tabIndex: 0,

      imagesPage: 1,
      specimenImagesPage: 1,
      specimenImagesModal: null,
      viewerOptions: {
        url: "data-src"
      },
      rankClass: {
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class: 60,
        superorder: 90,
        order: 100,
        family: 140,
        genus: 180,
        species: 220,
        subspecies: 230
      }
    };
  },
  methods: {
    getBtnText: function(name) {
      switch (name) {
        case "family":
          return "genera";
        case "genus":
          return "species";
      }
    }
  },
  computed: {
    urlId: {
      get: function() {
        return this.$route.params.id;
      },
      set: function(newVal) {
        this.$router.push({
          path: "/flora/taxon/" + newVal
        });
      }
    }
  },
  watch: {
    urlId: {
      immediate: true,
      handler: function(val) {
        this.id = val;
      }
    }
  }
};
</script>
