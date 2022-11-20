import mongoose from "mongoose";

const { Schema } = mongoose;

const exampleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,

    },
    colors: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    }
})

const Example = mongoose.model('Example', exampleSchema)

// Example.create({
//     name: 'Test product',
//     description: 'Lorem ipsum dolor sit am',
//     colors: ["black", "white", "red"],
//     price: 1000
// })

const findAll = async () => {
    const examples = await Example.find()
    console.log('FIND ALL ================', examples);
}

const findById = async () => {
    const example = await Example.findById('637219c10a1d76792aa53b81')
    console.log(example);
}

const updateById = async () => {

    //Méthode 1
    const methode1 = await Example.findByIdAndUpdate('637219c10a1d76792aa53b81', {
        name: 'Premier élément modifié'
    },{
        runValidators: true
    })

    // // Méthode 2
    // const methode2 = await Example.findById('637219c10a1d76792aa53b81')
    // methode2.name = 'Modification'
    // methode2.save()

    // // Méthode 3
    // const methode3 = await Example.findById('637219c10a1d76792aa53b81')
    // methode3.set({
    //     name: "Modifié par le set"
    // })
    // methode3.save()

    console.log(methode1);
}

const deleteById = async () => {
    const example = await Example.findByIdAndDelete('637219c10a1d76792aa53b81')
}

// findAll();
// findById();
// updateById();
// deleteById();

export default Example;
