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
    <b-row>
      <b-col><h4 class="vf-legend-item-group-header"><small>Occurrence status</small></h4></b-col>
    </b-row>
    <b-row>
      <b-col 
        v-for="item in items.occurrenceStatus"
        :key="item"
        md="6" lg="4" xl="3"
      >
        <div class="vf-legend-item">
          <span :class="`vf-legend-item-area vf-legend-item-area-${item}`">
            <span :class="`vf-legend-item-point vf-legend-item-point-${item}`">&nbsp;</span>
          </span> <span class="vf-legend-item-label">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</span>
        </div>
      </b-col>
    </b-row>
    <b-row>
      <b-col><h4 class="vf-legend-item-group-header"><small>Establishment means</small></h4></b-col>
    </b-row>
    <b-row>
      <b-col 
        v-for="item in items.establishmentMeans"
        :key="item"
        md="6" lg="4" xl="3"
      >
        <div class="vf-legend-item">
          <span :class="`vf-legend-item-area vf-legend-item-area-${item}`">
            <span :class="`vf-legend-item-point vf-legend-item-point-${item}`">&nbsp;</span>
          </span> <span class="vf-legend-item-label">{{ item.charAt(0).toUpperCase() + item.slice(1) }}</span>
        </div>
      </b-col>
    </b-row>
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
}

.vf-legend-item-group-header {
  margin: 0 0.3rem;
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
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
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
  }

  .vf-legend-item-label {
    vertical-align: top;
    margin-left: 0.5rem;
  }
}
</style>