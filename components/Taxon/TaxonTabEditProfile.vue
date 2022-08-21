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
    <b-row>
      <b-col>
        <ProfileForm :value="currentProfile"/>
        <h3>History</h3>
        <div v-if="profiles" class="accordion" role="tablist">
          <TaxonProfile
            v-for="(profile, index) in profiles"
            :key="profile.id"
            :index="index"
            :profile="profile"
          />
        </div>
      </b-col>
    </b-row>
</template>

<script>
const TaxonProfile = () => import('@/components/Taxon/TaxonProfile')
const ProfileForm = () => import('@/components/Forms/ProfileForm')

import gql from "graphql-tag"
const taxonConceptProfilesQuery = gql`query ($id: ID!) {
  profiles: taxonConceptProfiles(taxonConceptId: $id) {
    id
    version
    source {
      id
      author {
        id
        name
      }
      publicationYear
      referenceStringHtml
    }
    taxonConcept {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    acceptedConcept {
      id
      taxonName {
        id
        fullName
        authorship
      }
    }
    createdAt
    createdBy {
      id
      name
    }
    profile
  }
}`

export default {
  name: 'TaxonTabEditProfile',
  components: {
    TaxonProfile,
    ProfileForm,
  },
  data() {
    return {
      profiles: [],
      currentProfile: {},
    }
  },
  apollo: {
    profiles: {
      query: taxonConceptProfilesQuery,
      skip: true,
      result({ data, loading }) {
        if (!loading) {
          if (data.profiles.length) {
            this.currentProfile = data.profiles[0]
          }
        }
      }
    }
  },
  created() {
    this.$apollo.queries.profiles.setVariables({
      id: this.$route.params.id
    })
    this.$apollo.queries.profiles.skip = false

    this.$nuxt.$on('profile-updated', () => {
      this.$apollo.queries.profiles.refetch()
    })
    this.$nuxt.$on('profile-deleted', () => {
      this.$apollo.queries.profiles.refetch()
    })
  }
}
</script>

