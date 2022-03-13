<template>
  <article class="container static-content">
    <header class="m-title">
      <h1>
        Bioregions of Victoria
      </h1>
    </header>

    <div class="vf-map-container">
      <figure>
        <img
          class="img-responsive"
          src="https://data.rbg.vic.gov.au/geoserver/vicflora/wms?service=WMS&version=1.1.0&request=GetMap&layers=vicflora:vicflora_bioregion,vicflora:cst_vic&styles=,polygon_no-fill_black-outline&bbox=140.8,-39.3,150.2,-33.8&width=600&height=361&srs=EPSG:4326&format=image/svg&cql_filter=INCLUDE%3BFEAT_CODE+IN+%28%27mainland%27%2C%27island%27%29"
          alt="Bioregions of Victoria"
          usemap="#vicflora_bioregions"
        />
        <BioregionsImageMap></BioregionsImageMap>
      </figure>
    </div><!-- /.vf-map-container -->

    <b-row class="vf-bioregions-map-legend">
      <b-col>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#993399"
          ></span>
          <span class="m-legend-label">Snowy Mountains</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#993399"
          ></span>
          <span class="m-legend-label">Victorian Alps</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FF3300"
          ></span>
          <span class="m-legend-label">Wilsons Promontory</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FFCC33"
          ></span>
          <span class="m-legend-label">Flinders</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#CCCC99"
          ></span>
          <span class="m-legend-label">Murray Mallee</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FFCC33"
          ></span>
          <span class="m-legend-label">Lowan Mallee</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#999999"
          ></span>
          <span class="m-legend-label">Wimmera</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#95C795"
          ></span>
          <span class="m-legend-label">Bridgewater</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FF3300"
          ></span>
          <span class="m-legend-label">Glenelg Plain</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#993300"
          ></span>
          <span class="m-legend-label">Northern Inland Slopes</span>
        </div>
      </b-col>
      <b-col md="4">
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#99CCCC"
          ></span>
          <span class="m-legend-label">Murray Fans</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FFCCCC"
          ></span>
          <span class="m-legend-label">Victorian Riverina</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#009999"
          ></span>
          <span class="m-legend-label">Robinvale Plains</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#00CCCC"
          ></span>
          <span class="m-legend-label">Murray Scroll Belt</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#669999"
          ></span>
          <span class="m-legend-label">Gippsland Plain</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FF9999"
          ></span>
          <span class="m-legend-label">Otway Plain</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#ffff00"
          ></span>
          <span class="m-legend-label">Warrnambool Plain</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#996666"
          ></span>
          <span class="m-legend-label">East Gippsland Lowlands</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#999933"
          ></span>
          <span class="m-legend-label">East Gippsland Uplands</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#009966"
          ></span>
          <span class="m-legend-label">Highlands-Southern Fall</span>
        </div>
      </b-col>
      <b-col md="4">
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#66CC33"
          ></span>
          <span class="m-legend-label">Highlands-Northern Fall</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#00CCFF"
          ></span>
          <span class="m-legend-label">Otway Ranges</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#6633CC"
          ></span>
          <span class="m-legend-label">Strzelecki Ranges</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#006633"
          ></span>
          <span class="m-legend-label">Highlands-Far East</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#A1A266"
          ></span>
          <span class="m-legend-label">Monaro Tablelands</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#CCFFCC"
          ></span>
          <span class="m-legend-label">Victorian Volcanic Plain</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#FF9933"
          ></span>
          <span class="m-legend-label">Goldfields</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#9999CC"
          ></span>
          <span class="m-legend-label">Central Victorian Uplands</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#666666"
          ></span>
          <span class="m-legend-label">Greater Grampians</span>
        </div>
        <div class="m-legend-item">
          <span
            class="m-legend-symbol"
            style="background-color:#CC9966"
          ></span>
          <span class="m-legend-label">Dundas Tablelands</span>
        </div>
      </b-col>
    </b-row><!-- /.vf-bioregion-map-legend -->

    <div class="vf-bioregions-table table table-bordered table-responsive ">
      <table
        align="left"
        id="bioregion_comparison"
        style="width:100%"
        class="table align-middle"
      >
        <thead class="table-light">
          <tr>
            <th scope="col">Flora of Victoria (1993) Natural Region</th>
            <th scope="col"><strong>IBRA 7 Region</strong></th>
            <th scope="col"><strong>IBRA 7 Subegion</strong></th>
            <th scope="col">Victorian Bioregion</th>
          </tr>
        </thead>
        <tbody class="text-align-center">
          <tr>
            <td colspan="1" rowspan="2"><nuxt-link to="/pages/riverina">Riverina</nuxt-link></td>
            <td colspan="1" rowspan="4">Riverina</td>
            <td colspan="2" rowspan="1">Victorian Riverina</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Murray Fans</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="3"><nuxt-link to="/pages/murray-mallee">Murray Mallee</nuxt-link></td>
            <td colspan="2" rowspan="1">Robinvale Plains</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Murray Scroll Belt</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="3">Murray Darling Depression</td>
            <td colspan="2" rowspan="1">Murray Mallee</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/lowan-mallee">Lowan Mallee</nuxt-link></td>
            <td colspan="2" rowspan="1">Lowan Mallee</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/wimmera">Wimmera</nuxt-link></td>
            <td colspan="2" rowspan="1">Wimmera</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="3"><nuxt-link to="/pages/wannon">Wannon</nuxt-link></td>
            <td colspan="1" rowspan="2">Narracoorte Coastal Plain</td>
            <td colspan="2" rowspan="1">Bridgewater</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Glenelg Plain</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="4">Victorian Midlands</td>
            <td colspan="2" rowspan="1">Dundas Tablelands</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/grampians">Grampians</nuxt-link></td>
            <td colspan="2" rowspan="1">Greater Grampians</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="3"><nuxt-link to="/pages/midlands">Midlands</nuxt-link></td>
            <td colspan="2" rowspan="1">Goldfields</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Central Victorian Uplands</td>
          </tr>
          <tr>
            <td>NSW South-Western Slopes</td>
            <td colspan="2" rowspan="1">Northern Inland Slopes</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/victorian-volcanic-plain">Victorian Volcanic Plain</nuxt-link></td>
            <td>Southern Volcanic Plain</td>
            <td colspan="2" rowspan="1">Victorian Volcanic Plain</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2"><nuxt-link to="/pages/otway-plain">Otway Plain</nuxt-link></td>
            <td colspan="1" rowspan="3">South East Coastal Plain</td>
            <td colspan="2" rowspan="1">Warrnambool Plain</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Otway Plain</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/gippsland-plain">Gippsland Plain</nuxt-link></td>
            <td colspan="2" rowspan="1">Gippsland Plain</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/otway-range">Otway Range</nuxt-link></td>
            <td colspan="1" rowspan="6">South Eastern Highlands</td>
            <td colspan="2" rowspan="1">Otway Ranges</td>
          </tr>
          <tr>
            <td colspan="1"><nuxt-link to="/pages/gippsland-highlands">Gippsland Highlands</nuxt-link></td>
            <td colspan="2" rowspan="1">Strzelecki Ranges</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2"><nuxt-link to="/pages/eastern-highlands">Eastern Highlands</nuxt-link></td>
            <td colspan="2" rowspan="1">Highlands-Southern Fall</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Highlands-Northern Fall</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="4"><nuxt-link to="/pages/east-gippsland">East Gippsland</nuxt-link></td>
            <td colspan="2" rowspan="1">Monaro Tablelands</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">Highlands-Far East</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2">South East Corner</td>
            <td colspan="2" rowspan="1">East Gippsland Uplands</td>
          </tr>
          <tr>
            <td colspan="2" rowspan="1">East Gippsland Lowlands</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2"><nuxt-link to="/pages/snowfields">Snowfields</nuxt-link></td>
            <td colspan="1" rowspan="2">Australian Alps</td>
            <td>Snowy Mountains</td>
            <td colspan="1" rowspan="2">Victorian Alps</td>
          </tr>
          <tr>
            <td>Victorian Alps</td>
          </tr>
          <tr>
            <td colspan="1" rowspan="2"><nuxt-link to="/pages/wilsons-promontory">Wilsons Promontory</nuxt-link></td>
            <td colspan="1" rowspan="2">Furneaux</td>
            <td>Wilsons Promontory</td>
            <td colspan="1" rowspan="2">Wilsons Promontory</td>
          </tr>
          <tr>
            <td>Flinders</td>
          </tr>
        </tbody>
      </table>
    </div><!-- /.vf-bioregions-table -->

  </article>
</template>

<script>
import BioregionsImageMap from '@/components/BioregionsImageMap'
export default {
  name: "Bioregions",
  component: {
    BioregionsImageMap,
  }
}
</script>