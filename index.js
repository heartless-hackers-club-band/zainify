var mocha = require('mocha');
var expect = require('chai').expect;
var fs = require('fs');
var nlp = require("nlp_compromise");
var utils = require('./helpers/utils');
var _ = require('underscore');

var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');
var verbs = nlp.pos(resume).verbs();


//read in the resume file


// var sections = utils.parseSections(resume);

//test does it include technical skills, * projects, professional experience, education

describe('resume fundementals', function () {

  it('should contain the 7 key sections', function () {
    expect(resume.match(/technical skills/i)).to.not.eql(null);
    expect(resume.match(/strong/i)).to.not.eql(null);
    expect(resume.match(/experienced/i)).to.not.eql(null);
    expect(resume.match(/projects/i)).to.not.eql(null);
    expect(resume.match(/professional/i)).to.not.eql(null);
    expect(resume.match(/education/i)).to.not.eql(null);
    expect(resume.match(/personal/i)).to.not.eql(null);
  });


});