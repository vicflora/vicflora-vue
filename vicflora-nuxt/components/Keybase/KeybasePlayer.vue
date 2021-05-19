<template>
  <div id="keybase-player" class="keybase-panel">
    <div class="keybase-player-window">
      <div class="keybase-player-leftpane">
        <current-node :currentNode="currentNode"></current-node>
        <div class="keybase-player-drag-updown"></div>
        <kb-path :path="kbPath"></kb-path>
      </div>
      <div class="keybase-player-drag-leftright"></div>
      <div class="keybase-player-rightpane">
        <remaining-items :remainingItems="remainingItems"></remaining-items>
        <div class="keybase-player-drag-updown"></div>
        <discarded-items :discardedItems="discardedItems"></discarded-items>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentNode from './CurrentNode'
import Path from './Path'
import RemainingItems from './RemainingItems'
import DiscardedItems from './DiscardedItems'

export default {
  components: {
    CurrentNode,
    "kb-path": Path,
    RemainingItems,
    DiscardedItems
  },
  props: ['currentNode', 'kbPath', 'remainingItems', 'discardedItems'],
}
</script>
