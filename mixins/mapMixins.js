/**
 * Copyright 2021 Royal Botanic Gardens Victoria
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const tileLayerMixin = {
    data() {
        return {
            tileLayer: {
                url: "https://cartodb-basemaps-b.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
                attibution: 'map data © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, imagery © <a href="https://cartodb.com/attributions">CartoDB</a>'
            }
        }
    }
}

export const baseLayersMixin = {
    data() {
        return {
            baseLayers: [{
                    name: "Bioregions",
                    service: "WMS",
                    version: "1.1.0",
                    request: "GetMap",
                    visible: false,
                    layers: "vicflora-mapper:taxon_concept_bioregions,vicflora-mapper:bioregions",
                    srs: "EPSG:4326",
                    format: "image/png",
                    styles: "vicflora-mapper:polygon-establishment-means-transparent,",
                    transparent: true,
                    opacity: 0.8,
                    attribution: "DataVic"
                },
                {
                    name: "Local Government Areas",
                    service: "WMS",
                    version: "1.1.0",
                    request: "GetMap",
                    visible: false,
                    layers: "vicflora-mapper:taxon_concept_local_government_areas,vicflora-mapper:local_government_areas",
                    srs: "EPSG:4326",
                    format: "image/png",
                    styles: "vicflora-mapper:polygon-establishment-means-transparent,",
                    transparent: true,
                    opacity: 0.8,
                    attribution: "DataVic"
                },
                {
                    name: "Parks and Reserves",
                    service: "WMS",
                    version: "1.1.0",
                    request: "GetMap",
                    visible: false,
                    layers: "vicflora-mapper:taxon_concept_park_reserves,vicflora-mapper:park_reserves",
                    srs: "EPSG:4326",
                    format: "image/png",
                    styles: "vicflora-mapper:polygon-establishment-means-transparent,polygon-no-fill-grey-outline",
                    transparent: true,
                    opacity: 0.8,
                    attribution: "DataVic"
                },
                {
                    name: "Registered Aboriginal Parties",
                    service: "WMS",
                    version: "1.1.0",
                    request: "GetMap",
                    visible: false,
                    layers: "vicflora-mapper:taxon_concept_raps,vicflora-mapper:raps",
                    srs: "EPSG:4326",
                    format: "image/png",
                    styles: "vicflora-mapper:polygon-establishment-means-transparent,polygon-no-fill-grey-outline",
                    transparent: true,
                    opacity: 0.8,
                    attribution: "DataVic"
                }
            ]
        }
    }
}

export const alaOccurrenceLayerMixin = {
    data() {
        return {
            occurrenceLayer: {
                name: "AVH Occurrences",
                baseUrl: "https://biocache-ws.ala.org.au/ws/mapping/wms/reflect",
                service: "WMS",
                version: "1.1.1",
                request: "GetMap",
                visible: true,
                layers: "ALA:occurrences",
                srs: "EPSG:3857",
                format: "image/png",
                transparent: false,
                uppercase: true,
                attribution: 'occurrences: <a href="https://ala.org.au">Atlas of Living Australia</a>',
            },
            qc: "data_hub_uid:dh9",
            style: "opacity:0.8",
            bgcolor: "0x000000",
            outline: false,
            env: "color:df4a21;name:circle;size:4;opacity:0.8"
        }
    },
    computed: {
        queryString() {
            return `q=${ this.q }&qc=${ this.qc }&STYLE=${ this.style }&BGCOLOR=${ this.bgcolor }&OUTLINE=${ this.outline }&ENV=${ this.env }`
        }
    }
}

export const iconMixin = {
    data() {
        return {
            icon: {
                url: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers' +
                    '/master/img/marker-icon-blue.png',
                size: [1, 1]
            }
        }
    }
}

export const popupMixin = {
    data() {
        return {
            popupOptions: {
                offset: [0, 40],
                maxWidth: 450,
                minWidth: 300
            }
        }
    },
    methods: {
        openPopup: function() {
            this.$nextTick(() => {
                if (this.$refs.marker !== undefined) {
                    this.$refs.marker.mapObject.openPopup()
                }
            })
        }
    }
}

export const popupContentMixin = {
    data() {
        return {
            page: 0
        }
    },
    computed: {
        count() {
            return this.occurrences.length
        }
    },
    methods: {
        goPrev: function() {
            this.page -= 1
        },
        goNext: function() {
            this.page += 1
        }
    }
}