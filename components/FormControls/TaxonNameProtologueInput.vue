<template>
  <div>
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{label}}</label>
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          :id="name"
          :name="name"
          :value="value.citation"
          :placeholder="placeholder"
          :disabled="disabled"
        />
        <b-button 
          variant="primary" 
          size="sm"
          v-b-modal.taxon-name-protologue-form
        >
          <font-awesome-icon icon="pen-to-square"/>
        </b-button>
      </div>
      <small 
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>

      <taxon-name-protologue-form :protologue="value" />
    </div>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"
import TaxonNameProtologueForm from '@/components/Forms/TaxonNameProtologueForm'

export default {
  components: { 
    TaxonNameProtologueForm,
  },
  name: 'TaxonNameProtologueInput',
  mixins: [
    formControlPropsMixin,
  ],
  created() {
    this.$nuxt.$on('modal-closed', (modal) => {
      if (modal = 'taxon-name-protologue-form') {
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
