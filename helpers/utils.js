var _ = require('underscore');
var nlp = require('nlp_compromise');

var parseSections = function(str) {
  var projTest = /projects/i;
  var expTest = /professional/i;
  var start = str.match(projTest).index;
  var end = str.match(expTest).index;

  return {
    top: str.substring(0, start),
    project: str.substring(start, end),
    bottom: str.substring(end, str.length)
  };
};

// returns array of repeated verb objects that include all forms (past present etc);
// or the first verb that is above the limit
var findRepeatedVerbs = function(verbs, limit) {
  var results = [];
  //generate all possible verb forms
  normVerbs = _.map(verbs, function(verb) { 
    return verb.analysis.conjugate(); 
  });
  //then sort by thier past tense to find duplicates
  normVerbs = _.sortBy(normVerbs, function(verb) { 
    return verb.past; 
  });
  //find what is repeated, and return the first word that is repeated above limit 
    // -- indicates what to fix in mocha test result
  var max = 1;
  for(var i = 0; i < normVerbs.length-1; i++){
    if(normVerbs[i].past === normVerbs[i+1].past) { 
      max++; 
    }
    if(normVerbs[i].past !== normVerbs[i+1].past) { 
      max = 1; 
    }
    if(max === 2) { 
      results.push(normVerbs[i+1]); 
    } 
    if(max > limit) { 
      return normVerbs[i].past; 
    }
  }
  return results;
};

var checkVerbLineDistance = function(text, verbs) {
  var test;
  var verbString='';
  for(var i = 0; i < verbs.length; i++) {
    for(var form in verbs[i]) {
      if(i+1 === verbs.length){
        verbString += verbs[i][form];
      } else { 
        verbString += verbs[i][form] + "|";
      }
    }
    verbString = verbString.substring(0, verbString.length-1);
    test = new RegExp("(?:" + verbString + ")(.*\n.*){0,5}(" + verbString +")", 'im');
    if(!test.test(text)) {
      return verbs[i].past;
    }
  } return true;
};


module.exports.parseSections = parseSections;
module.exports.findRepeatedVerbs = findRepeatedVerbs;
module.exports.checkVerbLineDistance = checkVerbLineDistance;