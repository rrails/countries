$(document).ready(function(){
var pointer = 0;
var step1 = 20;
var done = false;
var $content = $('#content')
var template_str = $('#country_template').html(); //fetch the html
var template_f = Handlebars.compile(template_str); //turn it into a template function

function populateCountries() {
  if (done == false){
    $.ajax({
      url: '/countries/' + step1 + '/' + pointer,
      dataType: 'JSON'
    }).done(function (results){
      console.log(results,results.length)
      if (results.length <= 0){
        done = true;
      } else {
        $.each(results,function(i,result){
          $content.append(template_f(result));
        });
        pointer = pointer + step1;
      };
    });
  };
};

function populateAll() {

}



// Create the event bindings
  // Demonstrates using a function name as the event handler instead of including the function inside (like we're used to seeing)
  // This is useful when re-binding events (certain events are unbound when clicking on the various buttons)
  $('#populate-button').click(populateCountries);
  $('#all-button').click(allButtonClick);
  $('#reset-button').click(function() {
    // this function resets the button and scroll bindings, and sets pointer to 0
    pointer = 0;
    $('#content').html('');
    $(window).unbind('scroll').scroll(scrollFunction);
    // $('#populate-button').unbind('click').click(populateCountries);
    $('#all-button').unbind('click').click(allButtonClick);
  });

  $(window).scroll(scrollFunction);

  function scrollFunction() {
    var win = $(window);
    // Infinite scroll math!
    if(win.height() + win.scrollTop() >= $(document).height()) {
      populateCountries();
    }
  }

  // Disables other buttons and scroll event so we don't get duplicate data
  // This serves as a demonstration; we could also just set pointer = false
  function allButtonClick() {
    $(window).unbind('scroll');
    $('#populate-button').unbind('click');
    $('#all-button').unbind('click');
    populateAll();
  }
  // populateCountries();

});
