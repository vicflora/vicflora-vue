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

import { TaxonNameProtologue } from "./TaxonNameProtologueModel"

class TaxonName {
  constructor(data = {}) {
    this.id = data.id
    this.nameType = data.nameType || 'SCIENTIFIC'
    this.rank = data.rank
    this.namePart = data.namePart
    this.fullName = data.fullName
    this.authorship = data.authorship
    this.publicationYear = data.publicationYear
    this.nomenclaturalNote = data.nomenclaturalNote
    this.remarks = data.remarks

    this.parent = data.parent ? new TaxonName(data.parent || {}) : null
    this.protologue = new TaxonNameProtologue(data.protologue || {})
  }

  setParent(parent) {
    this.parent = parent ? new TaxonName(parent || {}) : null
  }
}

class UpdateTaxonNameInput {
  constructor(data = {}) {
    this.id = data.id
    this.nameType = data.nameType
    this.rank = data.rank
    this.namePart = data.namePart
    this.fullName = data.fullName
    this.authorship = data.authorship
    this.publicationYear = data.publicationYear
    this.nomenclaturalNote = data.nomenclaturalNote
    this.remarks = data.remarks

    if (data.parent) {
      this.parent = {
        connect: data.parent.id
      }
    }

    if (data.protologue) {
      this.protologue = {
        connect: data.protologue.id
      }
    }
  }
}

class CreateTaxonNameInput {
  constructor(data = {}) {
    this.nameType = data.nameType
    this.rank = data.rank
    this.namePart = data.namePart
    this.fullName = data.fullName
    this.authorship = data.authorship
    this.publicationYear = data.publicationYear
    this.nomenclaturalNote = data.nomenclaturalNote
    this.remarks = data.remarks

    if (data.parent && Object.keys(data.parent).length > 0) {
      this.parent = {
        connect: data.parent.id
      }
    }

    if (data.protologue && Object.keys(data.protologue).length > 0) {
      this.protologue = {
        connect: data.protologue.id
      }
    }
  }
}

export { TaxonName, UpdateTaxonNameInput, CreateTaxonNameInput }