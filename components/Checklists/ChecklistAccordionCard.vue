<template>
  <BCard
    no-body
    class="mb-1"
  >
    <BCardHeader
      header-tag="header"
      class="p-1"
      role="tab"
    >
      <BButton
        block
        v-b-toggle="`accordion-${index}`"
        :variant="visible ? 'primary' : 'light'"
      >
        {{ layer.name }}
      </BButton>
    </BCardHeader>
    <BCollapse
      :id="`accordion-${index}`"
      :visible="visible"
      accordion="checklist-layer-accordion"
      role="tabpanel"
      @shown="onShown"
    >
      <BCardBody>
        <BCardText>
          <ul v-if="areas">
            <li
                v-for="(item, index) in areas"
                :key="item.id"
            >
              <a v-if="index" href="#" @click.stop="onAreaClicked(item.properties.name)">{{ item.properties.label }}</a>
              <span v-else>{{ item.properties.label }}</span>
            </li>
          </ul>
          <ul v-else-if="visible && areaFromRoute">
            <li>{{ areaFromRoute }}</li>
          </ul>
        </BCardText>
      </BCardBody>
    </BCollapse>
  </BCard>
</template>

<script>
export default {
  name: "ChecklistAccordionCard",
  props: {
    layer: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true
    },
    areas: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    areaFromRoute() {
      if ('q' in this.$route.query && this.$route.query.q !== undefined && this.$route.query.q !== '-*:*') {
        let q = this.$route.query.q
        return q.substring(q.indexOf(':')+1).replace(/"/g, '')
      }
      return false
    }
  },
  methods: {
    onShown() {
      $nuxt.$emit('accordion-collapse-shown', this.layer.name)
    },
    onAreaClicked(areaName) {
      $nuxt.$emit('accordion-area-clicked', this.layer.searchField, areaName)
    }
  }
}
</script>
