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

import referenceSchema from './schemas/referenceSchema'
import articleSchema from './schemas/articleSchema'
import chapterSchema from './schemas/chapterSchema'
import bookSchema from './schemas/bookSchema'
import journalSchema from './schemas/journalSchema'

const schema = {
  ARTICLE: articleSchema,
  BOOK: bookSchema,
  BOOK_SERIES: bookSchema,
  REPORT: bookSchema,
  CHAPTER: chapterSchema,
  WEBPAGE: referenceSchema,
  AUDIO_VISUAL_DOCUMENT: referenceSchema,
  JOURNAL: journalSchema,
  MULTIVOLUME_BOOK: referenceSchema,
  PERIODICAL: journalSchema,
  SOFTWARE_APPLICATION: referenceSchema,
  WEBPAGE: referenceSchema,
  WEBSITE: referenceSchema,
}

export default schema
