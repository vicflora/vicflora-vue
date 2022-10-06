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
  <div class="multi-access-keys">
    <div class="container">
      <div class="row">
        <div class="col">
          <h1>Multi-access keys</h1>
          <ul v-if="multiAccessKeys">
            <li v-for="key in multiAccessKeys" :key="key.id">
              <nuxt-link :to="{
                name: 'multi-access-keys-id',
                params: {
                  id: key.id
                }
              }">
                {{ key.title }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiAccessKeysQuery from '@/graphql/queries/MultiAccessKeysQuery'

export default {
  name: 'MultiAccessKeysIndexPage',
  data() {
    return {
      multiAccessKeys: null,
      error: null,
    }
  },
  apollo: {
    multiAccessKeys: {
      query: MultiAccessKeysQuery,
      result({ data, loading }) {
        if (!loading) {
          this.multiAccessKeys = data.multiAccessKeys
        }
      },
      error(error) {
        this.error = error
      },
      skip: true,
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.$store.getters['isLoggedIn']) {
        vm.$router.push({
          name: 'flora-matrix-keys'
        })
      }
    })
  },
  created() {
    this.$apollo.queries.multiAccessKeys.skip = false
  }
}
</script>