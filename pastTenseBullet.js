var mocha = require('mocha');
var chai = require('chai');
var fs = require('fs');
var nlp = require('nlp_compromise');
var utils = require('./helpers/utils');
var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');
var sections = utils.parseSections(resume);

// checks if bullet point start with verb in past tense 
var bulletsAreInPastTense = function() {
  var projectSection = utils.parseSections(resume).project;
  var bulletPattern = (/\*/g);
  // find all indexes with a bullet point 
  while (bullet = bulletPattern.exec(projectSection)) {
    // get substring from every bullet point
    // .split[1] is necessary to get the first word and thus verb in the bullet point 
    var verb = projectSection.substr(bullet.index, bullet.index + 10).split(' ')[1];
    // check the tense of every bullet we encounter
    if (nlp.pos(verb).tense()[0][0] !== 'past') {
      return false;
    }
  }
  return true;
};
