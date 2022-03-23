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
  <h2>User's info</h2>
</template>

<script>
import gql from "graphql-tag"

export default {
  auth: true,
  meta: {
    title: 'dark',
  },
  data() {
    return {
      users: null,
    }
  },
  apollo: {
    users: {
      query: gql`query {
        users {
          data {
            id
            name
            email
          }
        }
      }`,
      skip: true,
    },
  },
  created() {
    this.$apollo.queries.users.skip = false
    console.log(this.$nuxt)
  }
}
</script>