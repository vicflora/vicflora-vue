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

export default {
    "ACCEPTED": {
        'label': 'Accepted',
        'description': `The taxon is currently accepted in VicFlora.`
    },
    "SYNONYM": {
        'label': 'Synonym',
        'description': `The name is a synonym of the name of an accepted taxon.
        In VicFlora we tend to use this only for names that cannot be considered
        homotypic or heterotypic synonyms, like autonyms and phrase names. In
        the front end we call all synonyms just 'synonyms'.`
    },
    "HOMOTYPIC_SYNONYM": {
        'label': 'Homotypic synonym',
        'description': `The name is a homotypic (syn.: nomenclatural) synonym.`
    },
    "HETEROTYPIC_SYNONYM": {
        'label': 'Heterotypic ynonym',
        'description': `The name is a heterotypic (syn.: taxonomic) synonym.`
    },
    "MISAPPLICATION": {
        'label': 'Misapplication',
        'description': `The name has been misapplied.`
    },
    "NOT_ACCEPTED": {
        'label': 'Not accepted',
        'description': `The name is not currently accepted in VicFlora, but can
            also not be considered a synonym or misapplication.`
    },
}
