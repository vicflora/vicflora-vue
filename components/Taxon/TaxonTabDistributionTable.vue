<template>
  <div>
    <b-button
      v-b-toggle.region-table
      variant="primary"
      size="sm"
    >
      {{ layer }} {{ `(${items.length})` }}
      <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
      <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
    </b-button>
    <b-collapse
      id="region-table"
      visible
    >
      <b-table
        :items="items"
        :fields="fields"
        small
        striped
        table-variant="light"
        head-variant="dark"
      >
        <template #cell(status)="data">
          <div :class="`vf-status ${data.value}`">&nbsp;</div>
        </template>
      </b-table>
    </b-collapse>
  </div>
</template>

<script>
import occurrenceStatusEnum from "~/graphql/enums/occurrenceStatusEnum"
import establishmentMeansEnum from "~/graphql/enums/establishmentMeansEnum"

export default {
  name: "TaxonTabDistributionTable",
  props: {
    layer:{
        type: String,
        required: true,
    },
    tableData: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
      occurrenceStatusEnum,
      establishmentMeansEnum,
    }
  },
  computed: {
    areaNameProperty() {
      let areaNameProperty = ''
      switch(this.layer) {
        case 'Bioregions':
          areaNameProperty = 'bioregionName'
          break
        case 'Local Government Areas':
          areaNameProperty = 'localGovernmentAreaName'
          break
        case 'Parks and Reserves':
          areaNameProperty = 'parkReserveName'
          break
        case 'Registered Aboriginal Parties':
          areaNameProperty = 'registeredAboriginalPartyName'
          break
      }
      return areaNameProperty
    },
    areaLabel() {
      let areaLabel = ''
      switch(this.layer) {
        case 'Bioregions':
          areaLabel = 'Bioregion name'
          break
        case 'Local Government Areas':
          areaLabel = 'Local Government Area name'
          break
        case 'Parks and Reserves':
          areaLabel = 'Park or Reserve name'
          break
        case 'Registered Aboriginal Parties':
          areaLabel = 'Registered Aboriginal Party name'
          break
      }
      return areaLabel
    },
    fields() {
      return [
        {
          key: 'status',
          label: 'Symbol',
        },
        {
          key: 'areaName',
          label: 'Name',
        },
        {
          key: 'occurrenceStatus',
          label: 'Occurrence status',
        },
        {
          key: 'establishmentMeans',
          label: 'Establishment means',
        },
      ]
    },
    items() {
      let items = this.tableData.map((rec, index) => {
        return {
          status: this.getStatusColour(rec.occurrenceStatus, rec.establishmentMeans),
          areaName: rec[this.areaNameProperty],
          occurrenceStatus: this.occurrenceStatusEnum[rec.occurrenceStatus].label,
          establishmentMeans: this.establishmentMeansEnum[rec.establishmentMeans].label,
        }
      })
      return items
    }
  },
  methods: {
    getStatusColour(occ, est) {
      let statusClass = ''
      if (occ === 'DOUBTFUL') {
        statusClass = 'vf-status-doubtful'
      }
      if (occ === 'EXTINCT') {
        statusClass = 'vf-status-extinct'
      }
      if (est === 'UNCERTAIN') {
        statusClass = 'vf-status-uncertain'
      }
      if (est === 'CULTIVATED') {
        statusClass = 'vf-status-cultivated'
      }
      if (est === 'NATURALISED') {
        statusClass = 'vf-status-naturalised'
      }
      if (est === 'INTRODUCED') {
        statusClass = 'vf-status-introduced'
      }
      if (est === 'NATIVE') {
        statusClass = 'vf-status-native'
      }
      return statusClass
    }
  },
};
</script>