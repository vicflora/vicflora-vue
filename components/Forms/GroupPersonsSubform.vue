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
    <label>Members</label>
    <table class="table table-sm">
      <tbody>
        <GroupPersonTableRow
          v-for="(member, index) in members"
          :key="index"
          :member="member"
          :moveUp="member.sequence > 0"
          :moveDown="member.sequence < members.length-1"
          @move-up-button-clicked="moveUpGroupPerson(index)"
          @move-down-button-clicked="moveDownGroupPerson(index)"
          @remove-group-person-button-clicked="removeGroupPerson(index)"
        />
        <GroupPersonNewTableRow
          @add-group-person-button-clicked="addGroupPerson"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
const GroupPersonTableRow = () => import('@/components/Forms/GroupPersonTableRow')
const GroupPersonNewTableRow = () => import('@/components/Forms/GroupPersonNewTableRow')
import { Agent } from '@/models/AgentModel'

export default {
  name: 'GroupPersonsSubform',
  components: {
    GroupPersonTableRow,
    GroupPersonNewTableRow,
  },
  props: {
    mode: {
      type: String,
      required: false,
    },
    value: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      members: [],
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.members = value
      }
    }
  },
  created() {
    this.$nuxt.$on('add-group-person-button-clicked', (agent) => {
      this.addGroupPerson(new Agent(agent))
    })
  },
  methods: {
    addGroupPerson(member) {
      delete member.members
      if (!this.members) {
        this.members = []
      }
      const newMember = {
        sequence: this.members.length,
        member: member,
      }
      this.members.push(newMember)
      this.$nuxt.$emit('group-persons-changed', this.members)
    },
    moveUpGroupPerson(index) {
      const thisGroupPerson = this.members[index],
        prevGroupPerson = this.members[index-1]
      thisGroupPerson.sequence--
      prevGroupPerson.sequence++
      this.members.splice(index-1, 1)
      this.members.splice(index, 0, prevGroupPerson)
      this.$nuxt.$emit('group-persons-changed', this.members)
    },
    moveDownGroupPerson(index) {
      const thisGroupPerson = this.members[index],
        nextGroupPerson = this.members[index+1]
      thisGroupPerson.sequence++
      nextGroupPerson.sequence--
      this.members.splice(index, 1)
      this.members.splice(index+1, 0, thisGroupPerson)
      this.$nuxt.$emit('group-persons-changed', this.members)
    },
    removeGroupPerson(index) {
      const thisGroupPerson = this.members[index],
        followingMembers = this.members.filter((item) => {
          return item.sequence > index
        })
      this.members.splice(index, 1)
      this.members.forEach((item, i) => {
        if (item.sequence > index) {
          this.members[i].sequence--
        }
      })
      this.$nuxt.$emit('group-persons-changed', this.members)
    },
  }
}
</script>
