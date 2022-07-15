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
  <span>–
    <span class="m-status-content">
      <span :id="`popover-target-endemic`">endemic</span>
      <b-popover
        :target="`popover-target-endemic`"
        triggers="hover"
        placement="right"
        :delay="{ show: 100, hide: 300 }"
      >
        <template #title>Endemic</template>
        Native and restricted to Victoria
      </b-popover>
    </span>
  </span>
</template>

<script>
export default {
  name: "TaxonStatusEndemic",
}
</script>