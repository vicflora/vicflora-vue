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

import Vue from 'vue'
import fontawesome from '@fortawesome/fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

fontawesome.config = {
  autoAddCss: false,
}

import { 
  faRotate, 
  faArrowRotateLeft, 
  faPenToSquare, 
  faPlus,
  faMinus,
  faChild,
  faFloppyDisk,
  faFile,
  faFilePen,
  faClone,
  faMapLocation,
  faBan,
  faEye,
  faCalendarDays,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faTable,
  faGlobe,
  faBook,
  faDice,
  faTrashCan,
  faCommentDots,
  faCircleChevronRight,
  faTag,
  faGear,
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faRotate, 
  faArrowRotateLeft, 
  faPenToSquare, 
  faPlus,
  faMinus,
  faChild,
  faFloppyDisk,
  faFile,
  faFilePen,
  faClone,
  faMapLocation,
  faBan,
  faEye,
  faCalendarDays,
  faCaretRight,
  faCaretDown,
  faCaretUp,
  faTable,
  faGlobe,
  faBook,
  faDice,
  faTrashCan,
  faCommentDots,
  faCircleChevronRight,
  faTag,
  faGear,
)

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('FontAwesomeIcon', FontAwesomeIcon)
Vue.component('font-awesome-icon', FontAwesomeIcon)