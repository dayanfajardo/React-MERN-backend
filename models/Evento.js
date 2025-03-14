const  { Schema, model }  = require('mongoose');



const EventoSchema = Schema({

    title: {
        type: String,
        required: true
    },

    notes: {
        type: String
    },

    start: {
        type: Date,
        required: true
    },

    end: {
        type: Date,
        required: true
    },

    user: {
        //Esto le dice a moongose que es una referencia
        type: Schema.Types.ObjectId,
        //Usuario: Nombre del otro schema
        ref: 'Usuario',
        required: true
    }


});


EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object  } = this.toObject();
    object.id = _id;
    return object
})

module.exports = model( 'Evento', EventoSchema );