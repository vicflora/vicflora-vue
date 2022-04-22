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
      class="form-check"
    >
      <input
        type="checkbox"
        class="form-check-input"
        :id="name"
        :name="name"
        :checked="value"
        :disabled="disabled"
        @input="onInput"
      />
      <label 
        class="form-check-label" 
        :for="name"
      >{{label}}</label>
    </div>
    <small 
      v-if="description"
      class="vf-form-control-description"
    >{{ description }}</small>
  </div>
</template>

<script>
import { formControlPropsMixin } from "@/mixins/formMixins"

export default {
  name: 'AppCheckboxInput',
  mixins: [
    formControlPropsMixin,
  ],
  props: {
    value: {
      type: Boolean, // overwrites prop in mixin
      required: false,
    }
  },
  methods: {
    onInput(event) {
      this.$emit('input', event.target.checked)
    }
  }
}
</script>

<style lang="scss" scoped>
.form-check {
  margin-bottom: 1rem;
}
</style>
