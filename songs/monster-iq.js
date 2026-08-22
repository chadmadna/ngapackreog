// @title Monster IQ
// @by Pack

samples('http://localhost:3000/strudel.json')

setcpm(140/4)

all(x => x
  .compressor("-5:30:0:.5:.1")
  .postgain(slider(1, 0, 1))
)

$BGNOISE: s("deadfx_noise:0").loopAt(8).chop(64).seg(8).vel(.2).room(.8).o(1)

$: stack(
  s("deadfx_noise:2").loopAt(8).chop(64).seg(8).vel(1).jux(rev).att(.25).rel(1).room(.8).o(1),
  stack(
    s("bd*32").vel(.3),
    // s("lt [- lt] lt*2 [- lt]").vel(.7).fast(8),
    s("sd*3").vel(.7).fast(8),
    // s("oh rd").euclid(7, 16).fast(4).vel(.5),
    // s("sd | hh | sd | oh | boom | lt | ht | boom | bl | sd | boom | sd").fast(32).sometimesBy(.25, x => x.ply(2)),
  ).bank("deadrums").gain(2).room(.8).o(1).delay(.4).delays(1/6).delayfb(.2),
)