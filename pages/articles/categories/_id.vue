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
  <BContainer>
    <BRow>
      <BCol>
        <header class="page-header">
          <h2>{{ category }}</h2>
        </header>
        <article 
          v-for="article in articles"
          :key="article.path"
        >
          <h3>
            <BlogArticleLink 
              :path="article.path"
              :title="article.title"
            />
          </h3>
          <BlogDateCreated :dateCreated="article.created"/>
          <p>
            <BlogArticleExcerpt 
              :excerpt="article.description"
              :length="80"
            />
            <BlogArticleLink :path="article.path"/>
          </p>
          <BlogCategories :categories="article.categories"/>
        </article>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
const BlogArticleExcerpt = () => import('@/components/Blog/BlogArticleExcerpt')
const BlogArticleLink = () => import('@/components/Blog/BlogArticleLink')
const BlogDateCreated = () => import('@/components/Blog/BlogDateCreated')
const BlogCategories = () => import('@/components/Blog/BlogCategories')

export default {
  name: "Category",
  components: {
    BlogArticleExcerpt,
    BlogArticleLink,
    BlogDateCreated,
    BlogCategories,
  },
  async asyncData({ $content, params }) {
    const category = params.id.slice(0, 1).toUpperCase() + params.id.slice(1).replaceAll('-', ' ')

    const articles = await $content('articles')
      .only(['title', 'description', 'path', 'created', 'categories'])
      .where({ categories: { $contains: category }})
      .sortBy('created', 'desc')
      .limit(3)
      .fetch()
    
    return { category, articles }
  },
}
</script>