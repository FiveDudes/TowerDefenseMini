(function attachGameAudio(globalScope) {
  const SOUND_LIBRARY = {
    place: { kind: "tone", wave: "square", frequency: 520, duration: 0.07, gain: 0.032, attack: 0.004, release: 0.06, cooldown: 0.035 },
    attack: { kind: "tone", wave: "triangle", frequency: 300, duration: 0.04, gain: 0.018, attack: 0.002, release: 0.035, cooldown: 0.02 },
    freezeAura: { kind: "tone", wave: "triangle", frequency: 170, duration: 0.22, gain: 0.012, attack: 0.02, release: 0.2, cooldown: 0.18, endFrequency: 150 },
    explosion: { kind: "explosion", duration: 0.42, gain: 0.11, attack: 0.002, release: 0.42, cooldown: 0.05, boomFrequency: 92, tailFrequency: 46, filterFrequency: 980 },
    bombExplosion: { kind: "explosion", duration: 0.72, gain: 0.075, attack: 0.002, release: 0.72, cooldown: 0.08, boomFrequency: 70, tailFrequency: 26, filterFrequency: 760 },
    death: { kind: "tone", wave: "sawtooth", frequency: 160, duration: 0.09, gain: 0.022, attack: 0.003, release: 0.08, cooldown: 0.03 },
    nukeLaunch: { kind: "explosion", duration: 0.8, gain: 0.14, attack: 0.005, release: 0.8, cooldown: 0.5, boomFrequency: 60, tailFrequency: 26, filterFrequency: 700 },
    nuke: { kind: "explosion", duration: 2.2, gain: 0.24, attack: 0.001, release: 2.2, cooldown: 1.4, boomFrequency: 44, tailFrequency: 14, filterFrequency: 480 },
  };

  function createNoiseBuffer(context) {
    const length = Math.max(1, Math.floor(context.sampleRate * 1.5));
    const buffer = context.createBuffer(1, length, context.sampleRate);
    const channel = buffer.getChannelData(0);
    for (let i = 0; i < length; i += 1) {
      channel[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  function createAudioController() {
    const lastPlayedAt = new Map();
    let audioContext = null;
    let noiseBuffer = null;

    function getContext() {
      const AudioCtor = globalScope.AudioContext || globalScope.webkitAudioContext;
      if (!AudioCtor) return null;
      if (!audioContext) {
        audioContext = new AudioCtor();
      }
      if (audioContext.state === "suspended") {
        audioContext.resume().catch(() => {});
      }
      return audioContext;
    }

    function playTone(context, preset) {
      const startAt = context.currentTime;
      const osc = context.createOscillator();
      const gainNode = context.createGain();
      osc.type = preset.wave;
      osc.frequency.setValueAtTime(preset.frequency, startAt);
      if (preset.endFrequency) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(1, preset.endFrequency), startAt + preset.duration);
      }
      gainNode.gain.setValueAtTime(0.0001, startAt);
      gainNode.gain.linearRampToValueAtTime(preset.gain, startAt + preset.attack);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, startAt + preset.release);
      osc.connect(gainNode);
      gainNode.connect(context.destination);
      osc.start(startAt);
      osc.stop(startAt + preset.duration);
    }

    function playExplosion(context, preset) {
      if (!noiseBuffer) {
        noiseBuffer = createNoiseBuffer(context);
      }
      const startAt = context.currentTime;
      const noise = context.createBufferSource();
      const noiseFilter = context.createBiquadFilter();
      const noiseGain = context.createGain();
      const boom = context.createOscillator();
      const boomGain = context.createGain();
      noise.buffer = noiseBuffer;
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(preset.filterFrequency || 900, startAt);
      noiseGain.gain.setValueAtTime(Math.max(0.0001, preset.gain), startAt);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, startAt + preset.release);
      boom.type = "sine";
      boom.frequency.setValueAtTime(preset.boomFrequency || 80, startAt);
      boom.frequency.exponentialRampToValueAtTime(Math.max(1, preset.tailFrequency || 30), startAt + preset.duration);
      boomGain.gain.setValueAtTime(Math.max(0.0001, preset.gain * 0.9), startAt);
      boomGain.gain.exponentialRampToValueAtTime(0.0001, startAt + preset.duration);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(context.destination);
      boom.connect(boomGain);
      boomGain.connect(context.destination);
      noise.start(startAt);
      noise.stop(startAt + preset.duration);
      boom.start(startAt);
      boom.stop(startAt + preset.duration);
    }

    function playSound(name) {
      const preset = SOUND_LIBRARY[name];
      if (!preset) return;
      const nowMs = performance.now();
      if (nowMs - (lastPlayedAt.get(name) || -Infinity) < preset.cooldown * 1000) {
        return;
      }
      lastPlayedAt.set(name, nowMs);
      const context = getContext();
      if (!context) return;
      if (preset.kind === "explosion") {
        playExplosion(context, preset);
        return;
      }
      playTone(context, preset);
    }

    return { playSound };
  }

  globalScope.GameAudio = {
    createAudioController,
  };
})(window);
