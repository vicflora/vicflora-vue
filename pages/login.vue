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
          v-if="alert"
          class="alert alert-danger"
        >
          {{ alert }}
        </div>
        <b-card no-body id="login-form">
          <b-card-header><h5>Login</h5></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="login">
              <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.username"
                  type="email"
                  placeholder="Enter email"
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
                  v-model="form.password"
                  placeholder="Enter password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button type="submit" variant="primary">Submit</b-button>
              &emsp;<nuxt-link to="/password/reset">Forgot passsword</nuxt-link>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import LoginMutation from '@/graphql/mutations/LoginMutation'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      alert: null,
    }
  },
  methods: {
    login() {
      this.$apollo.mutate({
        // Query
        mutation: LoginMutation,
        variables: {
          username: this.form.username,
          password: this.form.password,
        },
      }).then((data) => {
        console.log(data)
        this.$apolloHelpers.onLogin(data.data.login.access_token)
        this.$store.dispatch('storeToken', data.data.login.access_token)
        this.$store.dispatch('storeUser', data.data.login.user)
        this.$router.push('/')
      }).catch((error) => {
        // Error
        this.alert = 'Authentication failed. There is no account with the supplied credentials'
        console.error(error)
        // We restore the initial user input
      })
    },
  },
}
</script>