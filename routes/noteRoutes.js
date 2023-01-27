const router = require('express').Router()
const res = require('express/lib/response')
const Note = require('../models/Note')

//route of creation
app.post('/', async (req, res) => {

    const {title, content} = req.body

    if (!content) {
        res.status(422).json({ error: 'the field content is null'})
    }

    const note = {
        title,
        content,
    }

    try {
        await Note.create(note)

        res.status(201).json({message: 'Note inserted'})

    } catch (error){
        res.status(500).json({error: error})
    }
})

// Read of notes

router.get('/', assync (req, res) =>{
    try {
        const notes = await note.find()

        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ error: console.error})
    }
})

//find note for title
router.get('/:title', assync(req, res)=>{
    const title = req.params.title

    try {
        const note = await Note.findOne({title: title})
        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ error: error})
    }

})

module.exports = router