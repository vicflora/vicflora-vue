<template>
  <!-- Map table -->
  <b-col cols="12" class="m-table">
    <table v-if="layer!=='None'">
      <tr>
        <th></th>
        <th>{{layer}}</th>
        <th>Occurrence status</th>
        <th>Establishment means</th>
      </tr>
      <tr v-for="item in concept[layerName]" :key="item.id">
        <td>
          <div
            class="m-table-color-box"
            :style="
              `background-color: ${
                statusColors[item.establishmentMeans.name]
              };`
            "
          ></div>
        </td>
        <!-- <td>{{ item.id }}</td> -->
        <td>{{ item[layerName.substr(0, layerName.length - 1)].properties.name }}</td>
        <td>{{ item.occurrenceStatus.name }}</td>
        <td>{{ item.establishmentMeans.name }}</td>
      </tr>
    </table>

    <div class="text-right mt-4">
      <b-link>Bioregions of Victoria</b-link>
    </div>
  </b-col>
</template>

<script>
export default {
  name: "TaxonTabDistributionTable",
  props: {
    concept: {
      type: Object,
      required: true
    },
    layer:{
        type: String
    }
  },
  data() {
    return {
        nameList:{
            "Bioregions":'bioregions',
            "Local Government Areas": "localGovernmentAreas",
            "Parks and Reserves": "parkReserves"
        },
      statusColors: {
        native: "#a4f27d",
        introduced: "#ffcccc",
        naturalised: "#ffcccc",
        cultivated: "#3333ff",
        uncertain: "#ffbb00",
        extinct: "#e9aaff",
        doubtful: "#fcfc99"
      }
    };
  },
  computed:{
      layerName:function(){
          return this.nameList[this.layer]
      }
  }
};
</script>

<style lang="scss" scoped>
@import "~/assets/scss/custom_variables.scss";
.m-table {
  table {
    border-collapse: collapse;
    width: 100%;
  }
  .m-table-color-box {
    height: 15px;
    width: 30px;
    background-color: yellowgreen;
    border: 1px solid $grey;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 6px;
  }
  th {
    font-family: "goodsans-thin";
    color: white;
    background-color: $grey;
  }
}
</style>
