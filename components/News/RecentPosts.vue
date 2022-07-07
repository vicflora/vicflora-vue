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
  <div id="recent-posts">
    <h2>Recent posts</h2>
    <ul v-if="recentPosts.length">
      <li 
        v-for="post in recentPosts"
        :key="post.path"
      >
        <NuxtLink :to="getRoute(post.path)">
          {{ post.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RecentPosts",
  props: {
    recentPosts: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getRoute(path) {
      let to = path.replace('posts', 'news')
      for (var i=0; i<3; i++) {
        to = to.replace('-', '/')
      }
      return to
    }
  },
}
</script>

<style lang="scss" scoped>
ul {
  padding-left: 0;
  list-style-type: none;
}
</style>