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
          :value="value[serializerField]"
          :placeholder="placeholder"
          disabled
          @input="onInput"
        />
        <span 
          v-if="subform"
          class="input-group-append"
        >
          <AppButtonAppend
            :form="subform"
            :button="'update'"
            :value="value"
          />
        </span>
      </div>
      <small 
        v-if="description"
        class="vf-form-control-description"
      >{{ description }}</small>
    </div>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

const AppButtonAppend = () => import("@/components/FormControls/AppButtonAppend")

export default {
  name: 'AppTextInputSubform',
  components: {
    AppButtonAppend,
  },
  mixins: [
    formControlPropsMixin,
  ],
  props: {
    subform: {
      type: String,
      required: true,
    },
    serializerField: {
      type: String,
      required: true,
    },
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.value)
    }
  }
}

</script>
