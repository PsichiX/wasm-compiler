var req = new XMLHttpRequest();
req.open("GET", "/test2.wasm", true);
req.responseType = "arraybuffer";
req.onload = function (oEvent) {
  var arrayBuffer = req.response;
  if (arrayBuffer) {
    var byteArray = new Uint8Array(arrayBuffer);
    var module = new WebAssembly.Module(byteArray);
    var imports = {
      helpers: {
        one: function() { return 1; },
        out: function(v) { document.write('value: ' + v + '<br/>'); return v; },
        addr: function(v) { document.write('address: ' + v + '<br/>'); }
      }
    };
    var instance = new WebAssembly.Instance(module, imports);
  }
};

req.send(null);
