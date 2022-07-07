<template>
  <div class="highlights">
    <div class="m-highlight-title">
      <p>NEWS</p>
    </div>

    <BRow 
      v-for="item in highlights" 
      :key="item.path" 
      class="m-highlight"
    >
      <BCol 
        cols="3" 
        class="m-highlight-col"
      >
        <BImg 
          :src="item.thumbnail" 
          fluid 
          class="m-highlight-image" 
          alt=""
        />
      </BCol>
      <BCol 
        cols="9" 
        class="m-highlight-col"
      >
        <h5 
          class="m-hightlight-1" 
          v-html="item.title"
        ></h5> 
        <div>{{ item.description }}..... <NuxtLink :to="getRoute(item.path)">Read more...</NuxtLink></div>
      </BCol>
    </BRow>
  </div>
</template>

<script>
export default {
  name: "TheHighlights",
  props: {
    highlights: {
      type: Array,
      required: true
    }
  },
  methods: {
    getRoute(path) {
      let to = path.replace('posts', 'news')
      for (var i=0; i<3; i++) {
        to = to.replace('-', '/')
      }
      return to
    },
  },
}
</script>

<style lang="scss">
@import "~/assets/scss/custom_variables.scss";

</style>

