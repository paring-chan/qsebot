import * as mongoose from 'mongoose'

const Schema = new mongoose.Schema({
  question: {
    type: String,
    unique: true,
    required: true
  },
  script: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['select', 'custom']
  }
})

export default mongoose.model('newProblem', Schema, 'newProblem')
