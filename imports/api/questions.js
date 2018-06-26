import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Questions = new Mongo.Collection('questions');

Meteor.methods({
  'questions.insert'(word, answer, wrongFirst, wrongSecond, wrongThird, gameId) {
    check(word, String);
    check(answer, String);
    check(wrongFirst, String);
    check(wrongSecond, String);
    check(wrongThird, String);
    check(gameId, String);

    Questions.insert({
      word,
      answer,
      wrongFirst,
      wrongSecond,
      wrongThird,
      gameId
    });
  },
  
  'questions.remove'(questionId) {
    check(questionId, String);

    Questions.remove(questionId);
  },
});
