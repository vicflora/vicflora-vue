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

export const searchMixin = {
  computed: {
    q: function() {
      return this.$route.query.q;
    },
    fq: function() {
      if (typeof this.$route.query.fq === "object") {
        return this.$route.query.fq
      } else if (typeof this.$route.query.fq === "string") {
        return [this.$route.query.fq]
      } else {
        return []
      }
    }
  }
}

export const searchWatchMixin = {
  watch: {
    fq: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          fq: this.$route.query.fq,
          page: 1
        }
      }
    },
    q: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          q: this.q,
          fq: "",
          page: 1
        }
      }
    },
    page: {
      immediate: true,
      handler: function() {
        this.input = {
          ...this.input,
          page: parseInt(this.page)
        }
      }
    },
  },
}

export const facetMixin = {
  computed: {
    filterKey() {
      return this.filter.split(':')[0]
    },
    filterValue() {
      return this.filter.split(':')[1]
    },
    filterLabel() {
      if (this.filterKey && this.filterKey.length > 0) {
        const ucfirst = this.filterKey ? this.filterKey[0].toUpperCase() + this.filterKey.substring(1) : ''
        return ucfirst.replace(/_/g, ' ')
      }
      return this.filterKey
    }
  }
}

export const searchResultPaginationMixin = {
  data() {
    return {
      activePage: 1
    }
  },
  mounted() {
    this.activePage = "page" in this.$route.query
        && this.$route.query.page !== undefined
        ? parseInt(this.$route.query.page) : 1
  },
  methods: {
    onPageChange(pageNum) {
      this.activePage = pageNum
      this.$emit("pageChange", pageNum)
    }
  }
}
