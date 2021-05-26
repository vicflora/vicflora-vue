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
        <b-col class="text-left">
          <div id="map-wrap" style="height: 100vh">
            <client-only>
              <l-map :zoom="13" :center="[55.9464418, 8.1277591]">
                <l-tile-layer
                  url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                ></l-tile-layer>
                <l-marker :lat-lng="[55.9464418, 8.1277591]"></l-marker>
              </l-map>
            </client-only>
          </div>
        </b-col>
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
  name: "CheckList"
};
</script>
