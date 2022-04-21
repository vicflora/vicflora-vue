<!--
 Copyright 2022 Royal Botanic Gardens Board
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
     http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
-->

<template>
  <div>
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{ label }}</label>
      <div class="vf-autocomplete-wrapper">
        <vue-typeahead-bootstrap
          v-model="query"
          id="name"
          :placeholder="placeholder"
          class="mb-12"
          :data="suggestions"
          :serializer="item => autocomplete.serializer(item)"
          :maxMatches="100"
          :disabled="disabled"
          @hit="onSelected"
          @input="suggest"
        >
          <template 
            v-if="autocomplete.suggestionField"
            slot="suggestion" 
            slot-scope="{ data }"
          >
            <div 
              class="vf-autocomplete-suggestion"
              v-html="data[autocomplete.suggestionField]"
            />
          </template>
        </vue-typeahead-bootstrap>
        <span
            v-if="buttons"
            class="vf-autocomplete-append"
        >
          <span
            v-for="button in buttons"
              :key="button"
            >
            <ButtonAppend
              v-if="button === 'create' || selectedSuggestion.id !== undefined"
              :button="button"
              :form="form"
              :value="button === 'update' && selectedSuggestion ? selectedSuggestion : {}"
            />
          </span>
        </span>
      </div>
      <small 
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>
      <div
        v-if="autocomplete.showSelected && selectedSuggestion" 
        v-html="selectedSuggestion[autocomplete.suggestionField]"
        class="vf-autocomplete-selected"
      />

    </div>
  </div>
</template>

<script>
const VueTypeaheadBootstrap = () => import("vue-typeahead-bootstrap")
const ButtonAppend = () => import("@/components/FormControls/AppButtonAppend")

import { formControlPropsMixin, subformButtonPropsMixin } from "@/mixins/formMixins"
import { debounce } from "lodash"

export default {
  name: 'AppAutocompleteControl',
  components: {
    VueTypeaheadBootstrap,
    ButtonAppend,
  },
  mixins: [
    formControlPropsMixin,
    subformButtonPropsMixin,
  ],
  props: {
    autocomplete: {
      type: Object,
    },
  },
  data() {
    return {
      query: '',
      suggestions: [],
      selectedSuggestion: null,
    }
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler() {
        if (this.value) {
          this.query = this.autocomplete.serializer(this.value)
          this.selectedSuggestion = this.value
        }
      }
    }
  },
  mounted() {
    const inputGroup = this.$el.querySelector('.input-group')
    const appendix = this.$el.querySelector('.input-group-append')
    // if (appendix) {
    //   inputGroup.appendChild(appendix)
    // }
    
  },
  methods: {
    suggest: debounce(function() {
      this.$apollo.addSmartQuery('suggestions', {
        query: this.autocomplete.query,
        variables: {
          q: this.query
        },
      })
    }),
    onSelected(event) {
      this.selectedSuggestion = event
      this.$emit('input', event)
    },
  }
}
</script>

<style lang="scss">
.vf-autocomplete-wrapper {
  position: relative;

  .vf-autocomplete-append {
    position: absolute;
    right: 0;
    bottom: 0;
    height: 38px;
    z-index: 10;
  }

}

.vf-autocomplete-selected {
  margin-top: 0.5rem;
}
</style>