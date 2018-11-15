$(function() {
  function quiz4_week2() {

    var quiz4input = [
      {
        '00': '290b6e3a 39155d6f',
        '10': 'd6f491c5 b645c008'
      }, {
        '00': '5f67abaf 5210722b',
        '10': 'bbe033c0 0bc9330e'
      }, {
        '00': '9d1a4f78 cb28d863',
        '10': '75e5e3ea 773ec3e6'
      }, {
        '00': '7b50baab 07640c3d',
        '10': 'ac343a22 cea46d60'
      }
    ];

    var quiz4output = {
      el: '#quiz2-4process'
    }

    // Find XOR of 0^64 and 1^32 0^32
    var q4string0 = Array.apply(null, Array(64)).map(Number.prototype.valueOf,0).join('');
    var q4string11 = Array.apply(null, Array(32)).map(Number.prototype.valueOf,1).join('');
    var q4string10 = Array.apply(null, Array(32)).map(Number.prototype.valueOf,0).join('');

    $(quiz4output.el).find('#q4xor').append('<div class="col-auto">'+ XOR_bin(q4string0,q4string11+q4string10) +'</div>');

    $.each( quiz4input, function( index, input ) {
      var process = $(quiz4output.el);
      var output = { 
        '00': ConvertBase.hex2bin(input['00'].replace(' ', '')), 
        '10': ConvertBase.hex2bin(input['10'].replace(' ', '')) 
      };
      

      process.append('<div id="q4h'+index+'" class="row"></div>');
      process.find('#q4h'+index).append('<div class="col-1"><b>N</b>: ' + index + '</div>');
      process.find('#q4h'+index).append('<div class="col-4"><b>Type</b>: HEX</div>');
      process.find('#q4h'+index).append('<div class="col-7"><b>Type</b>: BIN</div>');

      process.append('<div id="q400'+index+'" class="row"></div>');
      process.find('#q400'+index).append('<code class="col-4 offset-1 text-muted"><b>00</b>: ' + input['00'] + '</code>');
      process.find('#q400'+index).append('<code class="col-7 text-muted"><b>00</b>: ' + output['00'] + '</code>');

      process.append('<div id="q410'+index+'" class="row"></div>');
      process.find('#q410'+index).append('<code class="col-4 offset-1 text-muted"><b>10</b>: ' + input['10'] + '</code>');
      process.find('#q410'+index).append('<code class="col-7 text-muted"><b>10</b>: ' + output['10'] + '</code>');

      process.append('<div id="q410'+index+'xor" class="row mb-2"></div>');
      process.find('#q410'+index+'xor').append('<code class="col-7 offset-5 text-muted"><b>XO</b>: ' + XOR_bin(output['00'],output['10']) + '</code>');
    });
  }

  function quiz9_week2() {
    var messages = [
      {
        inp: '0110',
        out: '0011'
      }, {
        inp: '0101',
        out: '1010'
      }, { 
        inp: '1110',
        out: '0110'
      }
    ];

    $.each(messages, function(index, pair) {
      
      for( var k = 0; k <= 32; k++ ) {
        var key = pad(ConvertBase.dec2bin(k), 5);

        if( prfK5(key, pair.inp) == pad(pair.out, 5) ) {
          console.log(pair.inp + ':     ' + prfK5(key, pair.inp) + '            ' + key);
          $('#quiz2-9process').append('<div id="q29m'+ pair.inp + k + '" class="row"><div class="col-3 text-right">Msg: '+ pair.inp +'</div></div>');

          $('#quiz2-9process').find('#q29m'+ pair.inp + k).append('<div class="col-6 text-left">Key: '+ key +'</div>');
        }
      }

    });

    console.log(prfK5('00010', '1110'));
  }

  function prfK5( k, x) {
    var t = k[0];
    var out = t;

    for( var i = 1; i < 5; i++ ) {
      if( x[i-1] == 1 ) t = XOR_bin( t, k[i]);
      
      out = out + t;
    }
    return pad(out, 5); 
  }

  quiz4_week2();
  quiz9_week2();
});