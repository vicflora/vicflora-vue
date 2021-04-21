<style lang="scss" scoped>
@import "./Facets-collapse-modal.scss";
</style>
<template>
  <div>
    <b-modal
      v-model="showModal"
      size="lg"
      :title="facetNameList[facetData.fieldName]"
      id="facetModal"
    >
      <b-form-checkbox-group v-model="modalSelected">
        <div class="m-table" 
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="false"
            infinite-scroll-distance="50"
              >
          <table class="table table-striped table-hover">
            <thead style="width:99%">
              <tr>
                <th scope="col">
                  <b-row>
                    <b-col class="mr-auto" cols="auto">
                      <p style="display:inline-block;" class="mb-0">
                        Value
                      </p>
                    </b-col>
                    <b-col cols="auto">
                      <div>
                        <b-button
                          size="sm"
                          :disabled="order === 'value'"
                          variant="secondary"
                          @click="sortByValue()"
                          ><b-icon font-scale="1" icon="sort-alpha-down"
                        /></b-button>
                      </div>
                    </b-col>
                  </b-row>
                </th>
                <th scope="col">
                  <b-row>
                    <b-col class="mr-auto" cols="auto">
                      <p style="display:inline-block;" class="mb-0">
                        Count
                      </p>
                    </b-col>
                    <b-col cols="auto">
                      <div>
                        <b-button
                          size="sm"
                          :disabled="order === 'count'"
                          variant="secondary"
                          @click="sortByCount()"
                          ><b-icon font-scale="1" icon="sort-down"
                        /></b-button>
                      </div>
                    </b-col>
                  </b-row>
                </th>
              </tr>
            </thead>

            <tbody>
                <tr v-for="facet in facetData.facets" :key="facet.value">
                  <td>
                    <b-form-checkbox
                      style="display:inline-block;"
                      :value="facet.fq.split(':')[1]"
                      :label="facet.value"
                    >
                    </b-form-checkbox>

                    <span class="m-facet-value">{{ facet.value }}</span>
                  </td>
                  <td>
                    <span style="font-size: small;">{{ facet.count }}</span>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </b-form-checkbox-group>
      <template #modal-footer>
        <b-button @click="includeSelected()">
          Include selected
        </b-button>
        <b-button @click="excludeSelected()">
          Exclude selected
        </b-button>
        <b-button
          variant="primary"
          class="float-right"
          @click="showModal = false"
        >
          Close
        </b-button>
      </template>
    </b-modal>
  </div>
</template>
<script>
export default {
  name: "FacetsCollapseModal",
  props: ["moreFacet", "facetName", "data"],
  data() {
    return {
      // infinite scroll
      count: 0,
      scrollData: [],
      busy: false,

      facetData: this.data,
      showModal: this.moreFacet,
      order: "count",
      // status of facet modal
      modalSelected: [],
      facetNameList: {
        nameType: "Type of name",
        taxonomicStatus: "Taxonomic status",
        taxonRank: "Taxon rank",
        occurrenceStatus: "Occurrence status",
        establishmentMeans: "Establishment means",
        threatStatus: "Threat status",
        class: "Class",
        subclass: "Subclass",
        superorder: "Superorder",
        order: "Order",
        family: "Family",
        ibra7Subregion: "Subregion",
        nrmRegion: "Bioregion",
        media: "Media",
      },
    };
  },
  methods: {
    loadMore: function() {
      this.busy = true
      setTimeout(() => {
        for (var i = 0, j = 10; i < j; i++) {
          this.data.push({name: this.count++ })
        }
        console.log(this.scrollData)
        this.busy = false
      }, 1000)
    },
    // sort the array by value name of facet
    sortByValue: function() {
      this.facetData.facets = this.facetData.facets.slice().sort((a, b) => {
        let fa = a.value.toLowerCase(),
          fb = b.value.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
      });
      this.order = "value";
    },
    // sort the array by count of facet
    sortByCount: function() {
      this.facetData.facets = this.facetData.facets.slice().sort((a, b) => {
        let fa = a.count,
          fb = b.count;
        if (fa < fb) {
          return 1;
        }
        if (fa > fb) {
          return -1;
        }
        return 0;
      });
      this.order = "count";
    },
    includeSelected: function() {
      let newfq = `${this.facetData.facets[0].fq.split(":")[0]}:(`;
      for (let index in this.modalSelected) {
        if (index == 0) {
          newfq = `${newfq}${this.modalSelected[index]} `;
        } else {
          newfq = `${newfq} OR ${this.modalSelected[index]} `;
        }
      }
      newfq = newfq + ")";
      this.$router.push({
        path: "/flora/search",
        query: {
          ...this.$route.query,
          fq: Array.from(new Set([...this.fq, newfq])),
        },
      });
      this.$bvModal.hide("facetModal");
    },
    excludeSelected: function() {
      let newfq = `-${this.facetData.facets[0].fq.split(":")[0]}:(`;
      for (let index in this.modalSelected) {
        if (index == 0) {
          newfq = `${newfq}${this.modalSelected[index]} `;
        } else {
          newfq = `${newfq} OR ${this.modalSelected[index]} `;
        }
      }
      newfq = newfq + ")";
      this.$router.push({
        path: "/flora/search",
        query: {
          ...this.$route.query,
          fq: Array.from(new Set([...this.fq, newfq])),
        },
      });
      this.$bvModal.hide("facetModal");
    },
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
    },
  },
  watch: {
    showModal: function(newVal) {
      this.$emit("changeModal", newVal);
    },
  },
};
</script>
