<template>
  <div>
      <!-- Description -->
      <b-row class="m-row">
        <!-- text -->
        <!-- use .replaceAll() to replace the tags in HTML -->
        <b-col class="text-left" v-if="concept.currentProfile" :lg="hasAside ? 8 : 12">
          <div
            class="current-profile"
            v-html="concept.currentProfile.profile"
          />

          <div v-if="glossaryTermsInString">
            <b-popover
              v-for="item in glossaryTermsInString"
              :key="`${item.term.id}-${item.substring}`"
              :target="`${item.term.id}-${item.substring}`"
              triggers="hover"
              placement="topright"
            >
              <template #title>{{ item.term.name }}</template>
              <div v-html="item.term.definition"/>
              <div class="text-right"><nuxt-link :to="`/flora/glossary?name=${item.term.name}`">{{ item.term.name }} <b-icon-chevron-right/></nuxt-link></div>
            </b-popover>
          </div>
          <div 
            v-else
            class="text-right glossarize">
            <!-- <a href="" @click.prevent="glossarize">Glossarize</a> -->
            <!-- <b-checkbox @change="glossarize">Glossarize</b-checkbox> -->
            <b-button 
              variant="outline-primary" 
              size="sm" 
              title="Look up glossary terms"
              @click="lookupGlossaryTerms"
            >
              <b-icon-chat-left-text-fill/>
            </b-button>
          </div>

          <TaxonTabOverviewAttribution :concept="concept" />

          <TaxonTabOverviewKeyButtons 
            v-if="keys.length" 
            :keys="keys"
          />
        </b-col>

        <b-col
          v-if="hasAside"
          lg="4"
        >
          <!-- Hero img -->
          <TaxonTabOverviewImage
            v-if="hasHeroImage"
            :src="concept.heroImage.previewUrl"
            :alt="`${concept.taxonName.fullName} (hero image)`"
            @image-clicked="onHeroImageClicked"
          />

          <!-- Map -->
          <TaxonTabOverviewImage
            v-if="hasProfileMap"
            :src="concept.mapLinks.profileMap"
            :alt="`${concept.taxonName.fullName} (distribution map)`"
            @image-clicked="onProfileMapClicked"
          />
        </b-col>
      </b-row>
  </div>
</template>

<script>
import TaxonTabOverviewAttribution from "~/components/Taxon/TaxonTabOverviewAttribution"
import TaxonTabOverviewKeyButtons from "~/components/Taxon/TaxonTabOverviewKeyButtons"
import TaxonTabOverviewImage from "~/components/Taxon/TaxonTabOverviewImage"
import { rankMixin } from "~/mixins/taxonMixins"

import gql from "graphql-tag"
const GlossaryTermsInStringQuery = gql`query GlossaryTermsInStringQuery($string: String!) {
  glossaryTermsInString(string: $string) {
    substring
    term {
      id
      name
      definition
    }
  }
}`

export default {
  name: "TaxonTabOverview",
  components: {
    TaxonTabOverviewAttribution,
    TaxonTabOverviewKeyButtons,
    TaxonTabOverviewImage,
  },
  mixins: [
    rankMixin
  ],
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      glossaryTermsInString: null,
      glossarizedDesc: null,
    }
  },
  apollo: {
    glossaryTermsInString: {
      query: GlossaryTermsInStringQuery,
      result ({ data, loading }) {
        if (!loading) {
          if (data.glossaryTermsInString.length) {
            let desc = this.description
            data.glossaryTermsInString.forEach(item => {
              let index = 0
              const regex = new RegExp('\\b' + item.substring + '\\b', 'g')
              desc = desc.replace(regex, match => {
                index++
                if (index > 1) {
                  this.glossaryTermsInString.push({
                    substring: item.substring,
                    term: {
                      id: item.term.id + '-' + index,
                      name: item.term.name,
                      definition: item.term.definition
                    }
                  })
                  return `<span class="glossary-term" id="${item.term.id}-${index}-${item.substring}">${item.substring}</span>`
                }
                else {
                  return `<span class="glossary-term" id="${item.term.id}-${item.substring}">${item.substring}</span>`
                }
              })
            })
            this.glossarizedDesc = desc
            const descriptionDiv = this.$el.querySelector('.description')
            descriptionDiv.innerHTML = `<p>${desc}</p>`
          }
        }
      },
      skip: true,
    },
  },
  computed: {
    hasHeroImage() {
      return this.concept.heroImage ? true : false
    },
    hasProfileMap() {
      return this.concept.taxonTreeDefItem.rankId >= this.rankClass['species']
    },
    hasAside() {
      return this.hasHeroImage || this.hasProfileMap
    },
    keys() {
      let keys = []
      if (this.concept.identificationKeys.length) {
        keys = keys.concat(this.concept.identificationKeys)
      }
      if (this.concept.matrixKeys.length) {
        keys = keys.concat(this.concept.matrixKeys)
      }
      return keys
    },
    description() {
      return this.$el.querySelector('.description').innerText
    },
  },
  // watch: {
  //   glossaryTermsInString: {
  //     immediate: true,
  //     deep: true,
  //     handler() {
  //       let desc = $el.querySelector('.description').innerHTML
  //       for (item in this.glossaryTermsInString) {
  //         desc = desc.replace(item.substring, `<span class="glossary-term" id="${item.term.id}">${item.substring}</span>`)
  //       }
  //     }
  //   }
  // },
  mounted() {
    let elements = document.getElementsByClassName('current-profile')[0]
        .getElementsByClassName('scientific_name')

    for (let i = 0, n = elements.length; i < n; i++) {
      let sciname = elements[i].innerHTML
      if (sciname.trim().indexOf(' ') > -1) {
        sciname = `<em>${ sciname }</em>`
        sciname = sciname.replace(' subsp. ', '</em> subsp. <em>')
        sciname = sciname.replace(' var. ', '</em> var. <em>')
        sciname = sciname.replace(' f. ', '</em> f. <em>')
      }
      elements[i].innerHTML = sciname
    }
  },
  methods: {
    getBtnText: function(name) {
      switch (name) {
        case "family":
          return "genera";
        case "genus":
          return "species";
      }
    },
    onHeroImageClicked() {
      this.$nuxt.$emit('hero-image-clicked')
    },
    onProfileMapClicked() {
      this.$nuxt.$emit('profile-map-clicked')
    },
    lookupGlossaryTerms() {
      this.$apollo.queries.glossaryTermsInString.setVariables({
        string: this.description
      })
      this.$apollo.queries.glossaryTermsInString.skip = false
    }
  },
}
</script>