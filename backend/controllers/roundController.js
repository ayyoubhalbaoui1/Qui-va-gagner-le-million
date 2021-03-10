const group_members = require('../models/group_members')
const Round = require('../models/round')

exports.addRound = async (req,res) => {

    const round = new Round({
        id_group_members : req.body.id_group_members,
        id_question : req.body.id_question,
        id_question_token : req.body.id_question_token

    })

    try {
        const savedRound = await round.save()
        res.status(201).json(savedRound)
    } catch (error) {
        res.status(500).send({message : error.message})
        
    }
}


exports.getRoundsCount = async (group_code) => {
    var i = 0
    const rounds = await Round.aggregate([

        {
            $lookup:
           {
             from: 'groupmembers',
             localField: 'id_group_members',
             foreignField: '_id',
             as: 'group_members'
           }
         }
        ])

        rounds.map((group) => {

            if(group.group_members[0].group_code == group_code) i++
        })

        return i;

}