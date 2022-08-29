import autor from '../models/Autor.js'

class AutorController{
    static listarAutores = (req, res) => {
        autor.find((err, autor) => {
            res.status(200).json(autor)
        })
    }

    static listarAutorPorId = (req, res) => {
        const {id} = req.params
        autor.findById(id, (err, autor) => {
            if(err){
                res.status(400).send({message: `${err.message} - falha ao encontrar autor.`})
            }else{
                res.status(200).send(autor)
            }
        })
    }

    static cadastrarAutor = (req, res) => {
        let newAutor = new autor(req.body)
        newAutor.save(err => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`})
            }else{
                res.status(201).send(newAutor.toJSON())
            }
        })
    }

    static atualizarAutor = (req, res) => {
        const {id} = req.params
        autor.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao atualizar autor.`})
            }else{
                res.status(200).send({message: `Autor atualizado com sucesso`})
            }
        })
    }

    static deletarAutor = (req, res) => {
        const {id} = req.params
        autor.findByIdAndDelete(id, {$set: req.body}, (err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao deletar autor.`})
            }else{
                res.status(200).send({message: `Autor deletado com sucesso`})
            }
        })
    }
}

export default AutorController