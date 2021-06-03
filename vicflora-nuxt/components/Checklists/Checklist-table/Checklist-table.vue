<style lang="scss" scoped></style>
@import "./Checklist-table.scss";
<template>
  <div>
    <!-- Park Reserves -->
    <div v-if="layer === 'Park Reserves'">
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
            <th scope="row">
              <a href="#">{{ item.properties.nameShort }}</a>
            </th>
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
            <th scope="col">No.</th>
            <th scope="col">Name</th>
            <th scope="col">Region Code</th>
          </tr>
        </thead>
        <tbody class="m-table-fontsize">
          <tr v-for="item in data.bioregionsByPoint" :key="item.id">
            <th scope="row">{{ item.properties.number }}</th>
            <th scope="row">{{ item.properties.name }}</th>
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
            <th scope="col">ID</th>
            <th scope="col">Name</th>
          </tr>
        </thead>
        <tbody class="m-table-fontsize">
          <tr v-for="item in data.localGovernmentAreasByPoint" :key="item.id">
            <th scope="row">{{ item.properties.id }}</th>
            <th scope="row">{{ item.properties.name }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChecklistTable",
  props: ["data", "layer"],
    

};
</script>
