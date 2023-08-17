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
          <multi-access-key
            v-if="multiAccessKey"
            :multiAccessKey="multiAccessKey"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MultiAccessKeyQuery from '@/graphql/queries/MultiAccessKeyQuery'

const MultiAccessKey = () =>
    import('@/components/MultiAccessKey/MultiAccessKey')

export default {
  name: 'MultiAccessKeyPage',
  components: {
    MultiAccessKey,
  },
  data() {
    return {
      multiAccessKey: null,
      error: null,
    }
  },
  apollo: {
    multiAccessKey: {
      query: MultiAccessKeyQuery,
      result({ data, loading }) {
        if (!loading) {
          this.multiAccessKey = data.multiAccessKey
        }
      },
      error(error) {
        this.error = error
      },
      skip: true,
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   next(vm => {
  //     if (!vm.$store.getters['isLoggedIn']) {
  //       vm.$router.push({
  //         name: 'flora-matrix-keys'
  //       })
  //     }
  //   })
  // },
  created() {
    this.$apollo.queries.multiAccessKey.setVariables({id: this.$route.params.id})
    this.$apollo.queries.multiAccessKey.skip = false
  },
}
</script>

<style lang="scss">
.multi-access-keys {
  margin-top: 2rem;
}
</style>
