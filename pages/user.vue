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
          :class="classes"
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

            <p class="text-right user-page-links">
              <ChangePasswordModal />&emsp;
              <RegisterUserModal />
            </p>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
const ChangePasswordModal = () => import('@/components/Admin/ChangePasswordModal')
const RegisterUserModal = () => import('@/components/Admin/RegisterUserModal')

export default {
  name: 'User',
  components: {
    ChangePasswordModal,
    RegisterUserModal,
  },
  data() {
    return {
      message: null,
      classes: {
        'alert': true,
        'alert-success': true,
        'alert-danger': false,
        'text-center': true
      }
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  created() {
    this.$nuxt.$on('password-updated', message => {
      this.classes['alert-success'] = true
      this.classes['alert-danger'] = false
      this.message = message
    })

    this.$nuxt.$on('user-registered', message => {
      this.classes['alert-success'] = true
      this.classes['alert-danger'] = false
      this.message = message
    })

    this.$nuxt.$on('user-registration-fail', error => {
      this.classes['alert-success'] = false
      this.classes['alert-danger'] = true
      this.message = error
    })
  }
}
</script>

<style lang="scss">
#user-info {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.user-page-links>div {
  display: inline-block;
}
</style>