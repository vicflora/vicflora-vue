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
  <div class="table-responsive">
    <table class="vf-phenology-data-table table table-striped table-sm">
      <thead>
        <td>&nbsp;</td>
        <th
          v-for="item in data"
          :key="item.month"
        >
          {{ item.monthShort}}
        </th>
      </thead>
      <tbody>
        <tr>
          <th>Total</th>
          <td
            v-for="column in data"
            :key="column.month"
          >
            {{ column.total }}
          </td>
        </tr>
        <tr>
          <th>Buds</th>
          <td
            v-for="column in data"
            :key="column.month"
          >
            {{ column.buds }}
          </td>
        </tr>
        <tr>
          <th>Flowers</th>
          <td
            v-for="column in data"
            :key="column.month"
          >
            {{ column.flowers }}
          </td>
        </tr>
        <tr>
          <th>Fruit</th>
          <td
            v-for="column in data"
            :key="column.month"
          >
            {{ column.fruit }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TaxonTabPhenologyDataTable',
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
}
</script>