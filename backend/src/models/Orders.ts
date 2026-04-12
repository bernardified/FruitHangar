import mongoose from 'mongoose';

export interface IOrder extends Document {
    customerName: string
    //from customer's cart
    items: {
        fruitName: string
        fruitId: mongoose.Types.ObjectId
        quantity: number
    }[];
    totalAmount: number
    status: 'Pending' | 'Completed' | 'Cancelled'
    createdAt: Date
}

const orderSchema = new mongoose.Schema<IOrder>({
    customerName: { 
        type: String, 
        required: true },
    items: [
        {   
            fruitName: { 
                type: String, 
                required: true 
            },

            fruitId: { 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Fruit',
                required: true 
            },
            quantity: { 
                type: Number, 
                required: true, 
                min: 1 }
        }
    ],
    totalAmount: { 
        type: Number, 
        required: true },
    status: { 
        type: String, 
        enum: ['Pending', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    }
}, { timestamps: true })

const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order;