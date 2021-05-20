<template>
  <div class="container">
    <div class="keybase-container" data-key-id="8099">
      <div class="row">
        <div class="col-md-12">
          <ol class="breadcrumb">
            <li v-if="taxonomicScope && taxonomicScope.id">
                <nuxt-link :to="{ name: 'taxa', params: { taxon: taxonomicScope.id } }">{{ taxonomicScope.item_name }}</nuxt-link>
            </li>
            <li v-if="parentKey">
              <nuxt-link :to="{ name: 'keys', params: { key: parentKey.id } }">{{ parentKey.title }}</nuxt-link>
            </li>
          </ol>
          <h1 class="key-title">{{ title }}</h1>
          <div class="vicflora-tab clearfix">

            <!-- Nav tabs -->
            <ul class="nav nav-tabs" role="tablist">
              <li role="presentation" class="active">
                <a href="#tab_player" aria-controls="player" role="tab" data-toggle="tab">Interactive key</a>
              </li>
              <li role="presentation">
                <a href="#tab_bracketed" aria-controls="bracketed" role="tab" data-toggle="tab">Bracketed key</a>
              </li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="tab_player">
                <keybase-player
                  :currentNode="currentNode"
                  :kbPath="kbPath"
                  :remainingItems="remainingItems"
                  :discardedItems="discardedItems"
                ></keybase-player>
              </div>
              <div role="tabpanel" class="tab-pane" id="tab_bracketed">
                <bracketed-key
                  :bracketedKey="bracketedKey"
                  :items="items"
                ></bracketed-key>
              </div>
            </div>

          </div> <!-- /role:tabpanel -->
          <div class="keybase-key-source"></div>
          <div class="keybase-link text-right">
            <a href="" target="_blank">Open key in KeyBase <i class="fa fa-external-link"></i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import KeybasePlayer from '@/components/Keybase/KeybasePlayer'
import BracketedKey from '@/components/Keybase/BracketedKey'

require('./keybase')

export default {
  components: {
    KeybasePlayer,
    BracketedKey
  },
  data() {
    return {
      items: false,
      leads: false,
      root: false,
      currentNode: false,
      kbPath: false,
      remainingItems: false,
      discardedItems: false,
      bracketedKey: false
    }
  },
  computed: {
    ...mapState({
      title: state => {
        if (state.key) {
          return state.key.key_title
        }
      },
      taxonomicScope(state) {
        let tscope
        if (state.key) {
          tscope = state.key.taxonomic_scope
          if (tscope.url) {
            tscope.id = tscope.url.substr(tscope.url.lastIndexOf('/') + 1)
          }
          else if (typeof state.key.parent !== 'undefined') {
            tscope = state.key.parent.taxonomic_scope
            tscope.id = tscope.url.substr(tscope.url.lastIndexOf('/') + 1)
          }
        }
        return tscope
      },
      parentKey(state) {
        let parent
        if (state.key) {
          if (typeof state.key.parent !== 'undefined') {
            parent = state.key.parent
          }
        }
        return parent
      }
    })
  },
  methods: {
    getKey(keyID) {

      $('.keybase-link a').attr('href', 'http://keybase.rbg.vic.gov.au/keys/show/' + keyID)
      var wsUrl = 'https://data.rbg.vic.gov.au/keybase-ws'
    
      $.prototype.keybase('player', {
        baseUrl: wsUrl + "/ws/key_get",
        playerDiv: '#keybase-player',
        key: keyID,
        title: false,
        reset: true,
        // playerWindow: function() {},
        // currentNodeDisplay: function() {},
        // pathDisplay: function() {},
        // remainingItemsDisplay: function() {},
        // discardedItemsDisplay: function() {},
        // bracketedKeyDisplay: null,
        // onJson: this.onJson,
        // onLoad: this.getBracketedKey,
        // onNextCouplet: this.onNextCouplet,
        // bracketedKeyDiv: null
      })
      console.log("1111111111111")
    },
    onNextCouplet() {
      this.currentNode = $.prototype.keybase.getters.currentNode()
      this.kbPath = $.prototype.keybase.getters.path()
      this.remainingItems = $.prototype.keybase.getters.remainingItems()
      this.discardedItems = $.prototype.keybase.getters.discardedItems()
    },
    onJson() {
      let json = $.prototype.keybase.getters.jsonKey()
      let keyInStore = this.$store.state.key
      if (keyInStore && keyInStore.taxonomic_scope.url) {
        json.parent = {
          id: keyInStore.key_id,
          title: keyInStore.key_title,
          taxonomic_scope: keyInStore.taxonomic_scope
        }
      }
      this.$store.dispatch('storeKey', json)
      this.items = json.items
      this.leads = json.leads
      this.root = json.first_step.root_node_id
    },
    getBracketedKey() {
      $.prototype.keybase('bracketedKey', {
        bracketedKeyDiv: '#keybase-bracketed',
        onBracketedKey: this.onBracketedKey,
        bracketedKeyDisplay: function() {},
        reset: false
      })
    },
    onBracketedKey() {
      this.bracketedKey = $.prototype.keybase.getters.bracketedKey()[0]
    }
  },
  watch: {
    '$route.params.key'() {
      this.getKey(this.$route.params.key)
    }
  },
  mounted() {
    this.getKey(this.$route.params.key)
    // drag events from KeyBase
    $('.keybase-player-window').on('mousedown', '.keybase-player-drag-leftright',
        $.prototype.keybase.dragLeftRight)
    $('.keybase-player-leftpane').on('mousedown', '.keybase-player-drag-updown',
        $.prototype.keybase.dragUpDownLeftPane)
    $('.keybase-player-rightpane').on('mousedown', '.keybase-player-drag-updown',
        $.prototype.keybase.dragUpDownRightPane)
    $(document).mouseup(function(e){
      $(document).unbind('mousemove')
    })
  }
}

</script>
