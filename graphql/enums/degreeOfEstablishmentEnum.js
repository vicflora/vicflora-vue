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

export default {
    "NATIVE": {
        'label': 'Native',
        'description': `Not transported beyond limits of native range.\n\n
            Considered native and naturally occurring.`
    },
    "CULTIVATED": {
        'label': 'Cultivated',
        'description': `Individuals in cultivation (i.e., individuals provided 
            with conditions suitable for them, but explicit measures to prevent 
            dispersal are limited at best).`
    },
    "CASUAL": {
        'label': 'Casual',
        'description': `Individuals surviving outside of captivity or 
            cultivation in a location with no reproduction.`
    },
    "ADVENTIVE": {
        'label': 'Adventive',
        'description': `Individuals surviving outside of captivity or 
            cultivation in a location.Reproduction is occurring, but population 
            not self-sustaining.\n\nOffspring are produced, but these either do 
            not survive or are not fertile enough to maintain the population.`
    },
    "NATURALISED": {
        'label': 'Naturalised',
        'description': `Individuals surviving outside of captivity or 
            cultivation in a location. Reproduction occurring, and population 
            self-sustaining.\n\nThe population is maintained by reproduction, 
            but is not spreading.`
    },
    "COLONISING": {
        'label': 'Colonising',
        'description': `Self-sustaining population outside of captivity or
            cultivation, with individuals surviving a significant distance from
            the original point of introduction.\n\nThe population is maintained 
            by reproduction and is spreading.`
    },
    "INVASIVE": {
        'label': 'Invasive',
        'description': `Self-sustaining population outside of captivity or
            cultivation, with individuals surviving and reproducing a
            significant distance from the original point of introduction.\n\nThe 
            population is maintained by reproduction, is spreading, and its 
            progeny are also reproducing and spreading.`
    },
    "WIDESPREAD_INVASIVE": {
        'label': 'Widespread invasive',
        'description': `Fully invasive species, with individuals dispersing, 
            surviving and reproducing at multiple sites across a spectrum of 
            habitats and geographic range.`
    },
    "UNCERTAIN": {
        "label": "Uncertain",
        "description": ""
    }
}
