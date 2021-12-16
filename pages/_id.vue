<template>
  <BContainer class="m-static">
    <!-- title -->
    <BRow>
      <BCol class="mt-4 mb-2 m-title">
        <h2>{{ markdown.title }}</h2>
      </BCol>
    </BRow>
    <!-- content -->
    <BRow>
      <BCol align-self="start" cols="9" class="text-left">
        <nuxt-content
          id="scrollspy-nested"
          :document="markdown"
          class="m-content"
        />
      </BCol>
      <!-- table of content -->
      <BCol align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import TableOfContent from "@/components/App/AppTableOfContent"
export default {
  name:"Help",
  components: {
    TableOfContent
  },
  async asyncData({ $content, params }) {
    const markdown = await $content(`statics/${params.id.toLowerCase()}`).fetch()
    return { markdown }
  },
  data() {
    return {
      content: ""
    };
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.m-static::v-deep {
  .m-title {
      text-align: left;
      h2 {
          font-family: 'goodsans-medium';
      }
  }

  .m-content{
      img {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 100%;
      }
  }
}
</style>
