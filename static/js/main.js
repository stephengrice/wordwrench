const Main = {
  nextButton: function(elem) {
    if (elem === undefined) {
      throw "Element selector not provided";
    }
    $(elem).prop('disabled', true);
    return $(elem);
  }
};
