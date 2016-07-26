$(document).ready(function(){

  var Calculator = {
    input: [],
    eqn: '',
    result: '',
    dot: false,
    operators: [' + ',' - ', ' ÷ ', ' × '],
    displayEquation: function() {
      $('.eqn').html(this.input.join(''));
    },
    keyHandler: function(key) {
      // Clear result upon key or operator button click
      this.result = '';
      $('.result').html(this.result);

      // Use html value of button
      var value = key.html();

      // If operator, make sure to add space on either side for equation
      // Also, reset dot flag
      if (key.hasClass('operator')) {
        Calculator.dot = false;
        value = ' ' + value + ' ';
      } else {
        // If dot character, make sure it hasn't already been used in current number
        // If dot character has been used, then do nothing upon dot button click
        if (value === '.' && !Calculator.dot) {
          Calculator.dot = true;
        } else if (value === '.' && Calculator.dot) {
          return;
        }
      }
      Calculator.input.push(value);
      Calculator.displayEquation();
    },
    evaluate: function() {
      // If equation ends in operator
      if (this.operators.indexOf(this.input[this.input.length-1]) > 1) {
        // handle don't start with or end with operator
        alert('Equation ends with operator!');
      }

      // Replace all instances of × and ÷ with * and / respectively.
      // This can be done easily using regex and the global  which will
      // replace all instances of the matched character/substring
      var inputStr = this.input.join('');
      inputStr = inputStr.replace(/÷/g,'/').replace(/×/g,'*').replace(/\s+/g,'');

      // Use regex to make sure 2 or more operators are not used in a row
      var re = /\+{2,}|\-{2,}|\/{2,}|\*{2,}/g;
      console.log(inputStr);
      if (re.test(inputStr)) {
        alert('Too many operators in a row!');
      }

      // Valid input if reached this point, thus evaluate string and update results
      this.result = eval(inputStr);
      $('.result').html(this.result);
    },
    clearEntry: function() {
      // Remove last entry from equation (value or operator)
      this.input.pop();
      this.displayEquation();
    },
    clearAll: function() {
      this.input = [];
      this.result = '0';
      this.eqn = ''
      this.displayEquation();
      $('.result').html(this.result);
    }
  };

  // Key button click: handles key click event
  $('button').not('.equals, .clear, .clearall').on('click', function() {
    var key = $(this);
    Calculator.keyHandler(key);
  });

  // Equals button click: evaluates valid input and displays result
  $('.equals').on('click', function() {
    Calculator.evaluate();
  });

  // CE: clear entry, clears entry of calculator
  $('.clear').on('click', function() {
    // Remove last entry from equation (value or operator)
    Calculator.clearEntry();
  });

  // AC: all clear function, clears entire input string
  $('.clearall').on('click', function() {
    Calculator.clearAll();
  });
});
