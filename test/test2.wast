(module
  (start $main)
  (import "helpers" "out" (func $out (param i32) (result i32)))
  (import "helpers" "addr" (func $addr (param i32)))
  (memory 1)
  (func $memInit
    i32.const 0
    i32.const 4
    i32.store
  )
  (func $memCurrAddr (result i32)
    i32.const 0
    i32.load
  )
  (func $memShiftCurrAddr (param $bytes i32)
    i32.const 0
    call $memCurrAddr
    get_local $bytes
    i32.add
    i32.store
  )
  (func $push (param $v i32)
    call $memCurrAddr
    get_local $v
    i32.store
    i32.const 4
    call $memShiftCurrAddr
  )
  (func $pop (result i32)
    i32.const -4
    call $memShiftCurrAddr
    call $memCurrAddr
    i32.load
  )
  (func $main
    call $memInit

    call $memCurrAddr
    call $addr
    i32.const 42
    call $out
    call $push

    call $memCurrAddr
    call $addr
    i32.const 8
    call $out
    call $push

    call $pop
    call $out
    drop
    call $memCurrAddr
    call $addr

    call $pop
    call $out
    drop
    call $memCurrAddr
    call $addr
  )
)
