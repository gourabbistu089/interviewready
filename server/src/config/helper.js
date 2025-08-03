const Question = require('../models/Question');


const addIsRevisionField = async () => {
  await Question.updateMany(
    {}, // Only those that don't already have it
    { $unset: { isRevision: "" } }
  );
  console.log('✅ All questions updated with isRevision = false');
};

const User = require('../models/User');

const addRevisionQuestionsField = async () => {
  await User.updateMany(
    { revisionQuestions: { $exists: false } }, // filter: users without the field
    { $set: { revisionQuestions: [] } }        // update: set it to an empty array
  );

  console.log('✅ All users updated with revisionQuestions: [] if missing');
};


module.exports = {
    addIsRevisionField,
    addRevisionQuestionsField
}