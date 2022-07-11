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
        <BlogDateCreated :dateCreated="markdown.created"/>
        <NuxtContent
          id="scrollspy-nested"
          :document="markdown"
          class="m-content"
        />
        <BlogCategories :categories="markdown.categories"/>
      </BCol>
      <!-- table of content -->
      <BCol align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </BCol>
    </BRow>
  </article>
</template>

<router>
{
  path: '/articles/:year/:month/:day/:slug'
}
</router>

<script>
const BlogDateCreated = () => import('@/components/Blog/BlogDateCreated')
const BlogCategories = () => import('@/components/Blog/BlogCategories')

export default {
  name:"Article",
  components: {
    BlogDateCreated,
    BlogCategories,
  },
  async asyncData({ $content, params}) {
    const markdown = await $content(`articles/${params.year}-${params.month}-${params.day}-${params.slug}`).fetch()
    return { markdown }
  },
  data() {
    return {
      content: ""
    };
  },
}
</script>

