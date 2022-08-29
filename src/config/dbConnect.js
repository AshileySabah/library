import mongoose from "mongoose";

mongoose.connect('colocar-string-conexao-aqui')

let db = mongoose.connection

export default db