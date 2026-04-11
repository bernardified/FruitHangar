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
    default: "https://images.unsplash.com/photo-1631209121750-a9f656d28f46?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
})
const Fruit = mongoose.model('Fruit', fruitSchema)

export default Fruit
