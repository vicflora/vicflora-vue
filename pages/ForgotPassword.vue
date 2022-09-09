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
        <b-card no-body id="forgot-password-form">
          <b-card-header><h5>Request password reset link</h5></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="emailPasswordResetLink">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
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
    path: '/password/reset'
  }
</router>

<script>
import gql from "graphql-tag"

const forgotPasswordMutation = gql`mutation ($email: String!) {
  forgotPassword(input: {
    email: $email
  }) {
    status
    message
  }
}
`

export default {
  name: "ForgotPassword",
  data() {
    return {
      form: {
        email: '',
      },
      message: null,
      alert: null,
    }
  },
  methods: {
    emailPasswordResetLink() {
      this.message = null
      this.alert = null
      this.$apollo.mutate({
        mutation: forgotPasswordMutation,
        variables: {
          email: this.form.email,
        },
      }).then(({data}) => {
        this.message = data.forgotPassword.message
      }).catch(error => {
        this.alert = 'Something went wrong...'
      })
    }
  }
}
</script>