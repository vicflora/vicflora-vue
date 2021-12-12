/**
 * Copyright 2021 Royal Botanic Gardens Victoria
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

export const rankMixin = {
  data() {
    return {
      rankClass: {
        life: -9999,
        kingdom: 10,
        phylum: 30,
        class: 60,
        superorder: 90,
        order: 100,
        family: 140,
        genus: 180,
        species: 220,
        subspecies: 230
      }
    }
  }
}

export const taxonNameClassesMixin = {
  methods: {
    getNameClasses(rankId, taxonomicStatus=false) {
      return {
        'm-taxon-name': true,
        'm-taxon-name-italic': rankId >= this.rankClass.genus,
        'm-taxon-name-accepted': taxonomicStatus === 'ACCEPTED',
        'm-taxon-name-not-accepted': taxonomicStatus && taxonomicStatus != 'ACCEPTED'
      }
    }
  }
}