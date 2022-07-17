const { Schema, model } = require('mongoose')

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const guitarSchema = new Schema(
  {
    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      // required: true,
    },

    nickName: {
      type: String,
      // required: true,
    },

    type: {
      type: String,
      enum: ['electric', 'classic', 'acoustic'],
      // required: true,
    },

    image: {
      type: String,
      default: '../public/images/guitar-default-img.png',
    },

    fingerboardMaterial: String,

    artists: String,

    year: Number,

    countryOrigin: String,

    pickupConfig: String,

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
)

const Guitar = model('Guitar', guitarSchema) // fixed typo

module.exports = Guitar
