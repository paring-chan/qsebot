const mongoose = require('mongoose')

export default mongoose.model(
  'counter',
  new mongoose.Schema({
    message: {
      type: 'string',
      unique: true,
      required: true,
    },
    response: {
      type: 'string',
      required: true,
    },
    count: {
      type: 'number',
      default: 0,
    },
  }),
  'counter',
)
