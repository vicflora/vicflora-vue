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
  <div class="vf-profile">
    <p role="tab" :class="index ? 'previous' : 'current'">
      <a 
        v-b-toggle="`accordion-${index}`"
      >
        <span class="when-open"><font-awesome-icon icon="caret-down" size="lg"/></span>
        <span class="when-closed"><font-awesome-icon icon="caret-right" size="lg"/></span>
        {{ profile.id }} – {{ profile.createdBy.name }}, {{ profile.createdAt.substring(0, 10) }}
      </a>
    </p>
    <b-collapse :id="`accordion-${index}`" accordion="profile-accordion" role="tabpanel">
      <div v-html="profile.profile"/>
      <div class="vf-profile-meta">
        <div 
          v-if="profile.source" 
          class="source"
          v-html="profile.source.citationHtml"
        />
        <div v-if="profile.taxonConcept.id !== profile.acceptedConcept.id">
          <b>As:</b> {{ profile.taxonConcept.taxonName.fullName }}
        </div>
        <div>
          <b>Created: </b> {{ profile.createdAt.substring(0, 10)}}, {{ profile.createdBy.name }}
          <BButton 
            variant="danger" 
            size="sm"
            class="vf-profile-delete float-right"
            @click="onDeleteButtonClicked(profile)"
          ><BIconTrash/></BButton>
        </div>
      </div>
    </b-collapse>

  </div>
</template>

<script>
import gql from "graphql-tag"
const DeleteProfileMutation = gql`mutation ($id: ID!) {
  deleteProfile(id: $id) {
    id
  }
}`

export default {
  name:'TaxonProfile',
  props: {
    index: {
      type: Number,
      required: true,
    },
    profile: {
      type: Object,
      required: true,
    },
  },
  methods: {
    onDeleteButtonClicked(profile) {
      const msg = `Delete profile ${profile.id}?`
      this.$bvModal.msgBoxConfirm(msg)
          .then(value => {
            if (value) {
              this.deleteProfile(profile)
            }
          })
    },
    deleteProfile(profile) {
      this.$apollo.mutate({
        mutation: DeleteProfileMutation,
        variables: {
          id: this.profile.id
        }
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        this.$nuxt.$emit('profile-deleted')
      })
    }
  }
}
</script>