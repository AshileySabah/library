import livros from '../models/Livro.js'

class LivroController{
    static listarLivros = (req, res) => {
        livros
        .find()
        .populate('autor')
        .exec((err, livros) => {
            res.status(200).json(livros)
        })
    }

    static listarLivroPorId = (req, res) => {
        const {id} = req.params
        livros.findById(id) 
        .populate('autor', 'nome')
        .exec((err, livro) => {
            if(err){
                res.status(400).send({message: `${err.message} - falha ao encontrar livro.`})
            }else{
                res.status(200).send(livro)
            }
        })
    }

    static cadastrarLivro = (req, res) => {
        let livro = new livros(req.body)
        livro.save(err => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`})
            }else{
                res.status(201).send(livro.toJSON())
            }
        })
    }

    static atualizarLivro = (req, res) => {
        const {id} = req.params
        livros.findByIdAndUpdate(id, {$set: req.body}, (err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao atualizar livro.`})
            }else{
                res.status(200).send({message: `Livro atualizado com sucesso`})
            }
        })
    }

    static deletarLivro = (req, res) => {
        const {id} = req.params
        livros.findByIdAndDelete(id, {$set: req.body}, (err) => {
            if(err){
                res.status(500).send({message: `${err.message} - falha ao deletar livro.`})
            }else{
                res.status(200).send({message: `Livro deletado com sucesso`})
            }
        })
    }

    static listarLivroPorEditora = (req, res) => {
        const editora = req.query.editora;
        livros.find({editora}, {}, (err, livros) => {
            res.status(200).send(livros)
        })
    }
}

export default LivroController