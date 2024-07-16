'use strict';
const ExamResultStructureModel = require('../models/exam-result-structure');
const MarksheetTemplateStructureModel = require('../models/marksheet-template-structure');
const MarksheetTemplateModel = require('../models/marksheet-template');
const ExamResultModel = require('../models/exam-result');
const NotificationModel = require('../models/notification');
const classModel = require('../models/class');
const ClassSubjectModel = require('../models/class-subject');

let GetSingleClassMarksheetTemplateByStream = async (req, res, next) => {
    let adminId = req.params.id;
    let className = req.params.class;
    let stream = req.params.stream;
    if (stream === "stream") {
        stream = "N/A";
    }
    let streamMsg = `${stream} stream`;
    try {
        const marksheetTemplate = await MarksheetTemplateModel.findOne({ adminId: adminId, class: className,stream:stream });
        if(!marksheetTemplate){
            return res.status(404).json(`Class ${className} ${streamMsg} template not found !`);
        }
        return res.status(200).json(marksheetTemplate);
    } catch (error) {
        return res.status(500).json('Internal Server Error !');;
    }
}

let GetSingleClassExamResultStructureByStream = async (req, res, next) => {
    let adminId = req.params.id;
    let className = req.params.class;
    let stream = req.params.stream;
    if (stream === "stream") {
        stream = "N/A";
    }
    try {
        const classSubjectList = await ClassSubjectModel.findOne({ adminId: adminId, class: className, stream: stream }, 'subject');
        if (!classSubjectList) {
            return res.status(404).json('This class and subject group not found. !');
        }
        const singleExamResultStructure = await MarksheetTemplateModel.findOne({ adminId: adminId, class: className, stream: stream });
        if (!singleExamResultStructure) {
            if (stream === "N/A") {

                streamMsg = ``;
            }
            return res.status(404).json(`Class ${className} ${streamMsg} exam not found !`);
        }
        const templateName = singleExamResultStructure.templateName;
        const marksheetTemplateStructure = await MarksheetTemplateStructureModel.findOne({ templateName: templateName });
        if (!marksheetTemplateStructure) {
            if (stream === "N/A") {
                streamMsg = ``;
            }
            return res.status(404).json(`Class ${className} ${streamMsg} marksheet template not found !`);
        }
        return res.status(200).json({ marksheetTemplateStructure: marksheetTemplateStructure, classSubjectList: classSubjectList });
    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

let CreateExamResultStructure = async (req, res, next) => {
    let className = req.body.class;
    let { adminId, stream, templateName } = req.body;
    if (stream === "stream") {
        stream = "N/A";
    }
    try {
        const checkExamExist = await MarksheetTemplateModel.findOne({ adminId: adminId, class: className, stream: stream});
        if (checkExamExist) {
            return res.status(400).json(`This class template ${checkExamExist.templateName} already exist !`);
        }
        let marksheetTemplateData = {
            adminId: adminId,
            class: className,
            stream: stream,
            templateName: templateName,
        };
        let marksheetTemplate = await MarksheetTemplateModel.create(marksheetTemplateData)
        return res.status(200).json('Marksheet template add successfully.');

    } catch (error) {
        return res.status(500).json('Internal Server Error !');;
    }
}

// let CreateExamResultStructure = async (req, res, next) => {

//     const gradeMinMarks = [
//         { "A+": 91 }, { "A": 81 }, { "B+": 71 }, { "B": 61 },
//         { "C+": 51 }, { "C": 41 }, { "D": 33 }, { "F": 0 }
//     ];
//     const gradeMaxMarks = [
//         { "A+": 100 }, { "A": 90 }, { "B+": 80 }, { "B": 70 },
//         { "C+": 60 }, { "C": 50 }, { "D": 40 }, { "F": 32 }
//     ];
//     const coScholastic = ['work education', 'arts education', 'discipline'];
//     const templateData = {
//         templateName: "T6",
//         examStructure: {
//             term1: {
//                 theoryMaxMarks: 100,
//                 theoryPassMarks: 33,
//                 practicalMaxMarks: 25,
//                 gradeMinMarks: gradeMinMarks,
//                 gradeMaxMarks: gradeMaxMarks,
//                 coScholastic: coScholastic,
//             },

//         }
//     };
//     try {

//         let examResultStructure = await MarksheetTemplateStructureModel.create(templateData)
//         return res.status(200).json('Exam result structure structure add successfully.');

//     } catch (error) {
//         return res.status(500).json('Internal Server Error !');;
//     }

//     // TEMPLATE T1 OR T2 SECTION

//     // const gradeMinMarks = [
//     //     { "A1": 91 }, { "A2": 81 }, { "B1": 71 }, { "B2": 61 },
//     //     { "C1": 51 }, { "C2": 41 }, { "D": 33 }, { "F": 0 }
//     // ];
//     // const gradeMaxMarks = [
//     //     { "A1": 100 }, { "A2": 90 }, { "B1": 80 }, { "B2": 70 },
//     //     { "C1": 60 }, { "C2": 50 }, { "D": 40 }, { "F": 32 }
//     // ];
//     // const coScholastic = ['work education', 'arts education','discipline'];
//     // const templateData = {
//     //     templateName: "T1",
//     //     examStructure: {
//     //         term1: {
//     //             theoryMaxMarks: 80,
//     //             theoryPassMarks: 27,
//     //             periodicTestMaxMarks: 10,
//     //             noteBookMaxMarks: 5,
//     //             subjectEnrichmentMaxMarks: 5,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         },
//     //         term2: {
//     //             theoryMaxMarks: 80,
//     //             theoryPassMarks: 27,
//     //             periodicTestMaxMarks: 10,
//     //             noteBookMaxMarks: 5,
//     //             subjectEnrichmentMaxMarks: 5,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         }
//     //     }


//     // TEMPLATE T3 OR T4 SECTION

//     // const gradeMinMarks = [
//     //     { "A1": 91 }, { "A2": 81 }, { "B1": 71 }, { "B2": 61 },
//     //     { "C1": 51 }, { "C2": 41 }, { "D": 33 }, { "F": 0 }
//     // ];
//     // const gradeMaxMarks = [
//     //     { "A1": 100 }, { "A2": 90 }, { "B1": 80 }, { "B2": 70 },
//     //     { "C1": 60 }, { "C2": 50 }, { "D": 40 }, { "F": 32 }
//     // ];
//     // const coScholastic = ['work education', 'arts education','discipline'];
//     // const templateData = {
//     //     templateName: "T3",
//     //     examStructure: {
//     //         term1: {
//     //             theoryMaxMarks: 80,
//     //             theoryPassMarks: 27,
//     //             practicalMaxMarks: 20,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         },
//     //         term2: {
//     //             theoryMaxMarks: 80,
//     //             theoryPassMarks: 27,
//     //             practicalMaxMarks: 20,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         }
//     //     }


//     // TEMPLATE T5 SECTION

//     // const gradeMinMarks = [
//     //     { "A+": 91 }, { "A": 81 }, { "B+": 71 }, { "B": 61 },
//     //     { "C+": 51 }, { "C": 41 }, { "D": 33 }, { "F": 0 }
//     // ];
//     // const gradeMaxMarks = [
//     //     { "A+": 100 }, { "A": 90 }, { "B+": 80 }, { "B": 70 },
//     //     { "C+": 60 }, { "C": 50 }, { "D": 40 }, { "F": 32 }
//     // ];
//     // const coScholastic = ['work education', 'arts education', 'discipline'];
//     // const templateData = {
//     //     templateName: "T6",
//     //     examStructure: {
//     //         term1: {
//     //             theoryMaxMarks: 75,
//     //             theoryPassMarks: 25,
//     //             practicalMaxMarks: 25,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         },

//     //     }
//     // }


//     // TEMPLATE T6 SECTION

//     // const gradeMinMarks = [
//     //     { "A+": 91 }, { "A": 81 }, { "B+": 71 }, { "B": 61 },
//     //     { "C+": 51 }, { "C": 41 }, { "D": 33 }, { "F": 0 }
//     // ];
//     // const gradeMaxMarks = [
//     //     { "A+": 100 }, { "A": 90 }, { "B+": 80 }, { "B": 70 },
//     //     { "C+": 60 }, { "C": 50 }, { "D": 40 }, { "F": 32 }
//     // ];
//     // const coScholastic = ['work education', 'arts education', 'discipline'];
//     // const templateData = {
//     //     templateName: "T6",
//     //     examStructure: {
//     //         term1: {
//     //             theoryMaxMarks: 100,
//     //             theoryPassMarks: 33,
//     //             gradeMinMarks: gradeMinMarks,
//     //             gradeMaxMarks: gradeMaxMarks,
//     //             coScholastic: coScholastic,
//     //         },

//     //     }
//     // }




// }

let DeleteResultStructure = async (req, res, next) => {
    try {
        const id = req.params.id;
        const resultStr = await MarksheetTemplateModel.findOne({ _id: id });
        if (!resultStr) {
            return res.status(200).json('Marksheet template not found.');
        }
        const { adminId, class: className, stream, templateName } = resultStr;
        const deleteResultStructure = await MarksheetTemplateModel.findByIdAndRemove(id);
        if (deleteResultStructure) {
            const result = await ExamResultModel.findOne({ adminId: adminId, class: className, stream: stream});
            if (!result) {
                return res.status(200).json('Marksheet template not found.');
            }
            const deleteResult = await ExamResultModel.deleteMany({ adminId: adminId, class: className, stream: stream,});
            if (deleteResult) {
                return res.status(200).json('Marksheet template delete successfully.');
            }
        }
    } catch (error) {
        return res.status(500).json('Internal Server Error !');;
    }
}
let ChangeResultPublishStatus = async (req, res, next) => {
    try {
        const id = req.params.id;
        const examResultStr = await ExamResultStructureModel.findOne({ _id: id });
        if (!examResultStr) {
            return res.status(200).json('Exam result structure not found !');
        }
        const findResultPublishStatus = examResultStr.resultPublishStatus;
        const adminId = examResultStr.adminId;
        const cls = examResultStr.class;
        const stream = examResultStr.stream;
        const examType = examResultStr.examType;

        const isExamResultExist = await ExamResultModel.findOne({ adminId: adminId, class: cls, stream: stream, examType: examType });
        if (!isExamResultExist && findResultPublishStatus == false) {
            return res.status(404).json('Exam result not found !');
        }
        let title = '';
        let message = '';
        if (findResultPublishStatus == false) {
            let className;
            if (cls == 1) {
                className = `${cls}st`
            }
            if (cls == 2) {
                className = `${cls}nd`
            }
            if (cls == 3) {
                className = `${cls}rd`
            }
            if (cls >= 4 && cls <= 12) {
                className = `${cls}th`
            }
            if (cls == 200) {
                className = `Nursery`;
            }
            if (cls == 201) {
                className = `LKG`;
            }
            if (cls == 202) {
                className = `UKG`;
            }
            title = `Class ${className} ${examType} exam results announcement : Check Online and Download Your Results`;
            message = `All class ${className} students are informed that the online results for their ${examType} exams are being announced. You can check your results by visiting the school's website and download them online using the credentials provided by your school. We wish you the best of luck in achieving good results.`
        }
        const { resultPublishStatus } = req.body;
        const resultPublishData = {
            resultPublishStatus: resultPublishStatus
        }
        const updateStatus = await ExamResultStructureModel.findByIdAndUpdate(id, { $set: resultPublishData }, { new: true });
        if (updateStatus) {
            const notification = await NotificationModel.findOne({ class: cls, title: title });
            if (!notification && title !== '') {
                const notificationData = {
                    title: title,
                    message: message,
                    role: 'Student',
                    class: cls,
                    date: Date.now(),
                }
                let createNotification = await NotificationModel.create(notificationData);
                if (createNotification) {
                    return res.status(200).json('Exam result publish status update successfully.');
                }
            }
            return res.status(200).json('Exam result publish status update successfully.');
        }

    } catch (error) {
        return res.status(500).json('Internal Server Error !');
    }
}

module.exports = {
    GetSingleClassMarksheetTemplateByStream,
    GetSingleClassExamResultStructureByStream,
    CreateExamResultStructure,
    ChangeResultPublishStatus,
    DeleteResultStructure

}