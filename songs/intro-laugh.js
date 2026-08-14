// @title Intro/Laugh
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

setcpm(145/4 + (2 * 0))

const countin = s("sf:23 sf:23 sf:23*4@2").sus(0).dec(.5)
const hit = s("hit").bank("deadrums").gain(.8)

const synth = {
  riff: note("[e4,gs4,b4] [g4,bb4,d5] [[fs4,a4,cs5]@7 [gs4@2 cs4 a3 gs4@2 cs4 a3@2]@9]@2").slow(4).s("supersaw").rel(.4).detune(.3).gain(1),
  riffFill: note("[e4,gs4,b4] [g4,bb4,d5] [[fs4,bb4,ds5]!16]@2").slow(4).s("supersaw").rel(.4).detune(.3).gain(1),
  outro: note("[fs4,bb4,ds5]!16").s("supersaw").rel(.4).detune(.3).gain(1),
}

const drums = {
  intro: stack(
    s("[boom*2 -]*2").dec(.25).vel(.8),
    s("[- sd]!2"),
    s("[ht lt!3]*2").vel(1)
  ).bank("deadrums").gain(2),
  verse: stack(
    s("[boom*2 -]*2").dec(.25).vel(.8),
    s("[- sd]!2"),
    s("[ht lt!3]*2").vel(1),
    s("[oh hh!3]!2").vel(.31),
  ).bank("deadrums").gain(2),
  verseFill: stack(
    s("<[[boom*2 -]*2]!3 [bd - bd bd - bd - bd]>").dec(.25).vel(.8),
    s("<[[- sd]*2]!3 [- sd - - sd - sd -]>"),
    s("<[[ht lt!3]*2]!3 [lt ht lt - ht lt ht lt]>").vel(1),
    s("<[[oh hh!3]*2]!3 oh>").vel(.31),
  ).bank("deadrums").gain(2),
  chorus: stack(
    s("boom - boom*2 [- boom]!2 - boom*2 -").slow(2).dec(.25).vel(.8),
    s("[- sd]!2"),
    s("- [-!3 sd] - -").dec(.1).vel(.8),
    s("oh!8").vel(.36)
  ).bank("deadrums").gain(2),
  chorusFill: stack(
    s("<[boom - boom*2 [- boom]!2 - boom*2 -]!3 [boom - boom*2 [- boom]!2 - boom*2 [- bd]*2]>").slow(2).dec(.25).vel(.8),
    s("<[[- sd]!2]!3 [- sd - sd*2]>"),
    s("- [-!3 sd] - -").dec(.1).vel(.8),
    s("oh!8").vel(.36)
  ).bank("deadrums").gain(2),
  outro1: stack(
    s("[boom*8]!3 [boom*4 boom*2]").slow(4).dec(.34).vel(.7),
    s("[[- sd]*8]!3 [[- sd]*4 -]").slow(4).vel(.5),
    s("-!3 [- <[[bd sd*2]*2] [ht*3 lt*2 bd*2 lt*2]>]").slow(4).vel(.8),
    s("[[oh hh]*4]!3 [[oh hh]*2 <[hit oh]*2 ->]").vel(.31).slow(4),
  ).bank("deadrums").gain(2),
  outro2: stack(
    s("sd | hh | sd | oh | boom | lt | ht | boom | bl | sd | boom | sd").fast(16).sometimesBy(.05, x => x.ply(2)),
  ).bank("deadrums").gain(2),
} 

$ARR: arrange(
  [4, stack(
    drums.intro,
    s("-!3").fastcat(countin).slow(4)
  )],
  [12, stack(
    hit.slow(8),
    drums.verse,
    synth.riff,
  )],
  [4, stack(
    hit.slow(8),
    drums.verseFill,
    synth.riffFill,
  )],
  [12, stack(
    hit.slow(8),
    drums.chorus,
    synth.riff,
  )],
  [4, stack(
    hit.slow(8),
    drums.chorusFill,
    synth.riffFill,
  )],
  [8, stack(
    hit.slow(8),
    drums.outro1,
    synth.outro,
  )],
  [24, stack(
    hit.slow(8),
    drums.outro2,
    synth.outro,
  )],
  [1024, s("-")]
)

await initHydra({ detectAudio: true })

a.show()
a.setSmooth(.4)
a.setCutoff(.1)
a.setScale(5)
a.setBins(3)

src(s2).repeatX(4).repeatY(3)
  .scale(1.1)
  .luma(.26)
  .scrollY(-.3, .1)
  .out(o1)

src(o1)
  .blend(src(o1).modulate(src(o1), .02), .7)
  .modulateScale(osc(1, 0, 1).kaleid(10), () => 2 * a.fft[0])
  .thresh(() => .26 + a.fft[1] * .1)
  .brightness(() => -.2 + a.fft[2] * .4)
  .blend(src(o2), .5)
  .blend(src(o2).modulatePixelate(noise(400).modulate(voronoi(100, .3, .5), 30), 10, () => a.fft[1] * 100), () => a.fft[2] * .5 + .2)
  .out(o2)

src(o2)
  .out(o0)

s1.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExa3M1anViNHVpMGk5ZDF0b3dqMmY0ZDhod2EzdzdvajJlMm9xY2d0ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/vLPjT7hi9EK1VbgOWG/giphy.mp4')
s2.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHUzbG5oNmJkcncxNnQyMGgzaGYxbDU2cXlhaGphamJjbHZtMXdsNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/BFYLNwlsSNtcc/giphy.mp4')