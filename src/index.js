import wabt from '../lib/libwabt';

export function wat2wasm(filename, source, { explain = false, debug = false }) {
  if (typeof source !== 'string') {
    throw new Error('`source` is not type of String!');
  }

  return wabt.ready
    .then(() => {
      const module = wabt.parseWat(filename, source);
      module.resolveNames();
      module.validate();
      const result = module.toBinary({
        log: !!explain,
        write_debug_names: !!debug,
      });
      if (!!explain) {
        console.log(result.log);
      }
      return [ module, result.buffer ];
    })
    .then(r => {
      r[0].destroy();
      return r[1];
    });
}

export function wasm2wat(source, { debug = false, pretty = false }) {
  if (!(source instanceof Uint8Array)) {
    throw new Error('`source` is not type of Uint8Array!');
  }

  return wabt.ready
    .then(() => {
      const module = wabt.readWasm(source, {
        readDebugNames: !!debug
      });
      if (!!debug) {
        module.generateNames();
        module.applyNames();
      }
      return [ module, module.toText({
        foldExprs: pretty,
        inlineExport: pretty
      }) ];
    })
    .then(r => {
      r[0].destroy();
      return r[1];
    });
}
