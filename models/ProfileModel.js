// Copyright 2022 Royal Botanic Gardens Board
// 
// Licensed under the Apache License, Version 2.0 (the "License")
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

import { Agent } from '@/models/AgentModel'
import { Reference } from '@/models/ReferenceModel'
import { TaxonConcept } from '@/models/TaxonConceptModel'

class Profile {
  constructor(data = {}) {
    this.id = data.id
    this.version = data.version
    this.source = data.source ? new Reference(data.source) : null
    this.createdBy = data.createdBy ? new Agent(data.createdBy) : null
    this.createdAt = data.createdAt
    this.profile = data.profile
    this.taxonConcept = new TaxonConcept(data.taxonConcept)
    this.acceptedConcept = new TaxonConcept(data.acceptedConcept)
  }
}

class UpdateProfileInput {
  constructor(data) {
    this.id = data.id
    this.profile = data.profile
  }
}

class CreateProfileInput {
  constructor(data) {
    this.id = data.id
    this.profile = data.profile
    this.taxonConcept = {
      connect: data.taxonConcept.id
    }
    this.acceptedConcept = {
      connect: data.acceptedConcept.id
    }
    if (data.source) {
      this.source = {
        connect: data.source.id
      }
    }
  }
}

export { Profile, CreateProfileInput, UpdateProfileInput }