<style lang="scss" scoped>
@import "./Facets-collapse.scss";
</style>

<template>
  <div>
    <div>
      <b-row align-h="between">
        <b-col cols="8">
          <span
            :aria-expanded="visible ? 'true' : 'false'"
            :aria-controls="`${localFacetField.fieldName}`"
            @click="visible = !visible"
            class="m-facet-title"
          >
            {{ facetName[localFacetField.fieldName] }}
            <b-icon icon="caret-down-fill" v-if="visible"></b-icon>
            <b-icon icon="caret-right-fill" v-else></b-icon>
          </span>
        </b-col>
      </b-row>

      <b-collapse visible :id="localFacetField.fieldName" v-model="visible">
        <b-card>
          <b-form-group v-slot="{ ariaDescribedby }">
            <b-form-checkbox-group
              v-model="selected"
              :aria-describedby="ariaDescribedby"
              @change="applySelected"
            >
              <b-form-checkbox
                :value="facet.fq.split(':')[1]"
                :label="facet.value"
                v-for="facet in localFacetField.facets.slice(0, 3)"
                :key="facet.value"
                class="m-facetvalue"
              >
                <span class="m-facet-value"
                  >{{ facet.value }} ({{ facet.count }})</span
                >
              </b-form-checkbox>
            </b-form-checkbox-group>
            <div v-if="localFacetField.facets.length > 3">
              <p
                class="m-more"
                @click="
                  () => {
                    moreFacet = true;
                  }
                "
              >
                More...
              </p>
            </div>
          </b-form-group>
        </b-card>
      </b-collapse>
      <FacetsCollapseModal
        :moreFacet="moreFacet"
        :facetName="localFacetField.facets[0].fq.split(':')[0]"
        :data="facetField"
        v-if="moreFacet"
        @changeModal="
          $event => {
            moreFacet = $event;
          }
        "
      ></FacetsCollapseModal>
    </div>
  </div>
</template>

<script>
import FacetsCollapseModal from "../Facets-collapse-modal/Facets-collapse-modal";
import gql from "graphql-tag";

var SearchResultFacetFieldGql = gql`
  query facetField($input: FieldFacetInput) {
    facetField(input: $input) {
      fieldName
      facets {
        value
        count
        fq
      }
    }
  }
`;
export default {
  name: "facetsCollapse",
  props: ["facetFields", "removeFilterVal"],
  components: {
    FacetsCollapseModal,
  },
  apollo: {
    facetField() {
      return {
        query: SearchResultFacetFieldGql,
        variables: {
          input: {
            field: this.localFacetField.facets[0].fq.split(":")[0].replace("-",""),
            q: this.q,
            limit:50,
            offset:0
          },
        },
      };
    },
  },
  data() {
    return {
      facetField: {}, 
      localFacetField: this.facetFields,
      fields: [
        {
          key: "value",
          label: "Value",
          sortable: true,
        },
        {
          key: "count",
          label: "Count",
          sortable: true,
        },
      ],
      moreFacet: false,
      selected: [],
      // controller of collapse
      visible: true,
      facetName: {
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
    // when the status changed, submit this change
    applySelected: function() {
      let key = this.localFacetField.facets[0].fq.split(":")[0];
      // let value = this.localFacetField.facets[0].fq.split(':')[1]

      let facetQueryString = [];
      for (let i = 0; i < this.selected.length; i++) {
        facetQueryString.push(`${key}:${this.selected[i]}`);
      }

      // if the fq is a array - more than 1 element
      // sample: ["name_type:scientific","taxonomic_status:synonym","taxonomic_status:accepted"]
      if (typeof this.$route.query.fq === "object") {
        let newfq = this.$route.query.fq.filter(
          (item) => item.split(":")[0] !== key
        );
        this.$router.push({
          path: "/flora/search",
          query: {
            ...this.$route.query,
            fq: Array.from(new Set([...newfq, ...facetQueryString])),
          },
        });
        // if the fq is a string - only have 1 element
      } else if (typeof this.$route.query.fq === "string") {
        let newfq =
          this.$route.query.fq.split(":")[0] === key
            ? this.selected
            : [this.$route.query.fq];
        this.$router.push({
          path: "/flora/search",
          query: {
            ...this.$route.query,
            fq: Array.from(new Set([...newfq, ...facetQueryString])),
          },
        });
        // without fq query
      } else {
        this.$router.push({
          path: "/flora/search",
          query: {
            ...this.$route.query,
            fq: facetQueryString,
          },
        });
      }
    },
  },
  watch: {
    facetFields: function() {
      this.localFacetField = this.facetFields;
    },
    removeFilterVal: function() {
      let keyName = this.localFacetField.facets[0].fq.split(":")[0];
      if (this.removeFilterVal.split(":")[0] === keyName) {
        this.selected = this.selected.filter(
          (item) => item !== this.removeFilterVal.split(":")[1]
        );
        this.applySelected();
      }
    },
    selected: function() {
      this.modalSelected = this.selected;
    },
  },
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    fq: function() {
      if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq];
      } else if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq;
      } else {
        return "";
      }
    },
  },
  mounted: function() {
    // show the check status of checkbox
    // if the fq is a string - only have 1 element
    let keyName = this.localFacetField.facets[0].fq.split(":")[0];
    if (typeof this.fq === "object") {
      for (let i of this.fq) {
        if (i.split(":")[0] === keyName) {
          this.selected.push(i.split(":")[1]);
        }
      }
    }
    // change the status of collapse
    if(window.innerWidth < 992){
      this.visible = false
    }
  },
};
</script>
