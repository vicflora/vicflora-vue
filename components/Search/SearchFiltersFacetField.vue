<template>
  <div>
    <div>
      <div
        :aria-expanded="visible ? 'true' : 'false'"
        :aria-controls="facetField.fieldLabel"
        class="m-facet-title"
        @click="visible = !visible"
      >
        {{ facetField.fieldLabel }}
        <BIcon
          v-if="visible"
          icon="caret-down-fill"
        />
        <BIcon
          v-else
          icon="caret-right-fill"
        />
      </div>

      <BCollapse
        :id="facetField.fieldName"
        v-model="visible"
        visible
      >
        <BFormGroup v-slot="{ ariaDescribedby }">
          <BFormCheckboxGroup
            v-model="selected"
            :aria-describedby="ariaDescribedby"
            @change="applySelected"
          >
            <div v-for="facet in facetField.facets.slice(0, 3)"
              :key="facet.value">
              <SearchFiltersFacet :facet="facet"/>
            </div>
          </BFormCheckboxGroup>
          <div v-if="facetField.facets.length > 3">
            <p
              class="m-more"
              @click="
                () => {
                  moreFacets = true
                }
              "
            >
              More...
            </p>
          </div>
        </BFormGroup>
      </BCollapse>

      <SearchFiltersFacetFieldModal
        v-if="moreFacets"
        :moreFacets="moreFacets"
        :facetName="facetField.fieldLabel"
        :data="facetField"
        @changeModal="
          $event => {
            moreFacets = $event
          }
        "
      />
    </div>
  </div>
</template>

<script>
const SearchFiltersFacet = () => import("@/components/Search/SearchFiltersFacet")
const SearchFiltersFacetFieldModal = () => import("@/components/Search/SearchFiltersFacetFieldModal")

export default {
  name: "SearchFiltersFacetField",
  components: {
    SearchFiltersFacet,
    SearchFiltersFacetFieldModal
  },
  props: {
    facetField: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      moreFacets: false,
      selected: [],
      visible: true,
    }
  },
  computed: {
    q: function() {
      return this.$route.query.q
    },
    fq: function() {
      if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq]
      } else if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq
      } else {
        return []

      }
    },
  },
  watch: {
    selected: function() {
      this.modalSelected = this.selected
    },
    fq: {
      immediate: true,
      handler() {
        this.getSelectedFacets()
      }
    }
  },
  mounted: function() {
    // change the status of collapse
    if(window.innerWidth < 992){
      this.visible = false
    }
  },
  methods: {
    // when the status changed, submit this change
    applySelected: function() {
      let key = this.facetField.facets[0].fq.split(":")[0]

      let facetQueryString = []
      for (let i = 0; i < this.selected.length; i++) {
        facetQueryString.push(`${key}:${this.selected[i]}`)
      }

      if (typeof this.$route.query.fq === "object") { // fq is an array (multiple elements)
        let newfq = this.$route.query.fq.filter(
          (item) => item.split(":")[0] !== key
        )
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            fq: Array.from(new Set([...newfq, ...facetQueryString])),
            page: 1
          },
        })
      } else if (typeof this.$route.query.fq === "string") { // fq is a string (one element)
        let newfq =
          this.$route.query.fq.split(":")[0] === key
            ? this.selected
            : [this.$route.query.fq]
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            fq: Array.from(new Set([...newfq, ...facetQueryString])),
            page: 1
          },
        })
      } else { // no fq
        this.$router.push({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            fq: facetQueryString,
            page: 1
          },
        })
      }
    },
    getSelectedFacets: function() {
      this.selected = []
      const keyName = this.facetField.facets[0].fq.split(":")[0]
      if (typeof this.fq === "object") {
        for (let i of this.fq) {
          const [key, value] = i.split(":")
          if (key == keyName) {
            const values = value.replace(/^\(+|\)+$/g, '').split(/ OR /i)
            for (let val of values) {
              if (key === keyName) {
                this.selected.push(val)
              }
            }
          }
        }
      }
    }
  }
}
</script>