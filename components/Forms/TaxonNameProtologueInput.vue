<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :id="name"
        :name="name"
        :value="value.citation"
        :placeholder="placeholder"
        disabled
      />
      <b-button 
        variant="primary" 
        size="sm"
        v-b-modal.taxon-name-protologue-modal
      >
        <font-awesome-icon icon="pen-to-square"/>
      </b-button>
    </div>

    <b-modal
      id="taxon-name-protologue-modal"
      title="Protologue"
      size="lg"
    >
      <taxon-name-protologue-form :protologue="value" />
    </b-modal>

  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"
import TaxonNameProtologueForm from './TaxonNameProtologueForm.vue'

export default {
  components: { TaxonNameProtologueForm },
  name: 'TaxonNameProtologueInput',
  mixins: [
    formControlPropsMixin,
  ],
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}

</script>
