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
    <ProfileFormGenerator 
      :schema="schema"
      :value="formData"
      @input="onInput"
    />
    <div class="text-right">
      <BButton @click="onCancel">Cancel</BButton>
      <BButton
        variant="primary"
        :disabled="updateDisabled"
        @click="onUpdate"
      >Update profile</BButton>
      <BButton
        variant="primary"
        :disabled="createVersionDisabled"
        @click="onCreateVersion"
      >Create new version</BButton>
      <BButton
        variant="primary"
        :disabled="createProfileDisabled"
        @click="onCreateProfile"
      >Create new profile</BButton>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import schema from '@/config/profileFormSchema'
import { Profile, UpdateProfileInput, CreateProfileInput } from '@/models/ProfileModel'
import { formMethodsMixin } from '@/mixins/formMixins'

const ProfileFormGenerator = () => import('@/components/Forms/ProfileFormGenerator')

const updateProfileMutation = gql`mutation ($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    version
    source {
      id
      author {
        id
        name
      }
      publicationYear
      citationHtml
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
    isUpdated
    isCurrent
    profile
  }
}`

const createProfileMutation = gql`mutation ($input: CreateProfileInput!) {
  createProfile(input: $input) {
    id
    version
    source {
      id
      author {
        id
        name
      }
      publicationYear
      citationHtml
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
    isUpdated
    isCurrent
    profile
  }
}`

export default {
  name: 'ProfileForm',
  components: {
    ProfileFormGenerator
  },
  mixins: [
    formMethodsMixin,
  ],
  props: {
    value: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      formData: null,
      updateDisabled: true,
      createVersionDisabled: true,
      createProfileDisabled: true,
    }
  },
  computed: {
    schema() {
      return schema
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(value) {
        this.formData = new Profile(value)
        if (value.source) {
          this.showHideField('source', true)
          this.showHideField('acceptedConcept', true)
        }
        else {
          this.showHideField('source', false)
          this.showHideField('acceptedConcept', false)
        }
      }
    }
  },
  created() {
    this.$nuxt.$on('profile-form-input', (fieldName, value) => {
      if (fieldName === 'acceptedConcept' 
          && value !== this.value.acceptedConcept.id) {
        this.updateDisabled = true
        this.createProfileDisabled = true
      }
    })
  },
  methods: {
    onInput() {
      this.updateDisabled = false
      this.createVersionDisabled = false
      this.createProfileDisabled = false
    },
    onCancel() {
      this.formData = new Profile(this.value)
    },
    onUpdate() {
      const input = new UpdateProfileInput(this.formData)
      this.$apollo.mutate({
        mutation: updateProfileMutation,
        variables: {
          input: {...input},
        },
      }).then(({ data }) => {
        this.$nuxt.$emit('profile-updated')
      })
    },
    onCreateVersion() {
      const input = new CreateProfileInput(this.formData)
      console.log(JSON.stringify(input, null, 2))
      this.$apollo.mutate({
        mutation: createProfileMutation,
        variables: {
          input: input
        }
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        this.$nuxt.$emit('profile-updated')
      })
    },
    onCreateProfile() {
      console.log('Create new profile')
      const input = new CreateProfileInput(this.formData)
      input.source = null
      input.id = null
      this.$apollo.mutate({
        mutation: createProfileMutation,
        variables: {
          input: input
        }
      }).then(({ data }) => {
        this.$nuxt.$emit('profile-updated')
      })
    }
  }
}
</script>