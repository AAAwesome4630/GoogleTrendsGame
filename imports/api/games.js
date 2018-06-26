import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
export const Games = new Mongo.Collection('games');

Meteor.methods({
  'games.insert'(numberOfQuestions) {
    check(numberOfQuestions, Number);

    Games.insert({
      numberOfQuestions,
    });
  },

  'games.remove'(gameId) {
    check(gameId, String);

    Games.remove(gameId);
  }
})
