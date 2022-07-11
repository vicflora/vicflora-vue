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
  <p class="blog-categories">
    <FontAwesomeIcon icon="tag"/>
    <span v-for="category, index in categories" :key="category">
      <NuxtLink :to="`/articles/categories/${category.toLowerCase().replaceAll(' ', '-')}`">
        {{ category }}</NuxtLink><span v-if="index < categories.length - 1">,</span>
    </span>
  </p>
</template>

<script>
export default {
  name: "BlogCategories",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
}
</script>