<template>
  <div class="keybase-player-currentnode">
    <h3>Current node
      <span class="keybase-player-menu">
        <b-button 
          variant="outline-primary"
          size="sm"
          class="keybase-player-stepback"
        >
          <nuxt-link to="#" title="Step back">
            <font-awesome-icon icon="arrow-rotate-left"/>
          </nuxt-link>
        </b-button>
        <b-button 
          variant="outline-primary"
          size="sm"
          class="keybase-player-startover"
        >
          <nuxt-link to="#" title="Start over">
            <font-awesome-icon icon="rotate"/>
          </nuxt-link>
        </b-button>
      </span>
    </h3>
    <div>
      <ul v-if="currentNode">
        <li v-for="lead in currentNode" :key="lead.lead_id">
          <a class="keybase-lead" :href="`#l_${ lead.lead_id }`">{{ lead.lead_text }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['currentNode']
}
</script>
