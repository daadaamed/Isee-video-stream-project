const UserModel = require('../models/user.model')
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await UserModel.find().select('-password');
    res.status(200).json(users)
}

module.exports.userInfo = (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status (400). send('ID unknown :' + req.params. id)
    
    UserModel.findById(req.params.id)
        .select('-password')
        .then(user => {
            res.status(200).send(user); // Affiche l'utilisateur trouvé
        })
        .catch(err => {
            res.status(200).send(err);
        });
};

module.exports.updateUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status (400). send('ID unknown :' + req.params. id)
    
    UserModel.findOneAndUpdate(
            {_id: req.params.id},
            req.body,
            { new: true },
            )
            .select('-password')
            .then(user => {
                res.status(200).send(user); // Afficher l'utilisateur trouvé
            })
            .catch(err => {
                res.status(200).send(err);
            });

}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status (400). send('ID unknown :' + req.params. id)
    

        UserModel.findOneAndDelete({ _id: req.params.id })
        .then(deletedUser => {
            res.status(200).send("L'utilisateur " + deletedUser._id + " a été correctement delete"); // Afficher l'utilisateur supprimé
        })
        .catch(err => {
            res.status(500).send(err);
        });


}