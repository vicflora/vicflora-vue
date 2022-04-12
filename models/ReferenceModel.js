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

import { Agent } from "@/models/AgentModel"

class Reference {
  constructor(ref = {}) {
    this.id = ref.id
    this.type = ref.type
    this.publicationYear = ref.publicationYear
    this.title = ref.title
    this.parent = ref.parent ? new Reference(ref.parent) : null
    this.volume = ref.volume
    this.issue = ref.issue
    this.number = ref.number
    this.pageStart = ref.pageStart
    this.pageEnd = ref.pageEnd
    this.pages = ref.pages
    this.numberOfPages = ref.numberOfPages
    this.publisher = ref.publisher
    this.isbn = ref.isbn
    this.issn = ref.issn
    this.doi = ref.doi
    this.citation = ref.citation
    this.citationHtml = ref.citationHtml

    this.author = data.author ? new Agent(data.author) : null
  }
}

export { Reference }