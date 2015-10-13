var mocha = require('mocha');
var chai = require('chai');
var fs = require('fs');
var nlp_compromise = require('nlp_compromise');


//read in the resume file
var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');

var projSection = function(str) {
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

console.log(projSection(resume));


//test does it include technical skills, * projects, professional experience, education
