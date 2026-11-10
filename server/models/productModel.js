

import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
        min: 0,
    },

    discountPrice: {
        type: Number,
        default: null,
    },

    category: {
        type: String,
        required: true,
    },

    brand: {
        type: String,
        required: true,
    },

    images: [
        {
            type: String,
            required: true,
        },
    ],

    stock: {
        type: Number,
        required: true,
        default: 0,
    },

    sizes: [
        {
            type: String,
        },
    ],

    colors: [
        {
            type: String,
        },
    ],

    ratings: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },

    numReviews: {
        type: Number,
        default: 0,
    },

    isFeatured: {
        type: Boolean,
        default: false,
    },

    isActive: {
        type: Boolean,
        default: true,
    },
},
    {
        timestamps: true
    }
)


const Product = mongoose.model("products", productSchema);
export default Product