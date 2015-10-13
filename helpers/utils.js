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

module.exports.parseSections = parseSections;