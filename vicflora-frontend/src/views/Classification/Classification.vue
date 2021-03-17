<style lang="scss" scoped>
@import "./Classification.scss";
</style>

<template>
    <div>
        <b-container>
            <b-row>
                <div class="m-title">
                    <h2>
                        Classification
                    </h2>
                </div>
            </b-row>
                <div>
                    {{taxonConcept}}
                </div>
            <b-row>

            </b-row>
        </b-container>
    </div>
</template>

<script>

import gql from 'graphql-tag'
export default {
    name: "Classification",
    data(){
        return {
            taxonConcept: '',
            id: '32066',
        }
    },
    //Apollo-specific options
    fragments: {
        taxonConceptFields: gql`
            fragment taxonConceptFields on TaxonConcept {
                id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
            }`
    },
    apollo: {
    // Query with parameters
        taxonConcept: {
            // gql query
            query: gql`
                query taxonConceptQuery($id: ID!) {
                    taxonConcept(id: $id) {
                        id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
                        parent {
                        id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
                        }
                        children {
                        id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
                        }
                        siblings {
                        id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
                        }
                        higherClassification {
                        id
                        depth
                        taxonConcept {
                            id
                guid
                taxonName {
                    id
                    fullName
                    authorship
                }
                            taxonTreeDefItem {
                            id
                            name
                            }
                        }
                        }
                        taxonomicStatus {
                        id
                        name
                        }
                    }
                    }
            `,
            // Static parameters
            variables() {
                // Use vue reactive properties here
                return {
                    id: this.id,
                }
            },
        },
    },
    computed: {
    },
    

}
</script>