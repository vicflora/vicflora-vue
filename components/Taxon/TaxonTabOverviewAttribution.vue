<template>
  <div class="profile-attribution">
    <!-- Source -->
    <div
      v-if="concept.currentProfile.source"
      class="m-row"
    >
      <span class="profile-attribution-label">Source: </span>
      <span
        class="profile-source-citation"
        v-html="concept.currentProfile.source.citationHtml"
      ></span>
    </div>
    <!-- Created time -->
    <div
      v-else-if="concept.currentProfile.creator && concept.currentProfile.created"
      class="m-row"
    >
        <span class="profile-attribution-label">Created by: </span>
        <span >{{concept.currentProfile.creator.firstName }}
          {{ concept.currentProfile.creator.lastName }},
          {{ formatDateString(concept.currentProfile.created) }}
        </span>
    </div>
      <!-- Updated info -->
    <div
      v-if="concept.currentProfile.updatedBy && concept.currentProfile.modified"
      class="m-row"
    >
      <span class="profile-attribution-label">Updated by: </span>
      <span >{{concept.currentProfile.updatedBy.firstName }}
        {{ concept.currentProfile.updatedBy.lastName }},
        {{ formatDateString(concept.currentProfile.modified) }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TaxonTabOverviewAttribution",
  props: {
    concept: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDateString( iso ) {
      const date = new Date(iso)
      const [year, month, day] = [date.getFullYear(), date.getMonth(), date.getDate()]

      const months = [
        'Jan.',
        'Feb.',
        'Mar.',
        'Apr.',
        'May',
        'Jun.',
        'Jul.',
        'Aug.',
        'Sep.',
        'Oct.',
        'Nov.',
        'Dec.',
      ]

      return `${day} ${months[month]} ${year}`

    }
  },
}
</script>

<style lang="scss">
.profile-attribution {
  .profile-attribution-label {
    font-weight: bold;
  }

  .profile-source-citation {
    &>strong:first-child {
      font-weight: normal;
    }
  }

}
</style>
