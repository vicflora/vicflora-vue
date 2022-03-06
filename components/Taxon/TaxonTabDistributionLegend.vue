<template>
<div>
  <b-button
    v-b-toggle="'legend'"
    variant="primary"
    size="sm"
  >
    Legend
    <span class="when-open"><b-icon-caret-down-fill></b-icon-caret-down-fill></span>
    <span class="when-closed"><b-icon-caret-right-fill></b-icon-caret-right-fill></span>
  </b-button>

  <b-collapse id="legend">

    <table
      class="table table-borderless text-center">
      <thead>
        <tr>
          <th scope="col"></th>
          <th scope="col" colspan="3">Origin and degree of establishment</th>
          <th scope="col">Occurrence status</th>
        </tr>
        <tr>
          <th scope="col" width="*"></th>
          <th scope="col" width="20%">Native</th>
          <th scope="col" width="20%">Introduced</th>
          <th scope="col" width="20%">Cultivated</th>
          <th scope="col" width="20%">Extinct</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" class="text-left">AVH</th>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-native">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-introduced">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-cultivated">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-extinct">&nbsp;</span></td>
        </tr>
        <tr>
          <th scope="row" class="text-left">VBA</th>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-vba-native">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-point vf-legend-item-point-vba-introduced">&nbsp;</span></td>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <th scope="row" class="text-left">Regions/areas</th>
          <td class="vf-legend-item"><span class="vf-legend-item-area vf-legend-item-area-native">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-area vf-legend-item-area-introduced">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-area vf-legend-item-area-cultivated">&nbsp;</span></td>
          <td class="vf-legend-item"><span class="vf-legend-item-area vf-legend-item-area-extinct">&nbsp;</span></td>
        </tr>
      </tbody>
    </table>
  </b-collapse>
</div>
</template>

<script>
export default {
  name: "TaxonTabDistributionLegend",
  data() {
    return {
      items: {
        occurrenceStatus: [
          'extinct'
        ],
        establishmentMeans: [
          'native',
          'introduced',
          'cultivated',
          'uncertain'
        ]
      }
    }
  },
}
</script>

<style lang="scss">
.collapsed > .when-open,
.not-collapsed > .when-closed {
  display: none;
}

#legend {
  margin: 10px 0;
  border: solid 1px #cccccc;

  .table {
    margin-bottom: 0;

    thead {
      border-bottom: solid 1px #ccc;
    }

    tr>th:first-child,
    tr:first-child>th:nth-child(2),
    tr:nth-child(2)>th:nth-child(4),
    tr>td:nth-child(4) {
      border-right: solid 1px #ccc;
    }

    .vf-legend-item {
      vertical-align: middle;
      padding: 0.3rem;

      .vf-legend-item-area {
        display: inline-block;
        position: relative;
        height: 1.5rem;
        width: 2.5rem;
        border: solid 1px #cccccc;

        &.vf-legend-item-area-native {
          background-color: #a4f27d;
        }

        &.vf-legend-item-area-introduced {
          background-color: #ffcccc;
        }

        &.vf-legend-item-area-cultivated {
          background-color: rgba(51, 51, 255, 0.4);
        }

        &.vf-legend-item-area-uncertain {
          background-color: rgba(255, 187, 0, 0.4);
        }

        &.vf-legend-item-area-extinct {
          background-color: rgba(233, 170, 255, 0.4);
        }
      }

      .vf-legend-item-point {
        display: inline-block;
        height: 6px;
        width: 6px;

        &.vf-legend-item-point-native {
          background-color: #2F8A26;
        }

        &.vf-legend-item-point-introduced {
          background-color: #ff0000;
        }

        &.vf-legend-item-point-cultivated {
          background-color: #3333ff;
        }

        &.vf-legend-item-point-uncertain {
          background-color: #ffbb00;
        }

        &.vf-legend-item-point-extinct {
          background-color: #e9aaff;
        }

        &.vf-legend-item-point-vba-native {
          background-color: #b0d619;
          height: 4px;
          width: 4px;
        }

        &.vf-legend-item-point-vba-introduced {
          background-color: #ea98e9;
          height: 4px;
          width: 4px;
        }
      }
    }
  }
}
</style>
