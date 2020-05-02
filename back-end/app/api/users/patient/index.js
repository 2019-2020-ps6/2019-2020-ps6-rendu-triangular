const {Router} = require("express")
const Patient = require('../../../models/patient.model')

const router = new Router({mergeParams: true});

router.get('/', async (req, res) => {
    await Patient.find().exec().then((patients) => {
        res.status(200).json(patients)
    }).catch((err) => {
        res.status(404).json(err)
    })
})

router.post('/', async (req, res) => {
    delete req.params._id;
    const patient = await new Patient({
        ...req.body
    })

    patient.save().then(() => {
        res.status(201).json(patient)
    }).catch((err) => {
        res.status(400).json(err);
    });
})

router.delete('/:id', (req, res) => {
    const curentId = req.params.id;
    Patient.findOneAndDelete({
        _id: curentId
    }).then(() => {
        res.status(204).json({message: "deleted"})
    })
        .catch(err => {
            res.status(404).json(err);
        })
})

module.exports = router
