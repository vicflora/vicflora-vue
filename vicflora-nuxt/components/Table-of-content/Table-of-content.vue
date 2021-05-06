<style lang="scss" scoped>
@import "./Table-of-content.scss";
</style>
<template>
  <div v-if="toc.length" class="m-toc">
    <div>
      <nav>
        <ul class="m-toc">
          <li
            @click="tableOfContentsHeadingClick(link)"
            :class="{
              'pl-2': link.depth === 3,
              'pl-3': link.depth === 4,
              'pl-4': link.depth === 5,
              'pl-5': link.depth === 6
            }"
            class="m-hover"
            v-for="link of toc"
            :key="link.id"
          >
            <a
              :class="{
                'text-red-500 hover:text-red-600':
                  link.id === currentlyActiveToc,
                'text-black hover:gray-900': link.id !== currentlyActiveToc
              }"
              role="button"
              class="transition-colors duration-75 text-base mb-2 block"
              :href="`#${link.id}`"
              >{{ link.text }}</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableOfContent",
  props: {
    toc: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      currentlyActiveToc: "",
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0
      }
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(entries => {
      for (let entry of entries) {
        const id = entry.target.getAttribute("id");
        if (entry.isIntersecting) {
          this.currentlyActiveToc = id;
          break;
        }
      }
    }, this.observerOptions);

    // Track all sections that have an `id` applied
    document
      .querySelectorAll(
        ".nuxt-content h2[id], .nuxt-content h3[id], .nuxt-content h4[id], .nuxt-content h5[id]"
      )
      .forEach(section => {
        this.observer.observe(section);
      });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  async asyncData({ $content }) {
    const article = await $content("main").fetch();

    return {
      article
    };
  },
  methods: {
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id;
    }
  }
};
</script>
