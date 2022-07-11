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
        <div>
          <BlogArticleExcerpt :excerpt="item.description"/> 
          <BlogArticleLink :path="item.path"/>
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script>
const BlogArticleExcerpt = () => import('@/components/Blog/BlogArticleExcerpt')
const BlogArticleLink = () => import('@/components/Blog/BlogArticleLink')

export default {
  name: "TheHighlights",
  components: {
    BlogArticleExcerpt,
    BlogArticleLink,
  },
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

