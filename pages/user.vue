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
    <b-row align-h="center">
      <b-col cols="4">
        <div 
          v-if="message"
          class="alert alert-success text-center"
          role="alert"
        >
          {{ message }}
        </div>
        <b-card no-body id="user-info">
          <b-card-header><h5>User</h5></b-card-header>
          <b-card-body>
            <div v-if="user">
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="user.name"
                  type="text"
                  readonly
                  class="form-control-plaintext"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="user.email"
                  type="email"
                  readonly
                  class="form-control-plaintext"
                ></b-form-input>
              </b-form-group>
            </div>
            <p class="text-right">
              <a
                href="" 
                @click.prevent="onChangePasswordClicked"
              >
                Change password
              </a>
            </p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
    <b-modal 
      id="change-password-modal" 
      title="Change password"
      @ok="onOk"
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
  name: 'User',
  data() {
    return {
      form: {},
      message: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    onChangePasswordClicked() {
      this.message = null
      this.form = {}
      this.$bvModal.show('change-password-modal')
    },
    onOk() {
      this.$apollo.mutate({
        mutation: updatePasswordMutation,
        variables: {
          input: this.form,
        },
      }).then(({data}) => {
        this.message = data.updatePassword.message
      })
    }
  }
}
</script>

<style lang="scss">
#user-info {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>