// @title Kucing Hitam
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

setcpm(145/4 + (5 * 0))

const countin = s("sf:23 sf:23 sf:23*4@2").sus(0).dec(.5)
const hit = s("hit").bank("deadrums").gain(.8)

const synth = {
  intro: note("bb1").s("deadpad").rel(.4).detune(.3).gain(1),
  verse1: note("<g2 gb2 [c2 b1]*4@2>").s("deadpad").rel(.4).detune(.3).gain(1),
  break1: note("f1").s("deadpad").rel(.4).detune(.3).gain(1),
  break2: note("f1@7 e3").s("deadpad").rel(.4).detune(.3).gain(1),
  verse2: note("<f2 e2 [c2 b1]*4@2>").s("deadpad").rel(.4).detune(.3).gain(1),
  verse3: note("[c2 b1]*2").s("deadpad").rel(.4).detune(.3).gain(1),
  outro1: note("[c2 b1 bb1 a1 ab1 g1 gb1 f1] [e1@3 e2]*2").slow(4).s("deadpad").rel(.4).detune(.3).gain(1),
  outro2: note("[e21 f1 fs1 g1 gs1 a1 as1 b1] [c2@3 c3]*2").slow(4).s("deadpad").rel(.4).detune(.3).gain(1),
  outro3: note("[e1 f1 fs1 g1 gs1 a1 as1 b1] [c2 cs2 d2 ds2 e2 f2 fs2 g2]").slow(4).s("deadpad").rel(.4).detune(.3).gain(1),
  outro4: note("[gs2 a2 as2 b2 c3 cs3 d3 ds3] [ds3,as4]").slow(4).s("deadpad").rel(.4).detune(.3).gain(1),
  outro5: note("[ds3,as4]").seg(32).s("deadpad").rel(.4).detune(.3).gain(1),
}

const drums = {
  intro: stack(
    s("boom*4").dec(.25).vel(.8),
    s("[- sd]!4"),
    s("oh!8").vel(.31)
  ).bank("deadrums").gain(2),
  verse: stack(
    s("boom*4").dec(.25).vel(.8),
    s("[- sd]!4"),
    s("<[oh hh!7]!2 [oh@2 hh!14]!2>").vel(.31),
  ).bank("deadrums").gain(2),
  break1: stack(
    s("bdh*2 [- bdh] bdh*2 -").vel(.28),
    s("[- sd]!2"),
    s("oh hh!7").vel(.31)
  ).bank("deadrums").gain(2),
  break2: stack(
    s("boom*4").dec(.25).vel(.8),
    s("bl bl*2 bl bl bl*2 bl*2 bl bl*2").vel(.3),
    s("ht [- ht] lt ht - ht - lt").vel(1),
  ).bank("deadrums").gain(2),
  break3: stack(
    s("boom boom").dec(.25).vel(.8),
    s("bl bl*2 bl bl bl*2 bl*2 bl bl*2").vel(.3),
    s("sd ht lt sd ht lt sd ht lt sd sd ht sd sd sd sd"),
  ).bank("deadrums").gain(2),
  break4: stack(
    s("boom*4").dec(.25).vel(.8),
    s("[- sd]!4"),
    s("oh!8").vel(.31),
    s("-!15 [- scan]").vel(1).rel(.4).slow(4),
  ).bank("deadrums").gain(2),
  verse3: stack(
    s("[boom lt*2]!4").dec(.25).vel(.8),
    s("[- sd]!2"),
    s("oh!8").vel(.31),
  ).bank("deadrums").gain(2),
  outro1: stack(
    s("boom*4 [- boom]!3 [boom boom*2] [- boom]!3 boom*2!8").slow(4).dec(.25).vel(.8),
    s("sd*2!4 [- sd]!4").slow(4),
    s("oh!8 [oh hh*2]!8").slow(4).vel(.31),
  ).bank("deadrums").gain(2),
  outro2: stack(
    s("sd | hh | sd | oh | boom | lt | ht | boom | bl | sd | boom | sd").fast(16).sometimesBy(.05, x => x.ply(2)),
  ).bank("deadrums").gain(2),
} 

$ARR: arrange(
  [1, stack(
    countin
  )],
  [8, stack(
    hit.slow(8),
    drums.intro,
    synth.intro,
  )],
  [16, stack(
    hit.slow(8),
    drums.verse,
    synth.verse1,
  )],
  [4, stack(
    hit.slow(8),
    drums.break1,
    synth.break1,
  )],
  [3, stack(
    hit.slow(8),
    drums.break2,
    synth.break2,
  )],
  [1, stack(
    drums.break3,
    synth.break2,
  )],
  [8, stack(
    hit.slow(8),
    drums.break4,
    synth.break1,
  )],
  [14, stack(
    hit.slow(8),
    drums.verse,
    synth.verse2,
  )],
  [2, stack(
    drums.verse3,
    synth.verse3,
  )],
  [4, stack(
    hit.slow(2),
    drums.outro1,
    synth.outro1,
  )],
  [4, stack(
    hit.slow(2),
    drums.outro1,
    synth.outro2,
  )],
  [4, stack(
    hit.slow(2),
    drums.outro1,
    synth.outro1,
  )],
  [4, stack(
    hit.slow(2),
    drums.outro1,
    synth.outro3,
  )],
  [16, stack(
    hit.slow(2),
    drums.outro2,
    synth.outro3,
  )],
  [128, s("-")]
)

await initHydra({ detectAudio: true })

a.show()
a.setSmooth(.5)
a.setCutoff(.5)
a.setScale(5)
a.setBins(4)

solid(0)
  .blend(
    src(s1)
    .saturate(3)
    .scale(1.1)
    .modulate(s2, () => a.fft[0])
    .brightness(.2)
    .posterize(() => Math.max(a.fft[0] * 20, 10))
  )
  .modulateScale(osc(60000, 0)
    .rotate(11), () => a.fft[0] * .3)
  .pixelate(() => (a.fft[3] * 1000) + 400, () => (a.fft[3] * 1000) + 400)
  .contrast(1.5)
  .blend(src(s1)
    .rotate(() => Math.sin(time))
    .modulate(src(s2), a.fft[0] * 200), () => a.fft[0] + .3)
  .add(src(s2)
    .modulate(src(s2)
      .rotate(() => a.fft[3]), () => a.fft[0] * 10), () => a.fft[1] * 2)
  .blend(src(s2)
    .modulate(src(s2), 3), () => a.fft[0] * .4)
  .saturate(0)
  .brightness(.8)
  .blend(src(o1), .9)
    .add(src(s2).saturate(0), .9)
  .out(o1)

src(o1)
  .out(o0)

s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3M1anViNHVpMGk5ZDF0b3dqMmY0ZDhod2EzdzdvajJlMm9xY2d0ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vLPjT7hi9EK1VbgOWG/giphy.mp4')
s2.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTlobnozYndpZWhkNHlvOXhxMjFkYTkzdG13NGxrMGZqaHRyN3R2aCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/YJ85eVpdZDy7e/giphy.mp4')