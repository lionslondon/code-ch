const router = require('express-promise-router')();
const blocksController = require('../controllers/blocks')
const {validateParam, schemas} = require('../helpers/routeHelpers');

router.route('/')
    .get(blocksController.index);

router.route('/:hash')
    .get(validateParam(schemas.hashSchema, 'hash'), blocksController.getBlock);
   
module.exports = router;
