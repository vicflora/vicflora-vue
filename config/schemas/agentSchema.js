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

export default [
  {
    fieldType: "SelectList",
    name: "agentType",
    label: "Agent type",
    options: [
      { value: "PERSON", label: "Person" },
      { value: "GROUP", label: "Group" },
      { value: "ORGANIZATION", label: "Organisation" },
    ]
  },
  {
    fieldType: "TextInput",
    name: "name",
    label: "Name",
  },
  {
    fieldType: "TextInput",
    name: "lastName",
    label: "Last name",
  },
  {
    fieldType: "TextInput",
    name: "firstName",
    label: "First name",
  },
  {
    fieldType: "TextInput",
    name: "initials",
    label: "Initials",
  },
  {
    fieldType: "GroupPersonsSubform",
    name: "members",
    label: "Members",
  },
]