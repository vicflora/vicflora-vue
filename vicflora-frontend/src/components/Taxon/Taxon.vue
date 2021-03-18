<style lang="scss" scoped>
@import "./Taxon.scss";
</style>

<template>
    <div>
        <b-container>
            <ApolloQuery
                :query="require('../../graphql/queries/taxonConcept.gql')"
                :variables="{ id }"
            >
                <template v-slot="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occurred</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">
                    <!-- Breadcrumb -->
                    <b-row>
                        Breadcrumb
                    </b-row>
                    <!-- Name -->
                    <b-row>
                        <b-col class="text-left">
                            <div>
                                <h2 class="m-name">{{data.taxonConcept.taxonName.fullName}}</h2>
                            </div>
                        </b-col>
                    </b-row>
                    <!-- Status -->
                    <b-row class="m-row">
                        <b-col class="text-left"> 
                            <b-row>
                                <b-col>
                                    <p class="m-status-class">Taxonomic status: </p>
                                    <span class="m-status-content">{{data.taxonConcept.taxonomicStatus.name}}</span>
                                </b-col>
                            </b-row>  

                            <b-row>
                                <b-col>
                                    <p class="m-status-class">Occurrence status: </p>
                                    <span class="m-status-content">{{data.taxonConcept.occurrenceStatus.name}}</span>
                                </b-col>
                            </b-row> 

                            <b-row>
                                <b-col>
                                    <p class="m-status-class">Establishment means: </p>
                                    <span class="m-status-content">{{data.taxonConcept.establishmentMeans.name}}</span>
                                </b-col>
                            </b-row>  
                        </b-col>
                    </b-row>
                    <!-- classification -->
                    <b-row class="m-row">
                        <b-col class="text-left">
                            <p class="m-status-class">Classification</p>
                        </b-col>
                    </b-row>

                    <TaxonClassificationComponent v-if="data.taxonConcept.taxonTreeDefItem.name !=='family'||'genus'||'species'||'subspecies'"></TaxonClassificationComponent>
                    
                    <b-row v-else>
                        <b-col >
                            <!-- Overview -->
                            <b-row class="m-row">
                                <b-col class="text-left">
                                    <p class="m-status-class">Overview</p>
                                    <b-link to="/" class="m-overview-item">Images</b-link> 
                                    <b-link to="/" class="m-overview-item">Specimen Images</b-link> 
                                    <b-link to="/" class="m-overview-item">Classification</b-link> 
                                </b-col>
                            </b-row>
                            <!-- Description -->
                            <b-row class="m-row">
                                <!-- text -->
                                <b-col class="text-left">
                                    <div v-html="data.taxonConcept.currentProfile.profile">
                                    </div>
                                    <!-- Created time -->
                                    <div class="m-row">

                                    </div>

                                </b-col>
                                <!-- img -->
                                <b-col>
                                    images
                                </b-col>
                            </b-row>
                           
                            
                        </b-col>
                    </b-row>
                </div>

                <!-- No result -->
                <div v-else class="no-result apollo">Loading...</div>
                </template>
            </ApolloQuery>
        </b-container> 
    </div>
</template>

<script>
import TaxonClassificationComponent from '../Taxon-classification-component/Taxon-classification-component'
export default {
    name:'Taxon',
    components: {
       TaxonClassificationComponent
    },
    data(){
        return {
            id: "32066",
        }
    },
    computed: {
        urlId: function(){
            return this.$route.params.id
        }
    },
    watch: {
        urlId : {
            immediate: true,
            handler: function (val) {
                        this.id = val
                    },
        },
    }  
}
</script>