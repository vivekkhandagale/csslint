(function(){

    /*global YUITest, CSSLint*/
    var Assert = YUITest.Assert;

    YUITest.TestRunner.add(new YUITest.TestCase({

        name: "Lint XML formatter test",
        
        "File with no problems should say so": function(){
            var result = { messages: [], stats: [] },
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lint>\n</lint>";
            Assert.areEqual(expected, CSSLint.format(result, "FILE", "lint-xml"));
        },

        "File with problems should list them": function(){
            var result = { messages: [
                     { type: "warning", line: 1, col: 1, message: "BOGUS", evidence: "ALSO BOGUS", rule: [] },
                     { type: "error", line: 2, col: 1, message: "BOGUS", evidence: "ALSO BOGUS", rule: [] }
                ], stats: [] },
                file = "\n  <file name=\"FILE\">",
                error1 = "\n    <issue line=\"1\" char=\"1\" severity=\"warning\" reason=\"BOGUS\" evidence=\"ALSO BOGUS\"/>",
                error2 = "\n    <issue line=\"2\" char=\"1\" severity=\"error\" reason=\"BOGUS\" evidence=\"ALSO BOGUS\"/>",
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lint>" + file + error1 + error2 + "\n  </file>\n</lint>";
            Assert.areEqual(expected, CSSLint.format(result, "FILE", "lint-xml"));
        },

        "Formatter should escape double quotes": function() {
            var doubleQuotedEvidence = 'sneaky, "sneaky"',
                result = { messages: [
                     { type: "warning", line: 1, col: 1, message: "BOGUS", evidence: doubleQuotedEvidence, rule: [] },
                     { type: "error", line: 2, col: 1, message: "BOGUS", evidence: doubleQuotedEvidence, rule: [] }
                ], stats: [] },
                file = "\n  <file name=\"FILE\">",
                error1 = "\n    <issue line=\"1\" char=\"1\" severity=\"warning\" reason=\"BOGUS\" evidence=\"sneaky, 'sneaky'\"/>",
                error2 = "\n    <issue line=\"2\" char=\"1\" severity=\"error\" reason=\"BOGUS\" evidence=\"sneaky, 'sneaky'\"/>",
                expected = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<lint>" + file + error1 + error2 + "\n  </file>\n</lint>";
            Assert.areEqual(expected, CSSLint.format(result, "FILE", "lint-xml"));
        }
    }));
})();
