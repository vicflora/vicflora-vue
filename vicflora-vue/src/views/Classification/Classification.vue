<style lang="scss" scoped>
@import "./Classification.scss";
</style>

<template>
    <div>
        <b-container class="m-container">
            <b-row>
                <b-col class="text-left">
                    <div class="m-title">
                        <h2>
                            Classification
                        </h2>
                    </div>
                </b-col>   
            </b-row>
            <ClassificationComponent></ClassificationComponent>
        </b-container>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import ClassificationComponent from '../../components/Classification-component/Classification-component'
export default {
    name: "Classification",
    components: {
        ClassificationComponent
    },
    data(){
        return {
        }
    },
    //Apollo-specific options
    fragments: {
        taxonConceptFields: gql`
            fragment taxonConceptFields on TaxonConcept {
                id
                taxonName {
                    id
                    fullName
                    authorship
                }
            }`
    },  
}
</script>