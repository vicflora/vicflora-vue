<template>
  <div class="form-group">
    <label :for="name">{{label}}</label>
    <textarea
      class="form-control"
      :id="name"
      :name="name"
      :value="value"
      :placeholder="placeholder"
      :rows="rows"
      @input="onInput"
    />
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
