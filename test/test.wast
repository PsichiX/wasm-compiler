(module
  (start $main)
  (import "helpers" "one" (func $one (result i32)))
  (import "helpers" "out" (func $out (param i32) (result i32)))
  (func $inc (param $a i32) (result i32)
    get_local $a
    call $one
    i32.add
  )
  (func $main
    i32.const 0
    call $inc
    call $out
    call $inc
    call $out
    call $inc
    call $out
    call $inc
    call $out
    return
  )
)
