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

    <taxon-name-protologue-modal :protologue="value" />

  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"
import TaxonNameProtologueModal from './TaxonNameProtologueModal.vue'

export default {
  components: { TaxonNameProtologueModal },
  name: 'TaxonNameProtologueInput',
  mixins: [
    formControlPropsMixin,
  ],
  created() {
    this.$nuxt.$on('modal-closed', (modal) => {
      if (modal = 'taxon-name-protologue-modal') {
        this.hideModal()
      }
    })
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    },
  },
}

</script>
