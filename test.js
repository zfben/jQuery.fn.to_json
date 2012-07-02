$(function(){
  test('jQuery.fn.to_json', function() {
    ok(jQuery.fn.to_json, 'function is exists');
  });
  
  test('Input Types', function(){
    deepEqual($('#InputTypes_all_types').to_json(), {
      no_type: 'no_type',
      button: 'button',
      checkbox: 'checkbox',
      date: '2012-12-21',
      datetime: 'datetime',
      'datetime-local': 'datetime-local',
      email: 'email',
      file: '',
      hidden: 'hidden',
      image: 'image',
      month: 'month',
      number: '0',
      password: 'password',
      radio: 'radio',
      range: '1',
      reset: 'reset',
      submit: 'submit',
      text: 'text',
      time: 'time',
      url: 'url',
      week: 'week',
      select: 'select',
      textarea: 'textarea',
      datalist: 'datalist'
    }, 'All Types');
    
    deepEqual($('#InputTypes_checkbox').to_json(), {
      checked: 'on'
    }, 'Checkbox');
    
    deepEqual($('#InputTypes_radio').to_json(), {
      radio_: 'checked'
    })
  });
  
  test('Data Format', function(){
    deepEqual($('#DataFormat_0').to_json(), {
      a: 'a',
      b: 'b'
    }, '{a:"a", b:"b"}');
    
    deepEqual($('#DataFormat_1').to_json(), {
      a: {
        b: 'a.b'
      }
    }, 'a:{b:"a.b"}');
    
    deepEqual($('#DataFormat_2').to_json(), {
      a: ['1', '2']
    }, 'a:["1", "2"]');
    
    deepEqual($('#DataFormat_3').to_json(), {
      a: {
        b: ['1', '2']
      },
      c: 'c'
    }, 'a:{b:["1", "2"]}, c: "c"');
    
    deepEqual($('#DataFormat_4').to_json(), {
      a: [{b: 'b'}, {c: ['1']}, {c: ['2']}]
    }, "a: [{b: 'b'}, {c: ['1']}, {c: ['2']}]");
  });
  
  test('Options', function(){
    deepEqual($('#Options_notree').to_json({tree: false}), {
      'a.b': 'a.b'
    }, "'a.b': 'a.b'");
  });
});
