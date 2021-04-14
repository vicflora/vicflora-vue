<style lang="scss" scoped>
@import "./Facets-collapse.scss";
</style>

<template>
    <div>
        <div>
            <b-row align-h="between">
                <b-col cols="8">
                    <span
                    :aria-expanded="visible ? 'true' : 'false'"
                    :aria-controls="`${localFacetField.fieldName}`"
                    @click="visible = !visible"
                    class="m-facet-title"  
                    >
                        {{facetName[localFacetField.fieldName]}}
                        <b-icon icon="caret-down-fill" v-if="visible"></b-icon>
                        <b-icon icon="caret-right-fill" v-else></b-icon>
                    </span>
                </b-col>
            </b-row>

            <b-collapse visible :id="localFacetField.fieldName" v-model="visible">
            <b-card>
                <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox-group
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        @change="applySelected"
                    >
                        <b-form-checkbox 
                        :value="facet.value"
                        v-for="facet in localFacetField.facets.slice(0,3)" 
                        :key="facet.value"
                        class="m-facetvalue"
                        >
                        <span class="m-facet-value">{{facet.value}} ({{facet.count}})</span>
                        </b-form-checkbox>
                    </b-form-checkbox-group>
                    <div v-if="localFacetField.facets.length>3">
                        <p class="m-more" @click="()=>{moreFacet=true}">More...</p>
                    </div>
                </b-form-group>

                <!-- <span>
                    <b-icon icon="x" font-scale="1.1" variant="danger"></b-icon>
                </span> -->
                
            </b-card>
            </b-collapse>
        </div>
        <b-modal v-model="moreFacet" size="lg" :title="facetName[localFacetField.fieldName]">
            <table class="table table-striped table-hover">
                <thead>
                    <tr>
                        <th scope="col">
                            <b-row>
                                <b-col>
                                    <p style="display:inline-block;" class="mb-0">Value</p> 
                                </b-col>
                                <b-col cols="2"> 
                                    <div>                                        
                                    <b-button size="sm" :disabled="order==='value'" variant="secondary" @click="sortByValue"><b-icon font-scale="1" icon="sort-alpha-down" /></b-button>    
                                    </div>
                                </b-col>
                            </b-row>         
                        </th>
                        <th scope="col">
                            <b-row>
                                <b-col>
                                    <p style="display:inline-block;" class="mb-0">Count</p> 
                                </b-col>
                                <b-col cols="2"> 
                                    <div>                                        
                                    <b-button size="sm" :disabled="order==='count'" variant="secondary" @click="sortByCount"><b-icon font-scale="1" icon="sort-down" /></b-button>    
                                    </div>
                                </b-col>
                            </b-row>         
                        </th>    
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="facet in localFacetField.facets"  :key="facet.value">
                        <td>
                            <b-form-checkbox
                            style="display:inline-block;"
                            v-model="status"
                            :value="facet.value"
                            unchecked-value="not_accepted"
                            >
                            </b-form-checkbox>
                            <span class="m-facet-value">{{facet.value}}</span>
                        </td>
                        <td><span style="font-size: small;">{{facet.count}}</span></td>
                    </tr>
                </tbody>
            </table>
            



            <template #modal-footer>       
                <b-button @click="includeSelected()">
                    Include selected
                </b-button>
                <b-button>
                    Exclude selected
                </b-button>       
                <b-button
                    variant="primary"
                    class="float-right"
                    @click="moreFacet=false"                 
                >
                    Close
                </b-button>
            </template>

        </b-modal>
    </div>
</template>

<script>
export default {
    name:"facetsCollapse",
    props: ['facetField'],
    data(){
        return{
            localFacetField: this.facetField,
            order:"count",
            status: [],
            fields: [
                {
                    key: 'value',
                    label: 'Value',
                    sortable: true
                },
                {
                    key: 'count',
                    label: 'Count',
                    sortable: true
                },
                ],
            moreFacet:false,
            selected:[],
            visible:true,
            facetName:{
                nameType:'Type of name',
                taxonomicStatus:'Taxonomic status',
                taxonRank:'Taxon rank',
                occurrenceStatus:'Occurrence status',
                establishmentMeans:'Establishment means',
                threatStatus:'Threat status',
                class:'Class',
                subclass:'Subclass',
                superorder:'Superorder',
                order:'Order',
                family:'Family',
                ibra7Subregion:'Subregion',
                nrmRegion:'Bioregion',
                media:'Media',
            },

        }
    },
    methods:{
        // includeSelected: function () {
        //     this.$emit("includeSelected");
        // },
        sortByValue:function(){
            this.localFacetField.facets = this.localFacetField.facets.slice().sort((a, b) => {
                let fa = a.value.toLowerCase(),
                fb = b.value.toLowerCase();
                if (fa < fb) {
                return -1;
                }
                if (fa > fb) {
                return 1;
                }
                return 0;
            })
            this.order = 'value'
        },
        sortByCount:function(){
             this.localFacetField.facets = this.localFacetField.facets.slice().sort((a, b) => {
                let fa = a.count,
                fb = b.count;
                if (fa < fb) {
                return 1;
                }
                if (fa > fb) {
                return -1;
                }
                return 0;
            })
            this.order = 'count'
        },
        applySelected:function(){        
            let key = this.localFacetField.fieldName.replace(/([A-Z])/g,"_$1").toLowerCase()
            let facetQueryString = []
            for(let i=0;i<this.selected.length;i++){
                facetQueryString.push(`${key}:${this.selected[i]}`)
            }
            // ["name_type:scientific","taxonomic_status:synonym","taxonomic_status:accepted"]
            if(typeof(this.$route.query.fq) === 'object'){
                // console.log("object")
                // console.log(this.$route.query.fq)
                this.$router.push({
                    path:"/flora/search",
                    query: {
                    ...this.$route.query,
                    fq: Array.from(new Set([...this.$route.query.fq, ...facetQueryString]))
                    }
                });
            }else if(typeof(this.$route.query.fq) === 'string'){
                this.$router.push({
                    path:"/flora/search",
                    query: {
                    ...this.$route.query,
                    fq: Array.from(new Set([this.$route.query.fq, ...facetQueryString]))
                    }
                });
            }else{
                this.$router.push({
                    path:"/flora/search",
                    query: {
                    ...this.$route.query,
                    fq: facetQueryString,
                    }
                });
            }
            
        },
    },
    watch:{

    },
    computed:{
        q: function(){
            return this.$route.query.q
        },
        fq:function(){
            return this.$route.query.fq
        },
    }
}
</script>