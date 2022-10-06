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
  <div class="login">
    <div v-if="$store.getters['isLoggedIn']">
      <NuxtLink to="/user">{{ $store.state.user.name }}</NuxtLink>
      | <a href="/logout" @click.prevent="logout">Logout</a>
    </div>
    <div v-else>
      <nuxt-link to="/login" class="login-link">Login</nuxt-link>
    </div>
  </div>
</template>

<script>
import gql from "graphql-tag"
import AuthenticatedUserQuery from '@/graphql/queries/AuthenticatedUserQuery'

export default {
  name: 'TheLoginBar',
  apollo: {
    user: {
      query: AuthenticatedUserQuery,
      skip: true,
      result({ data, loading }) {
        if (!loading) {
          this.$store.dispatch('storeUser', data.user)
        }
      }
    },
  },
  created() {
    const token = this.$apolloHelpers.getToken()
    if (token) {
      this.$store.dispatch('storeToken', token)
      this.$apollo.queries.user.skip = false
    }
  },
  methods: {
    logout() {
      this.$apolloHelpers.onLogout()
      this.$store.dispatch('logout')
      this.$router.push('/login')
    }
  }
}
</script>