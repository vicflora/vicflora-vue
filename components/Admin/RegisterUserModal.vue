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
      @click.prevent="onRegisterUserClicked"
    >
      Register new user
    </a>
    <b-modal 
      id="register-user-modal" 
      title="Register new user"
      @ok="register"
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

        <!-- <template #modal-footer="{ cancel }">
          <b-button @click="cancel()">
            Cancel
          </b-button>
          <b-button variant="primary" @click="register()">
            OK
          </b-button>
        </template> -->
    </b-modal>
  </div>
</template>

<script>
import registerMutation from '@/graphql/mutations/registerMutation'
import linkUserToAgentMutation from '@/graphql/mutations/linkUserToAgentMutation'
import { LinkToUserInput } from '@/models/AgentModel'

export default {
  name: "RegisterUserModal",
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      user: null,
      error: null,
    }
  },
  methods: {
    onRegisterUserClicked() {
      this.message = null
      this.form = {}
      this.$bvModal.show('register-user-modal')
    },
    register(bvModalEvent) {
      bvModalEvent.preventDefault()
      console.log(JSON.stringify({input: this.form}, null, 2))
      this.$apollo.mutate({
        mutation: registerMutation,
        variables: {
          input: this.form
        }
      }).then(({ data }) => {
        this.linkUserToAgent(data.register.tokens.user)
        $nuxt.$emit('user-registered', 'Registration successful')
        this.$bvModal.hide('register-user-modal')
      }).catch((error) => {
        this.error = error
      })
    },
    linkUserToAgent(user) {
      const input = new LinkToUserInput(user)
      this.$apollo.mutate({
        mutation: linkUserToAgentMutation,
        variables: {
          input: input,
        },
      })
    }
  },
}
</script>