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
      @click.prevent="onChangePasswordClicked"
    >
      Change password
    </a>&emsp;
    <b-modal 
      id="change-password-modal" 
      title="Change password"
      @ok="changePassword"
    >
      <b-form-group 
        id="input-group-5" 
        label="Old password:" 
        label-for="input-5"
      >
        <b-form-input
          id="input-5"
          v-model="form.old_password"
          placeholder="Enter password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group 
        id="input-group-3" 
        label="New password:" 
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.password"
          placeholder="Enter password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-input
        id="input-4"
        v-model="form.password_confirmation"
        placeholder="Confirm password"
        type="password"
        required
      ></b-form-input>
    </b-modal>
  </div>
</template>

<script>
import updatePasswordMutation from '@/graphql/mutations/updatePasswordMutation'

export default {
  name: "ChangePasswordModal",
  data() {
    return {
      form: {},
      message: null,
    }
  },
  methods: {
    onChangePasswordClicked() {
      this.message = null
      this.form = {}
      this.$bvModal.show('change-password-modal')
    },
    changePassword() {
      this.$apollo.mutate({
        mutation: updatePasswordMutation,
        variables: {
          input: this.form,
        },
      }).then(({data}) => {
        $nuxt.$emit('password-updated', data.updatePassword.message)
      })
    }
  }
}
</script>