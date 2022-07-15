const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    brand: String,

    model: String,

    type: {
      type: String,
      enum: ['electric', 'classic', 'acoustic']
    },
    
    image: {
      type: String,
      default: '../public/images/guitar-default-img.png',
    },
    
    fingerboardMaterial: String,
    
    artists:{
      Type: [String]
    },
    
    year: Number,
    
    countryOrigin: String,
    
    pickupConfig: String,
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Guitar = model("Guitar", userSchema);

module.exports = Guitar;


