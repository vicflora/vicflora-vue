// Copyright 2022 Royal Botanic Gardens Board
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { GroupPersonInput } from './GroupPersonModel'
class Agent {
  constructor(data = {}) {
    this.id = data.id
    this.agentType = data.agentType
    this.name = data.name
    this.lastName = data.lastName
    this.firstName = data.firstName
    this.initials = data.initials

    this.members = data.members  ? data.members : null
  }
}

class UpdateAgentInput {
  constructor(data = {}) {
    this.id = data.id
    this.agentType = data.agentType
    this.name = data.name
    this.lastName = data.lastName
    this.firstName = data.firstName
    this.initials = data.initials
    if (data.members && data.members.length) {
      this.members = []
      data.members.forEach(item => {
        this.members.push(new GroupPersonInput(item))
      })
    }
  }
}

class CreateAgentInput {
  constructor(data = {}) {
    this.agentType = data.agentType
    this.name = data.name
    this.lastName = data.lastName
    this.firstName = data.firstName
    this.initials = data.initials
    if (data.members && data.members.length) {
      this.members = []
      data.members.forEach(item => {
        this.members.push(new GroupPersonInput(item))
      })
    }
  }
}

class LinkToUserInput {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.email = data.email
  }
}

export { Agent, CreateAgentInput, UpdateAgentInput, LinkToUserInput }