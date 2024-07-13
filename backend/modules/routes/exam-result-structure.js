'use strict';
const express = require('express');
const router = express.Router();
const {GetSingleClassMarksheetTemplateByStream,GetSingleClassExamResultStructureByStream,CreateExamResultStructure,DeleteResultStructure, ChangeResultPublishStatus} = require('../controllers/exam-result-structure');

router.post('/',CreateExamResultStructure);
router.get('/admin/:id/class/:class/stream/:stream',GetSingleClassMarksheetTemplateByStream);
router.get('/admin/:id/class/:class/stream/:stream/exam/:exam',GetSingleClassExamResultStructureByStream);
router.put('/result-publish-status/:id', ChangeResultPublishStatus);
router.delete('/:id',DeleteResultStructure);

module.exports = router;