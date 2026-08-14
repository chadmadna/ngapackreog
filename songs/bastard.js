// @title Bastard
// @by Pack

samples('http://localhost:3000/strudel.json')
/*
░   ░░░  ░░░      ░░░░      ░░░       ░░░░      ░░░░      ░░░  ░░░░  ░░       ░░░        ░░░      ░░░░      ░░
▒    ▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒  ▒▒  ▒▒▒  ▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒▒  ▒▒▒▒  ▒▒  ▒▒▒▒▒▒▒
▓  ▓  ▓  ▓▓  ▓▓▓   ▓▓  ▓▓▓▓  ▓▓       ▓▓▓  ▓▓▓▓  ▓▓  ▓▓▓▓▓▓▓▓     ▓▓▓▓▓       ▓▓▓      ▓▓▓▓  ▓▓▓▓  ▓▓  ▓▓▓   ▓
█  ██    ██  ████  ██        ██  ████████        ██  ████  ██  ███  ███  ███  ███  ████████  ████  ██  ████  █
█  ███   ███      ███  ████  ██  ████████  ████  ███      ███  ████  ██  ████  ██        ███      ████      ██
*/

all(x => x
  .postgain(slider(1, 0)) 
)

setcpm(145/4)

const countin = s("<[sf:23!2] [sf:23 sf:23 sf:23*4@2]>").sus(0).dec(.5)
const hit = s("hit").bank("deadrums").gain(.8)

const synth = {
  intro: note("f2 f3 c3@2 fs2 fs3 cs3@2 g2 g3 d3@2 [g2,g3,cs3]@4").slow(4).s("supersaw").rel(".4@3 3".slow(4)).hpf(500).gain(1.1),
  verse: note("[g1,d2,g2]!4 [as1,f2,as2]!4 [a1,e2,a2]!8").slow(2).s("supersaw").rel(.4).hpf(500).gain(1.1),
  break1: note("[g2,d3]!7 [fs2,cs3]").s("supersaw").rel(.4).hpf(500).gain(1.1),
  break2: note("g1,d3,g2").slow(4).s("supersaw").rel(3).hpf(500).gain(1.1),
  bridge1: note("[g1,d2,g2] [as1,f2,as2] [a1,e2,a2]@2").slow(4).s("supersaw").rel(.4).hpf(500).gain(1.1),
  bridge2: note("g2 g3 d3@2 as2 as3 f3@2 a2 a3 e3@6").slow(4).s("supersaw").rel(1).hpf(500).gain(1.1),
}

const drums = {
  verse: stack(
    s("boom [- boom] boom*2 [- boom]").dec(.34).vel(.8),
    s("[- sd]*2"),
    s("[oh hh]!4").vel(.31),
  ).bank("deadrums").gain(2),
  chorus: stack(
    s("[boom*8]!3 [boom*4 boom*2]").slow(4).dec(.34).vel(.7),
    s("[[- sd]*8]!3 [[- sd]*4 -]").slow(4).vel(.5),
    s("-!3 [- <[[ht*2 sd*2]*2] [ht*2 lt*2 bd*2 sd*2]>]").slow(4).vel(.8),
    s("[[oh hh]*4]!3 [[oh hh]*2 <[hit oh]*2 ->]").vel(.31).slow(4),
  ).bank("deadrums").gain(2),
  break1: stack(
    s("boom - - [- boom]").dec(.34).vel(.8),
    s("[- [sd]]*2"),
    s("[- [bl]]*2").vel(.7),
    s("- cr!3").dec(.34).vel(.6).room(.8),
  ).bank("deadrums").gain(2),
  break2: stack(
    s("boom - - -").dec(.34).vel(.8),
    s("[- [sd]]"),
    s("[- [bl]]").vel(.7),
    s("oh!4").dec(.34).vel(.6).room(.8),
  ).bank("deadrums").gain(2),
  bridge1: stack(
    s("boom - - -").dec(.34).vel(.8),
    s("bdh - - -").dec(.34).vel(.4).striate(64),
    s("- <[cr,sd] [cr,[sd]*2]>").vel(.8),
    s("oh!4").dec(.34).vel(.6).room(.8),
  ).bank("deadrums").gain(2),
  bridge2: stack(
    s("[boom,bdh]").slow(2).dec(.34).vel(.6).striate(128),
    s("bl bl*2 bl bl bl*2 bl*2 bl bl*2").vel(.3).delays(1/8).delay(.8),
  ).bank("deadrums").gain(2),
} 

$ARR: arrange(
  [4, stack(
    synth.intro,
  )],
  [2, stack(
    countin,
  )],
  [8, stack(
    hit.slow(4),
    drums.verse,
    synth.verse,
  )],
  [8, stack(
    hit.slow(4),
    drums.chorus,
    synth.verse,
  )],
  [8, stack(
    hit.slow(4),
    drums.verse,
    synth.verse,
  )],
  [8, stack(
    hit.slow(4),
    drums.break1,
    synth.break1,
  )],
  [8, stack(
    hit.slow(4),
    drums.chorus,
    synth.verse,
  )],
  [4, stack(
    hit.slow(4),
    drums.break2,
    synth.break2,
  )],
  [16, stack(
    hit.slow(4),
    drums.bridge1,
    synth.bridge1
  )],
  [16, stack(
    hit.slow(4),
    drums.bridge2,
    synth.bridge2,
  )],
  [8, stack(
    hit.slow(4),
    drums.chorus,
    synth.verse,
  )],
  [1024, s("-")]
)

await initHydra({ detectAudio: true })

a.show()
a.setSmooth(0.3)
a.setCutoff(.4)
a.setScale(3)
a.setBins(4)

solid(0)
  .blend(
    src(s1)
    .saturate(3)
    .scale(() => 1 + a.fft[0])
    .modulate(s2, () => a.fft[0] * 3)
    .brightness(-.05)
    .posterize(() => Math.max(a.fft[0] * 20, 10)),
  .8)
  .modulateScale(osc(60000, 0), () => a.fft[0] * .3)
  .pixelate(() => (a.fft[3] * 1000) + 400, () => (a.fft[3] * 1000) + 400)
  .contrast(1.5)
  .add(src(s1)
    .modulate(src(s2), a.fft[0]), () => a.fft[0] + .3)
  .diff(src(s2)
    .modulate(src(s2)
      .rotate(() => a.fft[3]), () => a.fft[0] * 2), () => a.fft[1] * 2)
  .diff(src(s2)
    .modulate(src(s2), .2), () => a.fft[0] * .8)
  .saturate(0)
  .brightness(.8)
  .blend(src(o0), .8)
  .contrast(.8)
  .out(o0)

s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExazl2a3k5aXBzcGIwNTgydGhrcnc3dHY2bTdnM2k2NTNyOHE0d2lhZSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cs0bPwCXUvbfuMthGp/giphy.mp4')
s2.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExejhqZDFtNHkxdzZvNzMybmRnN2dxa3QzZHFia3ZxOG0xZ255MXZpNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UfetBibUZor7i/giphy.mp4')
