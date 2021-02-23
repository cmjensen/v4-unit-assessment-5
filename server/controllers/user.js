const bcrypt = require('bcryptjs')

module.exports = {
    register: async ( req, res ) => {
        const db = req.app.get('db')
        const { username, password, profile_pic } = req.body
        const [foundUser] = await db.user.find_user_by_username([ username ])
        if( foundUser ){
            return res.status(400).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10)
        let hash = bcrypt.hashSync( password, salt )
        const [newUser] = await db.user.create_user([ username, hash, profile_pic ])
        req.session.user = {
            userId: newUser.id,
            username: newUser.username,
            profile_pic: `https://robohash.org/${username}.png`
        }
        res.status(200).send(req.session.user)
    },
    login: async ( req, res ) => {
        const db = req.app.get('db')
        const { username, password } = req.body
        const [foundUser] = await db.user.find_user_by_username([ username ])
        if( !foundUser ){
            return res.status(400).send('Incorrect login credentials')
        }
        const authenticated = bcrypt.compareSync( password, foundUser.password )
        if( authenticated ){
            req.session.user = {
                userId: foundUser.id,
                username: foundUser.username,
                profile_pic: `https://robohash.org/${username}.png`
            }
        } else {
            res.status(401).send('Incorrect login credentials')
        }
    },
    logout: ( req, res ) => {
        req.session.destroy()
        res.sendStatus(200)
    },
    getUser: ( req, res, ) => {
        if( req.session.user ){
            res.status(200).send( req.session.user )
        } else {
            res.status(404).send('Please log in')
        }
    }
}