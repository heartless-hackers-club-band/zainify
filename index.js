var mocha = require('mocha');
var chai = require('chai');
var expect = require('chai').expect;
var fs = require('fs');
var nlp_compromise = require('nlp_compromise');
var utils = require('./helpers/utils');


//read in the resume file
var resume = fs.readFileSync(__dirname + "/resumes/demoResume.txt",'utf8');

var sections = utils.parseSections(resume);

console.log("-------------------------------------------",sections);  


//test does it include technical skills, * projects, professional experience, education


describe('The resume', function() {
	it('should contain a phone number', function() {
		var validPhoneNumber = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;
		var phoneNumberChecker = function(re, str) {
		  return re.test(str);
		}; 
		var hasPhoneNumber = phoneNumberChecker(validPhoneNumber, sections.top);
		expect(hasPhoneNumber).to.equal(true);
	});
});

