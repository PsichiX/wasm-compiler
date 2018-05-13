# wasm-compiler
Node.js and browser WASM compiler (using Wabbit - official WebAssembly WAT-to-WASM parser)

# Install
```bash
npm install --save wasm-compiler
```

# CLI Usage
```
Usage: wasmc [options]

Opcje:
  -i, --input    Input file path                             [string] [required]
  -o, --output   Output file path                            [string] [required]
  -s, --silent   Silent                                                [boolean]
  -p, --pretty   Pretty output                                         [boolean]
  -m, --mode     Compilation mode                          [default: "wat-wasm"]
  -t, --trace    Print error stack trace                               [boolean]
  -e, --explain  Log explained WASM output                             [boolean]
  -d, --debug    Debug symbols                                         [boolean]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]

Copyright (c) 2018
```

# API Usage
```javascript
import { wat2wasm } from '@intuicio/wasm-compiler';

const script = `(module
  (func $add (export "add") (param $a i32) (param $b i32) (result i32)
    get_local $a
    get_local $b
    i32.add
  )
)`;
wat2wasm(script, { explain: true, debug: true })
  .then(bytes => console.log(bytes))
  .catch(e => console.error(e));
```

# Browser Usage
```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <script src="bin/wasm-compiler.min.js"></script>
  </head>
  <body>
    <script>
    const script = `(module
      (func $add (export "add") (param $a i32) (param $b i32) (result i32)
        get_local $a
        get_local $b
        i32.add
      )
    )`;
    WasmCompiler.wat2wasm(script, { explain: true, debug: true })
      .then(bytes => console.log(bytes))
      .catch(e => console.error(e));
    </script>
  </body>
</html>
```
