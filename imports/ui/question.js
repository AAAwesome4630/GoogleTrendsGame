import { Template } from 'meteor/templating';

import { Questions } from '../api/questions.js';

import { Random } from 'meteor/random';

import { Session } from 'meteor/session';

import './question.html';

import { Tracker } from 'meteor/tracker'

Template.question.events({

  'click .ques'(){

  }

});


Template.question.helpers({

});


Template.question.onRendered(function (){
  this.autorun(function (){
    Template.currentData();
    var temp = Template.currentData();
    console.log(temp);

    var choices = [".ans1", ".ans2", ".ans3", ".ans4"];
    var correct = Random.choice(choices);
    choices.splice(choices.indexOf(correct),1);
    var wrongOne = Random.choice(choices);
    choices.splice(choices.indexOf(wrongOne),1);
    var wrongTwo = Random.choice(choices);
    choices.splice(choices.indexOf(wrongTwo),1);
    var wrongThree = choices[0];
    console.log(correct);
    const instance = Template.instance();
    console.log(instance.data);
    instance.$(correct).text(temp.answer);
    instance.$(wrongOne).text(temp.wrongFirst);
    instance.$(wrongTwo).text(temp.wrongSecond);
    instance.$(wrongThree).text(temp.wrongThird);
    // document.getElementById(correct).innerHTML = answer;
    // document.getElementById(wrongOne).innerHTML = Template.currentData().wrongFirst;
    // document.getElementById(wrongTwo).innerHTML = Template.currentData().wrongSecond;
    // document.getElementById(wrongThree).innerHTML = Template.currentData().wrongThird;

  });

});

// Template.question.onDestroyed(function () {
//
//
//
// })
