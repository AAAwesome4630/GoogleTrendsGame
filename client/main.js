import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Meteor } from 'meteor/meteor';
import { Questions } from '../imports/api/questions.js';
import { Games } from '../imports/api/games.js'

import './main.html';

import '../imports/ui/question.js';
import '../imports/ui/game.js';

Template.body.onCreated(function(){
  this.state = new ReactiveDict();
  this.state.set("gameNotStarted", true);
  this.state.set("gameId", "auJW8QrBY8CydGX6v")
})

Template.body.helpers({

  games(){
    const instance = Template.instance();
    var gameId = instance.state.get('gameId');

    return Games.find({"_id": gameId});
  },

  gameNotStarted(){
    const instance = Template.instance();
    return instance.state.get("gameNotStarted");
  }

});

Template.body.events({
  'submit .new-questions'(event) {
    event.preventDefault();
    const instance = Template.instance();

    const target = event.target;
    const num = target.number.value;
    if(num <= 0) {
      num = 1;
    }
    if( num > 10) {
      num = 10;
    }
    console.log(num);
    var words;
    Meteor.call('getRandomWords', num, function(error, response) {
      if(error){
        console.log(error);
      }
      else{
        console.log(response);
        words = response;
        Meteor.call('getGoogleQuestions', words, function(error, response) {
          if(error){
            console.log(error);
          }
          else{
            console.log("Should be a sucess");
            console.log(response);
            instance.state.set("gameId", response);
            Meteor.setTimeout(function(){instance.state.set("gameNotStarted", false);}, 1250);
          }
        });
      }
    });


  }
});
