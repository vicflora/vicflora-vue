<style lang="scss" scoped>
@import "./Table-of-content.scss";
</style>
<template>
  <div v-if="toc.length" class="w-full lg:w-1/4 block relative m-toc">
    <div
      class="lg:sticky lg:top-16 overflow-y-auto h-full lg:h-auto lg:max-h-(screen-16)"
    >
      <nav>
        <scrollactive
          highlight-first-item
          active-class="m-active"
          :offset="8"
          tag="nav"
        >
          <li
            v-for="link of toc"
            :key="link.id"
            class="text-gray-700 dark:text-gray-300"
            :class="{
              'border-t border-dashed dark:border-gray-800 first:border-t-0':
               link.depth === 2
            }"
          >
            <a
              :href="`#${link.id}`"
              class="block text-sm scrollactive-item transition-padding ease-in-out duration-300 hover:pl-1 m-hover"
              :class="{
                'py-2': link.depth === 2,
                'ml-2 pb-2': link.depth === 3,
                'ml-3 pb-2': link.depth === 4,
                'ml-4 pb-2': link.depth === 5,
                'ml-5 pb-2': link.depth === 6
              }"
              >{{ link.text }}</a
            >
          </li>
        </scrollactive>
      </nav>
    </div>
  </div>
  <!-- <ul>
    <li
      v-for="link of toc"
      :key="link.id"
      :class="{ 'toc2': link.depth === 2, 'toc3': link.depth === 3 }"

    >
      <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
    </li>
  </ul> -->
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
  components: {
  },
  data() {
    return {
      markdown: {}
    };
  }
};
</script>
