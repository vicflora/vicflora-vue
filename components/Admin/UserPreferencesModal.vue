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
  <div>
    <a
      href=""
      @click.prevent="onUserPreferencesClicked"
    >
      Preferences
    </a>
    <b-modal 
      id="user-preferences-modal" 
      title="User preferences"
      @ok="updatePreferences"
    >
      <div 
        v-if="error"
        class="alert alert-danger text-center"
        role="alert"
      >
        {{ error }}
      </div>

      <b-form-group
        id="input-group-1"
        label="Default publication status:"
        label-for="input-1"
      >
        <b-form-select 
          v-model="defaultPublicationStatus" 
          :options="options"
        ></b-form-select>
      </b-form-group>
    </b-modal>
  </div>  
</template>

<script>
import UpdateUserPreferencesMutation 
    from '@/graphql/mutations/UpdateUserPreferencesMutation'

export default {
  name: "UserPreferencesModal",
  data() {
    return {
      defaultPublicationStatus: '',
      options: [
        { value: 'PUBLISHED', text: 'published'},
        { value: 'DRAFT', text: 'draft'},
      ],
      error: null,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
  },
  methods: {
    onUserPreferencesClicked() {
      this.defaultPublicationStatus = this.user.preferences.defaultPublicationStatus
      this.$bvModal.show('user-preferences-modal')
    },
    updatePreferences(bvModalEvent) {
      bvModalEvent.preventDefault()
      const input = {
        user: {
          connect: this.user.id
        },
        defaultPublicationStatus: this.defaultPublicationStatus
      }
      console.log(input)
      this.$apollo.mutate({
        mutation: UpdateUserPreferencesMutation,
        variables: {
          input: input
        }
      }).then(({data}) => {
        console.log(data)
        this.$store.dispatch('updateUserPreferences', {
          defaultPublicationStatus: this.defaultPublicationStatus
        })
        $nuxt.$emit('user-preferences-updated', 
            `Default publication status updated to 
            '${this.defaultPublicationStatus}'`)
        this.$bvModal.hide('user-preferences-modal')
      }).catch(error => {
        $nuxt.$emit('user-preferences-update-fail', error)
      })
    },
  }
}
</script>