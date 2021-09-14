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

export const imagePaginatorMixin = {
  name: "ImagePaginatorMixin",
  data() {
    return {
      first: 24,
      page: 1
    }
  },
  created() {
    if ("page" in this.$route.query) {
      this.page = parseInt(this.$route.query.page)
    }
  },
  methods: {
    onPageChanged(page) {
      this.page = page
    }
  }
}