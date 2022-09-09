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
        <b-card no-body id="reset-password-form">
          <b-card-header><h5>Reset password</h5></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="resetPassword">
              <b-form-group 
                id="input-group-1" 
                label="Password:" 
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.password"
                  placeholder="Enter password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group 
                id="input-group-2" 
                label="Password:" 
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.password_confirmation"
                  placeholder="Confirm password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
            </b-form>
          </b-card-body>
        </b-card>
        <div 
          v-if="message"
          class="alert alert-success"
        >
          {{ message }}
        </div>
        <div 
          v-if="alert"
          class="alert alert-danger"
        >
          {{ alert }}
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<router>
  {
    path: '/password/reset/:token'
  }
</router>

<script>
import gql from "graphql-tag"

const updateForgottenPasswordMutation = gql`mutation (
    $email: String!,
    $token: String!,
    $password: String!,
    $password_confirmation: String!
  ) {
  updateForgottenPassword(input: {
    email: $email,
    token: $token,
    password: $password,
    password_confirmation: $password_confirmation
  }) {
    status
    message
  }
}`

export default {
  name: "ResetPassword",
  data() {
    return {
      form: {
        password: null,
        password_confirmation: null,
      },
      message: null,
      alert: null,
    }
  },
  methods: {
    resetPassword() {
      this.$apollo.mutate({
        mutation: updateForgottenPasswordMutation,
        variables: {
          email: this.$route.query.email,
          token: this.$route.params.token,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
        },
      }).then(({data}) => {
        console.log(data)
        this.message = data.updateForgottenPassword.message
      }).catch(error => {
        this.alert = 'something went wrong: ' + error
      })
    }
  }
}
</script>
