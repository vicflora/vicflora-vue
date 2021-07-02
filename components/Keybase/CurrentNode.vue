<template>
  <div class="keybase-player-currentnode">
    <h3>Current node<span class="keybase-player-menu">
      <span class="keybase-player-stepback"><a href="" title="Step back"><i class="fa fa-undo fa-lg fa-lg"></i></a></span>
      <span class="keybase-player-startover"><a href="" title="Start over"><i class="fa fa-refresh fa-lg fa-lg"></i></a></span></span>
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
