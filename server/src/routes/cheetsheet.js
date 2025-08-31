const express = require('express');

const router = express.Router();
const { getAllLanguages, getCheetsheetByLanguage, searchCheatsheets, createCheatsheet, updateCheatsheet, deleteCheatsheet } = require('../controllers/cheetsheet');


router.get('/languages', getAllLanguages);
router.get('/:language', getCheetsheetByLanguage);
router.get('/search/:query', searchCheatsheets);
router.post('/', createCheatsheet);
router.put('/:languages', updateCheatsheet);
router.delete('/:languages', deleteCheatsheet);


module.exports = router;