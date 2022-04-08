<template>
  <div>
    <div 
      v-if="show"
      class="form-group"
    >
      <label :for="name">{{label}}</label>
      <textarea
        class="form-control"
        :id="name"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :rows="rows"
        :disabled="disabled"
        @input="onInput"
      />
      <small 
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>
    </div>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'AppTextareaControl',
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
