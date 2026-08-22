// @title Scum
// @by Pack

samples('http://localhost:3000/strudel.json')

setcpm(140/4)

all(x => x
  .compressor("-5:30:0:.5:.1")
  .postgain(slider(1, 0, 1))
)

$COUNTIN: s("<[sf:23!2] [sf:23 sf:23 sf:23*4@2]>").sus(0).dec(.5).gain(.8)

_$: stack(
  s("deadfx_noise:0").loopAt(8).chop(64).seg(8).vel(.5).room(.8).o(1),
  s("deadfx_noise:2").loopAt(8).chop(64).seg(8).vel(.5).room(.8).o(1),
  stack(
    s("boom [- boom] boom*2 [- boom]").vel(.7).fast(4),
    s("bdh [- bdh] bdh*2 [- bdh]").vel(.2).fast(4),
    // s("- sd").vel(3),
    s("hh").euclid(7, 16).fast(4).vel(.8),
    s("sear").chop(8).seg(16).rel(1.5),
  ).bank("deadrums").gain(2).room(.8).o(1).delay(.4).delays(1/6).delayfb(.2),
)