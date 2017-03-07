describe('Calculator', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-calculator>', function () {
    var home = element(by.css('my-app my-calculator'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Calculator Works!");
  });
});
