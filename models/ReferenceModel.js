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
    this.referenceType = data.referenceType
    this.type = data.type
    this.publicationYear = data.publicationYear
    this.title = data.title
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
    this.referenceString = data.referenceString
    this.referenceStringHtml = data.referenceStringHtml

    this.author = data.author ? new Agent(data.author) : null

    if (data.isPartOf && data.referenceType === 'CHAPTER') {
      this.book = data.isPartOf
    }
    else if (data.isPartOf && data.referenceType === 'ARTICLE') {
      this.journal = data.isPartOf
    }
  }
}

class UpdateReferenceInput {
  constructor(data = {}) {
    this.id = data.id
    this.referenceType = data.referenceType
    this.type = data.type
    this.publicationYear = data.publicationYear
    this.title = data.title
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
    this.referenceString = data.referenceString
    this.referenceStringHtml = data.referenceStringHtml

    if (data.author) {
      this.author = {
        connect: data.author
      }
    }

    if (data.referenceType === 'ARTICLE' && data.journal) {
      this.journal = {
        connect: data.journal.id
      }
    }
    if (data.referenceType === 'CHAPTER' && data.book) {
      this.book = {
        connect: data.book.id
      }
    }
  }
}

class CreateReferenceInput {
  constructor(data = {}) {
    this.referenceType = data.referenceType
    this.type = data.type
    this.publicationYear = data.publicationYear
    this.title = data.title
    this.volume = data.volume
    this.issue = data.issue
    this.number = data.number
    this.pageStart = data.pageStart ? parseInt(data.pageStart) : null
    this.pageEnd = data.pageEnd ? parseInt(data.pageEnd) : null
    this.pages = data.pages
    this.numberOfPages = data.numberOfPages
    this.publisher = data.publisher
    this.isbn = data.isbn
    this.issn = data.issn
    this.doi = data.doi
    this.referenceString = data.referenceString
    this.referenceStringHtml = data.referenceStringHtml

    if (data.author) {
      this.author = {
        connect: data.author.id
      }
    }

    if (data.referenceType === 'ARTICLE' && data.journal) {
      this.journal = {
        connect: data.journal.id
      }
    }
    if (data.referenceType === 'CHAPTER' && data.book) {
      this.book = {
        connect: data.book.id
      }
    }
  }
}
export { Reference, CreateReferenceInput, UpdateReferenceInput }