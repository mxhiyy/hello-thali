const mongoose =  require("mongoose");

const generateOrderID = () => {
  const randomNumber = Math.floor(Math.random() * 1000000000000);
  return `ODID11${randomNumber}`;
};



const orderSchema = new mongoose.Schema({
  orderID: {
    type: String,
    default: generateOrderID,
    unique: true,
  },
  status: { type: String, default: "Pending" },
  totalQuantity: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  items: [
    {
      id: { type: Number, required: true },
      img: { type: String, required: true },
      title: { type: String, required: true },
      sellingPrice: { type: Number, required: true },
      mrp: { type: Number, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      rating: { type: Number, required: true },
    },
  ],
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true});

module.exports =  mongoose.models.Order || mongoose.model("Order", orderSchema);
