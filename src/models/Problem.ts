import { Schema } from 'mongoose'
import * as mongoose from 'mongoose'

const schema = new Schema({
  question: {
    type: 'string',
    unique: true,
    required: true,
  },
  answer: {
    type: 'boolean',
    required: true,
  },
  correct: {
    type: 'string',
    required: true,
  },
  incorrect: {
    type: 'string',
    required: true,
  },
})

export default mongoose.model('problem', schema, 'problems')
