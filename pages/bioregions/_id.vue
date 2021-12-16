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
        <NuxtContent :document="markdown" class="m-content" id="scrollspy-nested"></NuxtContent>
      </BCol>
      <!-- table of content -->
      <BCol align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script>
import TableOfContent from "@/components/App/AppTableOfContent";
export default {
  name:"Bioregions",
  components: {
    TableOfContent
  },
  async asyncData({ $content, params }) {
    const markdown = await $content("statics/bioregions", params.id).fetch();
    return { markdown };
  },
  data() {
    return {
      handbook: "",
      content: ""
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
    }
  },
  mounted() {
    let list = [];
    for (let word of this.$route.params.id.split("-")) {
      list.push(word.replace(word[0], word[0].toUpperCase()));
    }
    this.title = list.join(" ");
  }
}
</script>

<style lang="scss" scoped>
.m-static::v-deep {
  @import "bioregions-static.scss";
}
</style>
