Template.questions.helpers({
    'questions': function() {
        return Questions.find().map(function(question, idx) {
            question.i = idx;
            return question;
        });
    }
});
