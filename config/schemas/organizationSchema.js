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

import agentSchema from "./agentSchema"

const fields = [
  'agentType',
  'name',
  'lastName'
]

const organizationSchema = agentSchema.filter(field => fields.indexOf(field.name) > -1)
organizationSchema.sort((a, b) => {
  return fields.indexOf(a.name) - fields.indexOf(b.name)
})

export default organizationSchema
