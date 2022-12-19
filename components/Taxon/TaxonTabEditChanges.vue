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
    <table class="table">
      <thead>
        <tr>
          <th>Date</th>
          <th>New name</th>
          <th>Change type</th>
          <th>Source</th>
          <th>Changed by</th>
        </tr>
      </thead>
      <tbody v-if="concept.changes">
        <tr
          v-for="change in concept.changes"
          :key="change.id"
        >
          <td>{{ change.createdAt.substring(0,10) }}</td>
          <td>
            <div v-if="change.to">
              <b>{{ change.to.taxonName.fullName }}</b> {{ change.to.taxonName.authorship }}
            </div>
          </td>
          <td>{{ taxonomicStatusEnum[change.changeType].label }}</td>
          <td>{{ change.changeSource ? change.changeSource.quickRef : '&nbsp;'}}</td>
          <td>{{ change.createdBy ? change.createdBy.name : '&nbsp;'}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import taxonomicStatusEnum from '@/graphql/enums/taxonomicStatusEnum'

export default {
  name: 'TaxonTabEditChanges',
  props: {
    concept: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      taxonomicStatusEnum: taxonomicStatusEnum
    }
  },
}
</script>
