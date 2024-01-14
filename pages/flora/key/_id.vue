<template>
  <div class="container m-keybase">
    <div class="keybase-container" data-key-id="8099">
      <ol class="breadcrumb">
        <li v-if="taxonomicScope && taxonomicScope.id">
          <nuxt-link
            :to="{ name: 'flora-taxon-id', params: { id: taxonomicScope.id } }"
            >{{ taxonomicScope.item_name }}</nuxt-link
          >
        </li>
        <li v-if="parentKey">
          <nuxt-link
            :to="{ name: 'keys', params: { key: parentKey.id } }"
            >{{ parentKey.title }}</nuxt-link
          >
        </li>
      </ol>
      <h3 class="key-title mt-1 mb-4">{{ title }}</h3>

      <!-- Tab panes -->

      <b-tabs content-class="mt-3">
        <b-tab title="Interactive key" active>
          <keybase-player
            :currentNode="currentNode"
            :kbPath="kbPath"
            :remainingItems="remainingItems"
            :discardedItems="discardedItems"
          ></keybase-player
        ></b-tab>
        <b-tab title="Bracketed key">
          <bracketed-key
            :bracketedKey="bracketedKey"
            :items="items"
            :leads="leads"
          ></bracketed-key>
        </b-tab>
      </b-tabs>
    </div>

    <!-- /role:tabpanel -->
    <div class="keybase-key-source mt-2 m-keybase-key-source"></div>
    <div 
      v-if="$store.getters['isLoggedIn']"
      class="keybase-link text-right w-100 mb-4 mt-2 m-keybase-link"
    >
      <a href="" target="_blank">Open key in KeyBase <small><b-icon-box-arrow-up-right/></small></a>
    </div>
  </div>
</template>

<script>
const KeybasePlayer = () => import("@/components/Keybase/KeybasePlayer");
const BracketedKey = () => import("@/components/Keybase/BracketedKey");
import identificationKeyQuery from "@/graphql/queries/identificationKeyQuery"

require("./keybase");

export default {
  name: 'KeyPage',
  components: {
    KeybasePlayer,
    BracketedKey
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient;
    const { id } = params;
    try {
      const res = await client.query({
        query: identificationKeyQuery,
        variables: {
          id: id,
        },
      })

      const { identificationKey } = res.data
      const pageTitle = `VicFlora: ${identificationKey.title}`
      const structuredData = {
        "@context": "http://schema.org",
        "@type": "WebPage",
        headline: pageTitle,
        description: `This page provides a pathway key to the members of 
                ${identificationKey.taxonomicScope} that occur in Victoria. 
                The key is provided both in the form of an interactive key 
                player and as a bracketed key.`.replace(/\s+/g, ' '),
        datePublished: identificationKey.created,
        dateModified: identificationKey.modified,
        publisher: {
          '@type': 'Organization',
          name: 'Royal Botanic Gardens Victoria',
          url: 'https://www.rbg.vic.gov.au',
        },
        license: "https://creativecommons.org/licenses/by/4.0/",
        keywords: [ 'botany', 'identification', 'key', 'Australia', 'Victoria', identificationKey.taxonomicScope ],
      }

      return {
        pageTitle,
        structuredData,
      }
    }
    catch(error) {
      return error
    }
  },
  data() {
    return {
      key: null,
      items: false,
      leads: false,
      root: false,
      currentNode: false,
      kbPath: false,
      remainingItems: false,
      discardedItems: false,
      bracketedKey: false,
      bracketedKeyDisplay: false,
      pageTitle: "VicFlora",
      structuredData: {},
    };
  },
  head() {
    return {
      __dangerouslyDisableSanitizers: ['script'],
      title: this.pageTitle,
      script: [{ innerHTML: JSON.stringify(this.structuredData), type: 'application/ld+json' }],
    }
  },
  computed: {
    // ...mapState({
    title() {
      if (this.key) {
        return this.key.key_title;
      }
    },
    taxonomicScope() {
      let tscope;
      if (this.key) {
        tscope = this.key.taxonomic_scope;
        if (tscope.url) {
          tscope.id = tscope.url.substr(tscope.url.lastIndexOf("/") + 1);
        } else if (typeof this.key.parent !== "undefined") {
          tscope = this.key.parent.taxonomic_scope;
          tscope.id = tscope.url.substr(tscope.url.lastIndexOf("/") + 1);
        }
      }
      return tscope;
    },
    parentKey() {
      let parent;
      if (this.key) {
        if (typeof this.key.parent !== "undefined") {
          parent = this.key.parent;
        }
      }
      return parent;
    }
    // })
  },
  watch: {
    "$route.params.id"() {
      this.getKey(this.$route.params.id);
    }
  },
  mounted() {
    $nuxt.$emit('progress-bar-start')
    this.getKey(this.$route.params.id);
    // drag events from KeyBase
    $(".keybase-player-window").on(
      "mousedown",
      ".keybase-player-drag-leftright",
      $.prototype.keybase.dragLeftRight
    );
    $(".keybase-player-leftpane").on(
      "mousedown",
      ".keybase-player-drag-updown",
      $.prototype.keybase.dragUpDownLeftPane
    );
    $(".keybase-player-rightpane").on(
      "mousedown",
      ".keybase-player-drag-updown",
      $.prototype.keybase.dragUpDownRightPane
    );
    $(document).mouseup(function(e) {
      $(document).unbind("mousemove");
    });
  },
  methods: {
    getKey(keyID) {
      $(".keybase-link a").attr(
        "href",
        "http://keybase.rbg.vic.gov.au/keys/show/" + keyID
      );
      var wsUrl = "https://data.rbg.vic.gov.au/keybase-ws";

      $.prototype.keybase("player", {
        baseUrl: wsUrl + "/ws/key_get",
        playerDiv: "#keybase-player",
        key: keyID,
        title: false,
        reset: true,
        playerWindow: function() {},
        currentNodeDisplay: function() {},
        pathDisplay: function() {},
        remainingItemsDisplay: function() {},
        discardedItemsDisplay: function() {},
        bracketedKeyDisplay: function() {},
        resultDisplay: function() {},
        onJson: this.onJson,
        onLoad: this.getBracketedKey,
        onNextCouplet: this.onNextCouplet,
        bracketedKeyDiv: null
      });
    },
    onNextCouplet() {
      this.currentNode = $.prototype.keybase.getters.currentNode();
      this.kbPath = $.prototype.keybase.getters.path();
      this.remainingItems = $.prototype.keybase.getters.remainingItems();
      this.discardedItems = $.prototype.keybase.getters.discardedItems();
    },
    onJson() {
      $nuxt.$emit('progress-bar-stop')
      let json = $.prototype.keybase.getters.jsonKey();
      let keyInStore = this.key;
      if (keyInStore && keyInStore.taxonomic_scope.url) {
        json.parent = {
          id: keyInStore.key_id,
          title: keyInStore.key_title,
          taxonomic_scope: keyInStore.taxonomic_scope
        };
      }
      this.key = json;
      this.items = json.items;
      this.leads = json.leads;
      this.root = json.first_step.root_node_id;
    },
    getBracketedKey() {
      $.prototype.keybase("bracketedKey", {
        bracketedKeyDiv: "#keybase-bracketed",
        onBracketedKey: this.onBracketedKey,
        bracketedKeyDisplay: this.displayBracketedKey,
        reset: false
      });
    },
    onBracketedKey() {
      this.bracketedKey = $.prototype.keybase.getters.bracketedKey()[0];
      //
    },
    displayBracketedKey(){
      $.prototype.keybase.defaults.bracketedKeyDisplay(this.key)
    }
  },
}
</script>
