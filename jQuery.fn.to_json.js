(function(){
  var $ = this.jQuery;
  
  var get_data_node = function(data, keys){
    var node = data;
    for(i in keys){
      var key = keys[i];
      if(/\[\]$/.test(key)){
        key = key.substring(0, key.length - 2);
        if(typeof node[key] === 'undefined'){
          node[key] = []
        }
      }else{
        if(typeof node[key] === 'undefined'){
          node[key] = {}
        }
      }
      node = node[key];
    }
    return node;
  }
  
  $.fn.to_json = function(opts){
    if(typeof opts === 'undefined'){
      opts = {
        tree: true
      };
    }
    var data = {};
    this.find(':input').each(function(){
      var self = $(this);
      var name = self.attr('name');
      var type = self.attr('type');
      if(typeof type === 'undefined'){
        type = self[0].tagName;
      }
      var value = self.val();
      
      if(typeof name === 'undefined' || name === null || name === ''){
        return true;
      }
      
      switch(type){
        case 'checkbox':
        case 'radio':
          if(!self.is(':checked')){
            return true;
          }
          break;
        case 'INPUT':
          if(value === '' && typeof self.attr('list') !== 'undefined'){
            value = $('#' + self.attr('list') + ' :selected').val();
          }
          break;
      }
      
      if(opts.tree){
        var keys = name.split('.');
        if(keys.length > 1){
          var key = keys.pop();
          var node = get_data_node(data, keys);
        }else{
          var key = keys[0];
          var node = data;
        }
      }else{
        var key = name;
        var node = data;
      }
      
      if(/\[\]$/.test(key)){
        key = key.substring(0, key.length - 2);
        if($.isArray(node)){
          var obj = {};
          obj[key] = [value];
          node.push(obj);
        }else{
          if(typeof node[key] === 'undefined'){
            node[key] = [value];
          }else{
            node[key].push(value);
          }
        }
      }else{
        if($.isArray(node)){
          var obj = {};
          obj[key] = value;
          node.push(obj);
        }else{
          node[key] = value;
        }
      }

    });
    return data;
  }
}).call(this);
