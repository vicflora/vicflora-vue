<style lang="scss" scoped>
@import "./Checklist.scss";
</style>
<template>
  <div class="m-checklist">
    <b-container>
      <b-row class="mb-2">
        <b-col class="text-left">
          <div class="m-main-title">
            <h2>
              Checklist
            </h2>
            <p>
              Create your own checklist for any Victorian park or reserve in the
              <a href="https://www.environment.gov.au/land/nrs/science/capad"
                >Collaborative Australian Protected Area Database (CAPAD)
                <b-icon icon="box-arrow-up-right"></b-icon> </a
              >, based on occurrence data from
              <a href="https://avh.chah.org.au/"
                >Australia's Virtual Herbarium (AVH)
                <b-icon icon="box-arrow-up-right"></b-icon
              ></a>
              and the
              <a
                href="https://www.environment.vic.gov.au/biodiversity/victorian-biodiversity-atlas"
                >Victorian Biodiversity Atlas (VBA)
                <b-icon icon="box-arrow-up-right"></b-icon
              ></a>
              and using the taxonomy of VicFlora.
            </p>
            <p>
              Click on a point on the map below and a list of reserves will
              appear. Select a reserve and a checklist of vascular plant taxa
              will be generated below the map.
            </p>
          </div>
        </b-col>
      </b-row>
      <b-row class="mb-2">
        <b-col class="text-left" md="6">
          <div id="map-wrap">
            <client-only>
              <l-map :zoom="6" :center="[-36.155, 144.81]" class="m-map" @click="getCoordinate">
                <l-control-layers
                  position="topright"
                ></l-control-layers>
                <l-tile-layer
                  url="https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
                ></l-tile-layer>

                <l-lwms-tile-layer
                  v-for="layer in layers"
                  :key="layer.name"
                  :base-url="layer.baseUrl"
                  :visible="layer.visible"
                  :name="layer.name"
                  :layers="layer.layers"
                  :transparent="layer.transparent"
                  :format="layer.format"
                  layer-type="base"
                  @update:visible="test()"
                >
                </l-lwms-tile-layer>
              </l-map>
            </client-only>
          </div>
        </b-col>
        <b-col> </b-col>
      </b-row>
      <b-row>
        <b-col class="text-left m-source">
          <h4>Source</h4>
          <ul class="m-ul">
            <li>
              <b>Protected areas: </b
              ><i>Collaborative Australian Protected Areas Database</i> (CAPAD)
              2014, Commonwealth of Australia 2014
            </li>
            <li>
              <b>Occurrence data:</b>
              <ul>
                <li>
                  AVH (2021). <i>Australia’s Virtual Herbarium</i>, Council of
                  Heads of Australasian Herbaria, (<a
                    href="http://avh.chah.org.au"
                    >http://avh.chah.org.au</a
                  >)
                </li>
                <li>
                  <i>Victorian Biodiversity Atlas</i>, © The State of Victoria,
                  Department of Environment and Primary Industries (published
                  Dec. 2014).
                </li>
              </ul>
            </li>
          </ul>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
  name: "CheckList",
  data() {
    return {
      layers: [
        {
          name: "Parks and Reserves",
          baseUrl:
            "https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms",
          visible: true,
          layers: "CROWNLAND_PARKRES",
          format: "image/png",
          transparent: true
        },
        {
          name: "Local Government Areas",
          baseUrl:
            "https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms",
          visible: false,
          layers: "VMLITE_LGA",
          format: "image/png",
          transparent: true
        },
        {
          name: "Bioregions",
          baseUrl:
            "https://services.land.vic.gov.au/catalogue/publicproxy/guest/dv_geoserver/wms",
          visible: false,
          layers: "FLORAFAUNA1_VBIOREG100",
          format: "image/png",
          transparent: true
        }
      ]
    };
  },
  watch: {
  },
  methods:{
      getCoordinate:function(event){
        //   console.log(event.latlng)
          console.log(event)
      },
      test(){
          console.log("event")
      }
  }
};
</script>
