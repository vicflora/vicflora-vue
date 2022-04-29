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
          v-if="success"
          class="alert alert-success"
        >
          {{ success }}
        </div>
        <div 
          v-else-if="error"
          class="alert alert-danger"
        >
          {{ error }}
        </div>
        <b-card no-body id="registration-form">
          <b-card-header><h5>Register</h5></b-card-header>
          <b-card-body>
            <b-form @submit.prevent="register">
              <b-form-group
                id="input-group-1"
                label="Name:"
                label-for="input-1"
              >
                <b-form-input
                  id="input-1"
                  v-model="form.name"
                  type="text"
                  placeholder="Enter name"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                id="input-group-2"
                label="Email address:"
                label-for="input-2"
              >
                <b-form-input
                  id="input-2"
                  v-model="form.email"
                  type="email"
                  placeholder="Enter email"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group 
                id="input-group-3" 
                label="Password:" 
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

              <b-form-group 
                id="input-group-4" 
                label="Password:" 
                label-for="input-4"
              >
                <b-form-input
                  id="input-4"
                  v-model="form.password_confirmation"
                  placeholder="Confirm password"
                  type="password"
                  required
                ></b-form-input>
              </b-form-group>

              <b-button 
                type="submit" 
                variant="primary"
              >
                Submit
              </b-button>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template></template>

<script>
import registerMutation from '@/graphql/mutations/registerMutation'
import linkUserToAgentMutation from '@/graphql/mutations/linkUserToAgentMutation'
import { LinkToUserInput } from '@/models/AgentModel'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      user: null,
      success: null,
      error: null,
    }
  },
  beforeCreate() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push('/')
    }
  },
  created() {
    this.$nuxt.$on('user-registered', user => {
      this.linkUserToAgent(user)
    })
  },
  beforeDestroy() {
    this.$nuxt.$off('user-registered')
  },
  methods: {
    register() {
      const vm = this
      console.log(JSON.stringify({input: this.form}, null, 2))
      this.$apollo.mutate({
        mutation: registerMutation,
        variables: {
          input: this.form
        }
      }).then(({ data }) => {
        console.log(JSON.stringify(data, null, 2))
        this.linkUserToAgent(data.register.tokens.user)
        this.success = 'Registration successful'
      }).catch((error) => {
        console.error(error)
        this.error = 'Registration failed'
      })
    },
    linkUserToAgent(user) {
      const input = new LinkToUserInput(user)
      this.$apollo.mutate({
        mutation: linkUserToAgentMutation,
        variables: {
          input: input,
        },
      }).then(({data}) => {
        console.log(JSON.stringify(data, null, 2))
      })
    }
  },
}
</script>

<style lang="scss">
#registration-form {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>