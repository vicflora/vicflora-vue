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

export const formControlPropsMixin = {
  props: {
    placeholder: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number, Object],
      required: false,
    },
    rows: {
      type: Number,
      default: 1,
    },
    hide: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: false,
    },
    inForm: {
      type: String,
      required: false,
    },
    calledFrom: {
      type: String,
      required: false
    }
  },
  computed: {
    show() {
      return !this.hide
    }
  },
}

export const subformButtonPropsMixin = {
  props: {
    buttons: {
      type: Array,
      required: false,
    },
    form: {
      type: String,
      required: false,
    },
  },
}

export const formMethodsMixin = {
  methods: {
    showHideField(field, show=true) {
      const index = this.schema.map(element => element.name).indexOf(field)
      this.schema[index].hide = !show
    },
  },
}