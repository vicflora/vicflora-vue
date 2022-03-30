<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div class="taxon-name-form">
    <TaxonNameFormGenerator 
      :schema="schema"
      :value="formData"
    />
  </div>
</template>

<script>
import schema from "@/config/taxonNameFormSchema"
import TaxonName from "@/models/TaxonNameModel"
import TaxonNameFormGenerator from '@/components/Forms/TaxonNameFormGenerator.vue'

import gql from "graphql-tag"
const taxonNameQuery = gql`query TaxonNameQuery($id: ID!) {
  value: taxonName(id: $id) {
    id
    fullName
    authorship
    protologue {
      id
      title
      volume
      issue
      pages
      publicationYear
      citation
    }
  }
}`

export default {
  name: "TaxonNameForm",
  components: {
    TaxonNameFormGenerator,
  },
  props: {
    taxonNameProp: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      value: {}
    }
  },
  computed: {
    formData() {
      return new TaxonName(this.value || {})
    },
    schema() {
      return schema
    }
  },
  created() {
    this.$apollo.addSmartQuery('value', {
      query: taxonNameQuery,
      variables: {
        id: this.taxonNameProp.id
      },
    })
  }

}
</script>