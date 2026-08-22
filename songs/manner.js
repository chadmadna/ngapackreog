// @title Manner
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
  .compressor("-5:30:0:.05:.1")
  .postgain(slider(1, 0, 1))
)

setcpm(151/4 + (5 * 0))

const countin = s("sf:23 sf:23 sf:23*4@2").sus(0).dec(.5)
const hit = s("hit").bank("deadrums").gain(.8)

const synth = {
  intro: note("g2 g2 a2 e2 a2 a2 as2 e2").s("supersaw").rel(.4).hpf(150),
  verse: note("[g1,d3,bb2]!4 [a1,e3,c3]!4").s("supersaw").rel(.4).hpf(150),
}

const drums = {
  verse: stack(
    s("boom boom [boom boom*2]!2").dec(.34).vel(.8),
    s("[- sd]*2"),
    s("[oh hh] [oh hh] [hh*2 oh]!2").vel(.31),
  ).bank("deadrums").gain(2),
  chorus: stack(
    s("[boom*8]!3 [boom*4 boom*2]").slow(4).dec(.34).vel(.7),
    s("[[- sd]*8]!3 [[- sd]*4 -]").slow(4).vel(.5),
    s("-!3 [- <[[bd sd*2]*2] [ht*3 lt*2 bd*2 lt*2]>]").slow(4).vel(.8),
    s("[[oh hh]*4]!3 [[oh hh]*2 <[hit oh]*2 ->]").vel(.31).slow(4),
  ).bank("deadrums").gain(2),
  verseFill: stack(
    s("boom [boom boom*2] -@2").dec(.34).vel(.8),
    s("[- sd]").fastcat(s("sear").seg(16).vel(saw.range(.2, 2))).rel(.1),
    s("[oh hh] [oh hh] [bl bl*2 [- bl] bl]@2").vel(.31),
  ).bank("deadrums").gain(2),
  break: stack(
    s("boom boom [boom boom*2]!2").dec(.34).vel(.8),
    s("[- sd]*2"),
    s("hh*8").vel(.31),
  ).bank("deadrums").gain(2),
  outro: stack(
    s("boom,cr"),
  ).bank("deadrums").gain(2),
} 

$ARR: arrange(
  [4, stack(
    s("here"),
    synth.intro,
    s("-!3").fastcat(countin).slow(4),
  )],
  [8, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.verse
  )],
  [8, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.chorus
  )],
  [3, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.verse
  )],
  [1, stack(
    s("here"),
    synth.verse,
    drums.verseFill // ciaat
  )],
  [4, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.verse
  )],
  [8, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.chorus
  )],
  [8, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.break
  )],
  [8, stack(
    s("here"),
    hit.slow(4),
    synth.verse,
    drums.chorus
  )],
  [1, stack(
    s("here"),
    hit.slow(4).delay(.98).delays(1/8),
    drums.outro,
  )],
  [1024, s("-")]
)

await initHydra({ detectAudio: true })

a.show()
a.setSmooth(0.1)
a.setCutoff(0.5)
a.setScale(3)
a.setBins(3)

src(s1)
  .modulateRepeat(osc(20, .3), 6, 4, .3, .3)
  .saturate(0)
  .contrast(1.4)
  .luma(.5).invert()
  .scrollY(3, -.3).scrollX(3, -.3)
  .pixelate(200, 200)
  .diff(src(s0)
        .saturate(0)
        .thresh(.5)
        .contrast(1.2)
        .scale(.8, () => a.fft[1] * 2 + 1, () => a.fft[0] * 2
          + 1))
  .modulate(src(o1).scale(() => 4 - a.fft[0]), .03)
  .modulatePixelate(src(o0).modulate(src(o0).scale(1, 1.4)), () => a.fft[0] * 10000, 300)
  .mask(shape(100, .8, .7))
  .out(o1)

src(o1)
  .blend(noise(1000, 5).modulate(o0).modulate(shape(4,0.1,1), .3), .1).brightness(0)
  .out(o0)

s0.initVideo('https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbXNzbXBucmk4OG05MnBydzN3N2F0eHlpbzRrb3l3aDdrMHUyMTF5NyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3V1060Es14YLYfaQV/giphy.mp4')
s1.initImage('https://upload.wikimedia.org/wikipedia/commons/9/9c/Middle_finger_BNC.jpg')