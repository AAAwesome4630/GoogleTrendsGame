import { Template } from 'meteor/templating';

import { Questions } from '../api/questions.js';

import { Games } from '../api/games.js';

import { ReactiveDict } from 'meteor/reactive-dict';

import './game.html';

import './question.html';

import './question.js';

import '../api/questions.js';

import { Tracker } from 'meteor/tracker';

Template.game.onCreated( function(){
  this.state = new ReactiveDict();
  this.state.set("questionNumber", 1);
  this.state.set("score", 0)
  this.state.set("gameNotOver", true);
});


Template.game.helpers({
  currentQuestion() {
    const instance = Template.instance();
    //console.log(instance.data._id)
    var num = instance.state.get("questionNumber");
    //console.log(num);
    //console.log(Questions.find({ gameId: instance.data._id}).fetch()[num-1]);
    console.log(instance.data._id)
    instance.state.set("correctAnswer", Questions.find({ gameId: instance.data._id}).fetch()[num-1].answer )
    var x = Questions.find({ gameId: instance.data._id}).fetch().length;
    console.log(x);
    instance.state.set("numberOfQuestions", x);
    return Questions.find({ gameId: instance.data._id}).fetch()[num-1];
  },
  score(){
    const instance = Template.instance();
    return instance.state.get("score");
  },
  questionNumber(){
    const instance = Template.instance();
    return instance.state.get("questionNumber");
  },
  gameNotOver(){
    const instance = Template.instance();
    return instance.state.get("gameNotOver");
  },
  numberOfQuestions(){
    const instance = Template.instance();
    return instance.state.get("numberOfQuestions");
  }
  // gameNotOver(){
  //   const instance = Template.instance();
  //   var numQs = instance.state.get("numberOfQuestions");
  //   console.log(numQs);
  //   return (numQs > instance.state.get("questionNumber"));
  // }

});
// Template.game.onRendered(function() {
//   this.autorun(() => {
//     const instance = Template.instance();
//     var questionNumber = instance.state.get("questionNumber");
//     var choices = [".ans1", ".ans2", ".ans3", ".ans4"];
//     var correct = Random.choice(choices);
//     choices.splice(choices.indexOf(correct),1);
//     var wrongOne = Random.choice(choices);
//     choices.splice(choices.indexOf(wrongOne),1);
//     var wrongTwo = Random.choice(choices);
//     choices.splice(choices.indexOf(wrongTwo),1);
//     var wrongThree = choices[0];
//     console.log(correct);
//     console.log(instance.data);
//     instance.$(correct).text(instance.data.answer);
//     instance.$(wrongOne).text(instance.data.wrongFirst);
//     instance.$(wrongTwo).text(instance.data.wrongSecond);
//     instance.$(wrongThree).text(instance.data.wrongThird);
//   })
// })


Template.game.events({
  'click .answerChoice'(event) {
    event.preventDefault();
    console.log(event);

    const instance = Template.instance();

    const target = event.target;
    console.log(target);
    const selected = target.innerHTML;
    console.log(selected);
    if(selected == instance.state.get("correctAnswer") ){
      var num = instance.state.get("score");
      instance.state.set("score", (num + 1));
      console.log("that correct");
      $(".isCorrect").text("Correct");
      Meteor.setTimeout(function(){setStuff();}, 1000);
    }
    else{
      console.log("that wrong");
      $(".isCorrect").text("Wrong: "+ instance.state.get("correctAnswer"));
      Meteor.setTimeout(function(){setStuff();}, 1500);
    }
    function setStuff(){
      var num = instance.state.get("questionNumber");
      if(num >= instance.state.get("numberOfQuestions")){
        instance.state.set("gameNotOver", false);
      }
      instance.state.set("questionNumber", (num + 1));
      $(".isCorrect").text("");
    }



  },
  'click .replay'(event){
    event.preventDefault();
    //add logic to start new Game, or basically refresh the page, or hide
    console.log(event);
    document.location.reload(true);
  }

})
