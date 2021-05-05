<style lang="scss" scoped>
.m-static::v-deep {
  @import "bioregions-static.scss";
}
</style>
<template>
  <b-container class="m-static">
    <!-- title -->
    <b-row>
      <b-col class="mt-4 mb-2 m-title">
        <h2>{{ markdown.title }}</h2>
      </b-col>
    </b-row>
    <!-- content -->
    <b-row>
      <b-col align-self="start" cols="9">
        <markdown class="text-left">
          <nuxt-content :document="markdown" class="m-content" />
        </markdown>
      </b-col>
      <!-- table of content -->
      <b-col align-self="start" cols="3">
        <TableOfContent :toc="markdown.toc"></TableOfContent>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import TableOfContent from "@/components/Table-of-content/Table-of-content";
export default {
  components: {
    TableOfContent
  },
  async asyncData({ $content, params }) {
    // fetch our md here
    const markdown = await $content("statics/bioregions", params.id).fetch();
    console.log(markdown.toc)
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
};
</script>
