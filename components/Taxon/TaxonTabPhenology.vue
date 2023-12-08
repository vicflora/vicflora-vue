<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div class="vf-taxon-tab-phenology">
    <div v-if="data">
      <div
        v-for="subgroup in subgroups" 
        :key="subgroup"
      >
        <TaxonTabPhenologyChart 
          v-if="data.reduce((accumulator, object) => accumulator + object[subgroup], 0) > 0"
          :data="data"
          :subgroup="subgroup"
        />
      </div>
    </div>
    <TaxonTabPhenologyDataTable 
      v-if="data"
      :data="data"
    />
  </div>
</template>

<script>
import TaxonConceptPhenologyQuery from '~/graphql/queries/TaxonConceptPhenologyQuery'
import MonthEnum from '~/graphql/enums/MonthEnum'

const TaxonTabPhenologyDataTable = () => import('~/components/Taxon/TaxonTabPhenologyDataTable')
const TaxonTabPhenologyChart = () => import('~/components/Taxon/TaxonTabPhenologyChart')

export default {
  name: 'TaxonTabPhenology',
  components: {
    TaxonTabPhenologyDataTable,
    TaxonTabPhenologyChart,
  },
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      taxonConceptPhenology: null,
      subgroups: ['total', 'buds', 'flowers', 'fruit']
    }
  },
  apollo: {
    taxonConceptPhenology: {
      query: TaxonConceptPhenologyQuery,
      variables() {
        return {
          id: this.concept.id
        }
      },
      result({ loading, data }) {
        if (loading) {
          $nuxt.$emit('progress-bar-start')
        }
        else {
          $nuxt.$emit('progress-bar-stop')
          this.taxonConceptPhenology = data.taxonConceptPhenology
        }
      },
      skip: true
    },
  },
  computed: {
    data() {
      if (this.taxonConceptPhenology) {
        const months = Object.keys(MonthEnum)
        return months.map(month => {
          const phen = this.taxonConceptPhenology.filter(item => {
            return item.month === month 
          })

          return {
            month: MonthEnum[month].label,
            monthShort: MonthEnum[month].short,
            monthNumber: MonthEnum[month].number,
            total: phen.length ? phen[0].total : 0,
            buds: phen.length ? phen[0].buds : 0,
            flowers: phen.length ? phen[0].flowers : 0,
            fruit: phen.length ? phen[0].fruit : 0,
          }
        })
      }
    }
  },
  created() {
    this.$apollo.queries.taxonConceptPhenology.setVariables({
      id: this.concept.id
    })
    this.$apollo.queries.taxonConceptPhenology.skip = false
  }
}
</script>