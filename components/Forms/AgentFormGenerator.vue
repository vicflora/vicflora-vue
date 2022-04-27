<template>
  <form>
    <component
      v-for="(field, index) in schema"
      :key="index"
      :is="field.fieldType"
      v-bind="field"
      :value="formData[field.name]"
      :mode="mode"
      @input="onInput(field.name, $event)"
      @selected="onSelected"
    />
  </form>
</template>

<script>
const SelectList = () => import("@/components/FormControls/AppSelectList")
const TextInput = () => import('@/components/FormControls/AppTextInput')
const GroupPersonsSubform = () => import('@/components/Forms/GroupPersonsSubform')

export default {
  name: "AgentFormGenerator",
  components: { 
    SelectList, 
    TextInput,
    GroupPersonsSubform,
  },
  props: {
    schema: Array,
    value: Object,
    mode: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formData: this.value || {},
      hide: false
    }
  },
  watch: {
    value() {
      this.formData = this.value
    }
  },
  methods: {
    onInput(fieldName, value) {
      this.$set(this.formData, fieldName, value)
      this.$emit("input", fieldName, value)
    },
    onSelected(item) {
      this.$emit('selected', item)
    },
  },
  watch: {
    value() {
      this.formData = this.value
    },
  },
}
</script>
