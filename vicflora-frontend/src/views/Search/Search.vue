<style lang="scss" scoped>
.m-search::v-deep {
    @import "./Search.scss";
}
</style>

<template>
    
    <b-container class="m-search">
        <ApolloQuery
           :query="require('../../graphql/queries/search.gql')"
            :variables="{ input }"
        >
            <template v-slot="{ result: { loading, error, data } }">
                <!-- Loading -->
                <div v-if="loading" class="loading apollo">Loading...</div>

                <!-- Error -->
                <div v-else-if="error" class="error apollo">An error occurred</div>

                <!-- Result -->
                <div v-else-if="data" class="result apollo">
                     <b-row>
                        <b-col class="text-left">
                            <div class="m-main-title">
                                <h2>
                                    Search
                                </h2>
                            </div>
                        </b-col>   
                    </b-row>
                    <b-row>
                        <b-col lg="4" cols="12" class="text-left">
                            <div class="m-row">
                                <b-input-group>
                                    <b-form-input
                                        v-model="inputText"
                                        size="sm"
                                        @change="checkText"
                                        placeholder="Enter taxon name..."
                                    ></b-form-input>
                                    <b-input-group-append>
                                    <b-button size="sm">
                                        <b-icon font-scale="1" icon="search" />
                                    </b-button>
                                    </b-input-group-append>
                                </b-input-group>
                            </div>
                            <div class="m-row">
                                <b-form-checkbox     
                                    v-model="exclusionCheckbox"
                                >
                                Exclude higher taxa
                                </b-form-checkbox>
                            </div>
                            <div >     
                                <div>
                                    <span v-b-toggle.collapse-query class="m-subtitle">
                                        Query
                                        <span class="when-opened">Close</span> 
                                        <span class="when-closed">Open</span>
                                    </span>
                                    
                                    <b-collapse visible id="collapse-query">
                                        <b-card>Query term:</b-card>
                                    </b-collapse>
                                </div>
                            </div>
                        </b-col>

                        <b-col lg="8" cols="12">
                            <b-row align-v="baseline">
                                <b-col class="text-left" cols="3" align-self="left">
                                    <span>{{data.search.meta.pagination.total}} matches</span>
                                </b-col>
                                <b-col align-self="left">
                                    <div class="mt-0">
                                        <b-pagination-nav
                                            size="sm"
                                            v-model="currentPage"
                                            :number-of-pages="data.search.meta.pagination.count"
                                            base-url="#"
                                            first-number
                                            last-number
                                        ></b-pagination-nav>
                                        </div>
                                </b-col>
                                <b-col cols="4" align-self="right">
                                    <b-btn size="sm">Download</b-btn>
                                </b-col>
                            </b-row> 
                            <b-row style="display:inline-block;width:100%;">
                                <b-col class="text-left" cols="12">
                                    <b-row v-for="item in data.search.docs" :key= item.id>
                                        {{item.scientificName}}
                                    </b-row>
                                </b-col>
                            </b-row> 
                        </b-col>
                    </b-row>
                </div>
                <!-- No result -->
                <div v-else class="no-result apollo">No result :(</div>
            </template>
        </ApolloQuery>
           
            
    </b-container>
</template>

<script>

export default {
    name: "Search",
    components:{
    },
    data(){
        return {
            exclusionCheckbox:false,
            currentPage:1,
            input: { 
                q: "*bor*", 
                rows: 50,
                page:1,
                },
            inputText: "",
            search:'',
        }
    },
    methods:{
        checkText:function (){
            if (this.inputText.length < 2) {
                return;
            }
            this.input = {
                fq: `*${this.inputText}*`,
            };
        }
    },
    computed:{
        // input:function(){

        // }
    },
    
  }
</script>