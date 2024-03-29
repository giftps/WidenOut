const router = require('express').Router();
const auth = require('../middleware/auth');
const groupCtrl = require('../controllers/groupCtrl');

router.get("/all_groups", auth, groupCtrl.allGroups);

router.get('/group/:id', auth, groupCtrl.getGroup);

module.exports = router;