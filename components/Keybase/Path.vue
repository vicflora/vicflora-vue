<template>
  <div class="keybase-player-path">
    <h3>Path</h3>
    <div>
      <ol v-if="path">
        <li v-for="lead in path" :key="lead.lead_id">
          <a :href="`#l_${ lead.lead_id }`">{{ lead.lead_text }}</a>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
export default {
  props: ['path']
}
</script>
