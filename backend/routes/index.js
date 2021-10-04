const ROLE = {
	ADMIN: 'admin',
	BASIC: 'basic'
}

var express = require("express");
var router = express.Router();
const controllers = require("../controllers/index");
const {authUser, authRole} = require('../middlewares/auth/auth')


//Routes
router.post('/createuser',controllers.createuser);

router.post('/logout',controllers.logout);
router.post('/sms',controllers.sms);

router.get('/getcard',controllers.getcard);
router.get('/addcard',authUser,authRole(ROLE.ADMIN),controllers.addcard);

router.get('/test',controllers.test);
router.get('/insert',controllers.getInsert);
router.post('/insert',authUser,authRole(ROLE.ADMIN),controllers.postInsert);

router.get('/gethumidity',controllers.gethumidity);
router.post('/addhumidity',authUser,authRole(ROLE.ADMIN),controllers.addhumidity);

router.get('/gettemperature',controllers.gettemperature);
router.post('/addtemperature',authUser,authRole(ROLE.ADMIN),controllers.addtemperature);

router.get('/getseason',controllers.getseason);
router.post('/addseason',authUser,authRole(ROLE.ADMIN),controllers.addseason);

router.post('/adduserdetail',controllers.adduserdetail);


module.exports = router;

