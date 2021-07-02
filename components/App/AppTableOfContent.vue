<template>
  <div class="m-toc-container">
    <div class="m-content">
      <p>NAVIGATION</p>
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
          v-for="link of newToc"
          :key="link.id"
        >
          <a
            :class="{
              'm-invisible': invisible(link),
              'text-red-500 hover:text-red-600': link.id === currentlyActiveToc,
              'text-black hover:gray-900': link.id !== currentlyActiveToc
            }"
            role="button"
            class="transition-colors duration-75 text-base mb-2 block"
            :href="`#${link.id}`"
            >{{ link.text }}</a
          >
        </li>
      </ul>
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
      newToc: [],
      currentlyActiveToc: "",
      observer: null,
      observerOptions: {
        root: this.$refs.nuxtContent,
        threshold: 0
      }
    };
  },
  mounted() {
    // restucture the toc array
    let parents = [];
    this.newToc = [];
    for (let item of this.toc) {
      this.newToc.push(JSON.parse(JSON.stringify(item)));
    }
    let level = 2;
    for (let item of this.newToc) {
      if (item.depth > level) {
        level = item.depth;
        item["parents"] = [...parents];
        parents.push(item.id);
      } else {
        while (parents.length >= item.depth - 1) {
          parents.pop();
        }

        level = item.depth;
        item["parents"] = [...parents];
        parents.push(item.id);
      }
    }

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
      .querySelectorAll(".nuxt-content h2[id], .nuxt-content h3[id]")
      .forEach(section => {
        this.observer.observe(section);
      });
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  methods: {
    tableOfContentsHeadingClick(link) {
      this.currentlyActiveToc = link.id;
    },
    invisible(link) {
      if (link.parents.length === 0) {
        return false;
      }
      for (let item of this.currentlyActiveTocParents) {
        if (link.parents.includes(item)) {
          return false;
        }
      }

      return true;
      // for(let item of link.parents){
      //   if(this.currentlyActiveTocParents.includes(item)){
      //     return false
      //   }
      // }
    }
  },
  computed: {
    currentlyActiveTocParents: function() {
      for (let item of this.newToc) {
        if (item.id === this.currentlyActiveToc) {
          return item.parents;
        }
      }
      return [];
    }
  }
};
</script>

<style lang="scss" scoped>
.m-toc-container {
  text-align: left;
  list-style: none;
  padding-left: 8px;
  height: 100vh;
  
  p {
    margin-bottom: 4px;
    font-family: "goodsans-medium";
  }

  .m-content {
    padding-left: 10px;
    margin-bottom: 4px;
    position: fixed;
    border-left: 1px solid #eee;
  }
}

.m-toc {
  text-align: left;
  list-style: none;
  padding-left:0px;
  padding-top: 2px;
}

.m-active {
    font-weight:bold;
}

.m-hover:hover {
    font-weight:bold;
}

.m-invisible{
  display: none;
}
</style>

