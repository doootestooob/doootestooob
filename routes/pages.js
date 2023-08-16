const express = require('express')
const authcontroller = require('../controllers/auth')
const router = express.Router()
const User = require('../modules/users')
const jwt = require('jsonwebtoken')
router.get('/', (req, res) => {
    res.render('index')
})

router.get('/vertify', authcontroller.vertifyMail)

router.get('/loginsuccess', async (req, res) => {
    try {
        const id = req.query.id
        const token = req.query.token

        const AuthToken = req.cookies.jwt; //網路簽章

        if (!AuthToken) {

            return res.redirect('/');

        } else {
            const userId = jwt.decode(AuthToken).id;
            const user = await User.findById(userId);
            if (!user) {

                return res.redirect('/');
            } else {
                const publicKey = user.publicKey;
                jwt.verify(AuthToken, publicKey, { algorithms: 'RS256' }, (err, decodedToken) => {
                    if (err) {
                        return res.redirect('/');
                    }
                    
                    console.log(id, userId, token, AuthToken);
                    
                    if (id == userId && token == AuthToken) {
                        res.render('loginsuccess', {
                            user: decodedToken,
                        });
                    } else {
                        return res.redirect('/');
                    }
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).render('index', { message: '伺服器錯誤' });
    }
})


module.exports = router