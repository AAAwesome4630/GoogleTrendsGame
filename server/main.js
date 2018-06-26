import { Meteor } from 'meteor/meteor';
import { EJSON } from 'meteor/ejson';
import { HTTP } from 'meteor/http';
import { check } from 'meteor/check';
import '../imports/api/questions.js';
import '../imports/api/games.js';
import googleTrends from 'google-trends-api';
import { Questions } from '../imports/api/questions.js'
import { Games } from '../imports/api/games.js'

//const googleTrends = require('google-trends-api');

var Future = Npm.require( 'fibers/future' );

Meteor.startup(() => {
  // code to run on server at startup
});
Meteor.methods({

  getRandomWords: function(num) {

    //this.unblock();
    var url = 'https://andruxnet-random-famous-quotes.p.mashape.com/'
    //var url = 'https://jsonplaceholder.typicode.com/posts/1';
    //const result = HTTP.call('GET', 'https://jsonplaceholder.typicode.com/posts/1', {});
    // try{
    var result ;
    return new Promise((resolve, reject) => {
       HTTP.call('GET', url, {
        params: {"count": num.toString()},
        headers: { "X-Mashape-Key": 'I56y1jRC6HmshjbGXMqaMqVq4qTlp1XTqQPjsnVBRw5jqVtxfV', 'Accept': 'application/json' }
       }, function(error, response) {
         if(error){
           var x;
           var ret_array = [];
           for(x = 0; x < num; x++){
             ret_array[x] = "Hello"
           }
           resolve(ret_array);
         }
         else{
           result = EJSON.parse(response.content);
           var authors = [];
           var j;
           for(j = 0; j < num; j++){
             authors[j] = result[j].author;
           }
           resolve(authors);
         }

       });
     });
  },


  getGoogleQuestions: function(arrayWords){

    var x;
    var length = arrayWords.length;
    var game_id = Games.insert({"numberOfQuestions": length});
    for ( x = 0; x < arrayWords.length; x++){
      console.log(arrayWords[x]);
      var word = arrayWords[x].toString();
      Meteor.call('makeQuestion', word, game_id)
      // googleTrends.interestByRegion({
      //   keyword: word,
      //   startTime: new Date('2017-01-01'),
      //   endTime: new Date('2017-12-31'),
      //   geo: 'US',
      // })
      // .then((res) => {
      //   var result = EJSON.parse(res);
      //   console.log(res);
      //   var correct = result.default.geoMapData[0].geoName;
      //   console.log(correct);
      //   var one = result.default.geoMapData[1].geoName;
      //   console.log(one);
      //   var two = result.default.geoMapData[2].geoName;
      //   console.log(two);
      //   var three = result.default.geoMapData[3].geoName;
      //   console.log(three);
      //   Meteor.call('questions.insert', word, correct, one, two, three);
      // })
      // .catch((err) => {
      //   console.log(err);
      // })


    };
    return game_id;

  },

  makeQuestion: function(word, game_id){
    googleTrends.interestByRegion({
      keyword: word,
      startTime: new Date('2017-01-01'),
      endTime: new Date('2017-12-31'),
      geo: 'US',
    })
    .then((res) => {
      var result = EJSON.parse(res);
      var correct = result.default.geoMapData[0].geoName;
      console.log(correct);
      var one = result.default.geoMapData[1].geoName;
      console.log(one);
      var two = result.default.geoMapData[2].geoName;
      console.log(two);
      var three = result.default.geoMapData[3].geoName;
      console.log(three);
      Meteor.call('questions.insert', word, correct, one, two, three, game_id);
    })
    .catch((err) => {
      console.log(err);
    })
  }

})
