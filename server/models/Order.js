const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },
    orderNumber: {
        type: String,
        unique: true,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart', 
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    stripePaymentId: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const Order = model('Order', orderSchema);

module.exports = Order;
