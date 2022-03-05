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
    "PRESENT": {
        'label': 'Present',
        'description': `There is at least one well-documented record of the
            taxon in the area.`
    },
    "EXTINCT": {
        'extinct': `There is no evidence that the taxon is still present in the
            area.`
    },
    "EXCLUDED": {
        'excluded': `The taxon has been reported for the area, but the report
            is based on a misdetermination. A "taxon" that is solely identified
            by its name can also be considered 'excluded', because the taxonomy
            has changed.`
    }
}
