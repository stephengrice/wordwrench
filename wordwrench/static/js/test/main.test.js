QUnit.test("main class is imported", function( assert ) {
  assert.ok(Main != undefined, "Main class is imported");
});
QUnit.test("next button fails without selector argument", function(assert) {
  assert.throws(function() {
    Main.nextButton();
  });
});
QUnit.test("next button is disabled by default", function(assert) {
  assert.ok(Main.nextButton('#btn_next').prop('disabled'))
});
