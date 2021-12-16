<template>
  <div v-if="pointData.parkReservesByPoint">
    <!-- Park Reserves -->
    <div class="m-table">
      <h5>Parks or reserves</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pointData.parkReservesByPoint" :key="item.id">
            <td>
              <a href="#" @click.stop="setSearchTerm('park_or_reserve', item.properties.name)">{{ item.properties.name }}</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Bioregions -->
    <div v-if="pointData.bioregionsByPoint">
      <h5>Bioregions</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pointData.bioregionsByPoint" :key="item.id">
            <td><a href="#" @click.stop="setSearchTerm('bioregion', item.properties.name)">{{ item.properties.name }} ({{ item.properties.regionCode }})</a></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- localGovernmentAreas -->
    <div v-if="pointData.localGovernmentAreasByPoint">
      <h5>Local Government Areas</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in pointData.localGovernmentAreasByPoint" :key="item.id">
            <td><a href="#" @click.stop="setSearchTerm('local_government_area', item.properties.name)">{{ item.properties.name }}</a></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChecklistTable",
  props: {
    pointData: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    setSearchTerm(field, value) {
      let q = `${field}:"${value}"`
      $nuxt.$emit('search-term', q)
    }
  }
}
</script>
