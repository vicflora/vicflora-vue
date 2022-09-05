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
  <b-card-group deck>
    <b-card
      v-for="card in cards" 
      :key="card.title"
      :title="card.title"
      title-tag="h1"
      :img-src="card.image"
      img-alt=""
      img-top
      tag="article"
    >
      <p 
        v-for="link in card.links" 
        :key="link.text"
        class="vf-card-link"
      >
        <NuxtLink :to="link.to">{{ link.text }} <FontAwesomeIcon icon="caret-right"/></NuxtLink>
      </p>
    </b-card>
  </b-card-group>     
</template>

<script>
export default {
  name: "AppCardDeck",
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
}
</script>