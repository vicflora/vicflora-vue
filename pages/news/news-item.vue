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
  <article class="container static-content">
    <header class="m-title">
      <h1>{{ markdown.title }}</h1>
    </header>
    <!-- content -->
    <BRow>
      <BCol align-self="start" cols="9" class="text-left">
        <p>
          <FontAwesomeIcon icon="calendar-days"/> {{ created }}
        </p>
        <nuxt-content
          id="scrollspy-nested"
          :document="markdown"
          class="m-content"
        />
      </BCol>
      <!-- <BCol align-self="start" cols="3">
        <RecentPosts :recentPosts="posts"/>
      </BCol> -->
    </BRow>
  </article>
</template>

<router>
{
  path: '/news/:year/:month/:day/:slug'
}
</router>

<script>
const RecentPosts = () => import('@/components/News/RecentPosts')

export default {
  name:"NewsItem",
  components: {
    RecentPosts,
  },
  async asyncData({ $content, params}) {
    const markdown = await $content(`posts/${params.year}-${params.month}-${params.day}-${params.slug}`).fetch()
    const posts = await $content('posts')
    .only(['title', 'created'])
    .sortBy('created', 'desc')
    .limit(5)
    .fetch()

    return { markdown, posts }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
    created() {
      const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
      }

      const createDate = new Date(this.markdown.created)
      return createDate.toLocaleString('en-AU', options)
    }
  }
}
</script>

