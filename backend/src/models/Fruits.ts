import mongoose from 'mongoose';

const fruitSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true,
    set: (val: String) => {
        if(!val) return val
        //capitalise 1st letter, lowercase the rest
        return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase()
    }},
  price: { 
    type: Number, 
    required: true,
    min: 0,
    set: (val: number) => Math.round(val*100)/100 },
  stock: { 
    type: Number, 
    required: true, 
    min: 0 },
  image: { 
    type: String,
    default: "https://unsplash.com/photos/orange-fruit-U1iYwZ8Dx7k"}
})
const Fruit = mongoose.model('Fruit', fruitSchema)

export default Fruit
