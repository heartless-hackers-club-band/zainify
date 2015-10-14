var mocha = require('mocha');
var expect = require('chai').expect;
var fs = require('fs');
var nlp = require("nlp_compromise");
var utils = require('./helpers/utils');
var _ = require('underscore');

var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');
var verbs = nlp.pos(resume).verbs();

var repeateLimit = 10;
var repeatedVerbs = utils.findRepeatedVerbs(verbs, repeateLimit);

describe('Resume', function () {

  describe('Basic Reqs', function () {
    //test does it include technical skills, * projects, professional experience, education
    it('should contain the 7 key sections', function () {
      expect(resume.match(/technical skills/i)).to.not.eql(null);
      expect(resume.match(/strong/i)).to.not.eql(null);
      expect(resume.match(/experienced/i)).to.not.eql(null);
      expect(resume.match(/projects/i)).to.not.eql(null);
      expect(resume.match(/professional/i)).to.not.eql(null);
      expect(resume.match(/education/i)).to.not.eql(null);
      expect(resume.match(/personal/i)).to.not.eql(null);
    });

    it('should contain a phone number', function() {
      var hasPhoneNumber = utils.checkPhoneNumber(resume);
      expect(hasPhoneNumber).to.equal(true);
    });
  });

  describe('Verbs', function () {
    // check for repeated verbs
    it('should not be repeated more than twice', function () {
      //repeated verbs returns a single word if that word was used over the limit
      expect(repeatedVerbs).to.be.an('array');
    });

    it('should not be repeated within 5 lines of last use', function () {
      //returns true if the verbs are more than 5 lines apart, and the word if the rule is broken
      expect(utils.checkVerbLineDistance(resume, repeatedVerbs)).to.eql(true);
    });
  });
});



