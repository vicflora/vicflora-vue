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
  constructor(data = {}) {
    this.id = data.id
    this.type = data.type
    this.publicationYear = data.publicationYear
    this.title = data.title
    this.parent = data.parent ? new Reference(data.parent) : null
    this.volume = data.volume
    this.issue = data.issue
    this.number = data.number
    this.pageStart = data.pageStart
    this.pageEnd = data.pageEnd
    this.pages = data.pages
    this.numberOfPages = data.numberOfPages
    this.publisher = data.publisher
    this.isbn = data.isbn
    this.issn = data.issn
    this.doi = data.doi
    this.citation = data.citation
    this.citationHtml = data.citationHtml

    this.author = data.author ? new Agent(data.author) : null
  }
}

export { Reference }