<style lang="scss" scoped>
@import "./Checklist-table.scss";
</style>
<template>
  <div>
    <!-- Park Reserves -->
    <div v-if="layer === 'Parks and Reserves'" class="m-table">
      <h5 class="m-topic">Park Reserves:</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <th scope="col">Name</th>
            <th scope="col">Type</th>
          </tr>
        </thead>
        <tbody class="m-table-fontsize">
          <tr v-for="item in data.parkReservesByPoint" :key="item.id">
            <td scope="row">
              <a href="#">{{ item.properties.nameShort }}</a>
            </td>
            <td scope="row">{{ item.properties.areaType }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Bioregions -->
    <div v-if="layer === 'Bioregions'">
      <h5 class="m-topic">Bioregions:</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <td scope="col">No.</td>
            <td scope="col">Name</td>
            <td scope="col">Region Code</td>
          </tr>
        </thead>
        <tbody class="m-table-fontsize">
          <tr v-for="item in data.bioregionsByPoint" :key="item.id">
            <td scope="row">{{ item.properties.number }}</td>
            <td scope="row">{{ item.properties.name }}</td>
            <td scope="row">{{ item.properties.regionCode }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- localGovernmentAreas -->
    <div v-if="layer === 'Local Government Areas'">
      <h5 class="m-topic">Local Government Areas:</h5>
      <table class="table table-sm">
        <thead>
          <tr class="table-active">
            <td scope="col">ID</td>
            <td scope="col">Name</td>
          </tr>
        </thead>
        <tbody class="m-table-fontsize">
          <tr v-for="item in data.localGovernmentAreasByPoint" :key="item.id">
            <td scope="row">{{ item.properties.id }}</td>
            <td scope="row">{{ item.properties.name }}</td>
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
    data: {
      type:Object,
      required: true,
      }, 
    layer: String 
    }
};
</script>
