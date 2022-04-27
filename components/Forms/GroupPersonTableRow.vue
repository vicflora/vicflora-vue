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
  <tr>
    <td>{{ member.sequence }}</td>
    <td>{{ member.member.name }}</td>
    <td style="width:130px;text-align:right;">
      <BButton 
        variant="primary" 
        size="sm"
        :disabled="!moveUp"
        @click="onMoveUpButtonClicked"
      >
        <FontAwesomeIcon icon="caret-up"/>
      </BButton>
      <BButton 
        variant="primary" 
        size="sm"
        :disabled="!moveDown"
        @click="onMoveDownButtonClicked"
      >
        <FontAwesomeIcon icon="caret-down"/>
      </BButton>
      <BButton 
        variant="primary" 
        size="sm"
        @click="onRemoveGroupPersonButtonClicked"
      >
        <FontAwesomeIcon icon="minus"/>
      </BButton>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'GroupPersonTableRow',
  props: {
    member: {
      type: Object,
      required: true,
    },
    moveUp: {
      type: Boolean,
      required: true,
    },
    moveDown: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    onRemoveGroupPersonButtonClicked() {
      this.$emit('remove-group-person-button-clicked')
    },
    onMoveUpButtonClicked() {
      this.$emit('move-up-button-clicked')
    },
    onMoveDownButtonClicked() {
      this.$emit('move-down-button-clicked')
    },
  },
}
</script>