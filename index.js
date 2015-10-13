var mocha = require('mocha');
var chai = require('chai');
var fs = require('fs');
var nlp_compromise = require('nlp_compromise');
var utils = require('./helpers/utils');


//read in the resume file
var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');

var sections = utils.parseSections(resume);

console.log("-------------------------------------------",sections);  


//test does it include technical skills, * projects, professional experience, education
