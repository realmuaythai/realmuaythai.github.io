const realFighters = [
  {
    "name": "Kristoffer",
    "fights": 13,
    "belts": 3,
    "quote": "13 batalhas. 3 cinturões. Uma história que continua sendo escrita.",
    "description": "Kristoffer representa a Real Muay Thai com 13 lutas registradas em sua trajetória. Com 3 cinturões conquistados, seu nome faz parte das conquistas da equipe.",
    "image": "/assets/competidores/01.webp"
  },
  {
    "name": "Samuel",
    "fights": 18,
    "belts": 2,
    "quote": "A experiência entra no ringue. A próxima conquista começa no treino.",
    "description": "Samuel representa a Real Muay Thai com 18 lutas registradas em sua trajetória. Com 2 cinturões conquistados, seu nome faz parte das conquistas da equipe.",
    "image": "/assets/competidores/02.webp"
  },
  {
    "name": "TH",
    "fights": 13,
    "belts": null,
    "quote": "Cada round deixa uma lição. Cada treino abre um caminho.",
    "description": "TH representa a Real Muay Thai com 13 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/03.webp"
  },
  {
    "name": "Izabela",
    "fights": 5,
    "belts": 1,
    "quote": "O começo de uma história também merece fazer barulho.",
    "description": "Izabela representa a Real Muay Thai com 5 lutas registradas em sua trajetória. Com 1 cinturão conquistado, seu nome faz parte das conquistas da equipe.",
    "image": "/assets/competidores/isabela-foto-v8.png"
  },
  {
    "name": "Wendel",
    "fights": 5,
    "belts": null,
    "quote": "O próximo desafio começa antes do primeiro gongo.",
    "description": "Wendel representa a Real Muay Thai com 5 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/05.webp"
  },
  {
    "name": "João Filho",
    "fights": 7,
    "belts": 1,
    "quote": "Um cinturão na trajetória. Novos capítulos pela frente.",
    "description": "João Filho representa a Real Muay Thai com 7 lutas registradas em sua trajetória. Com 1 cinturão conquistado, seu nome faz parte das conquistas da equipe.",
    "image": "/assets/competidores/06.webp"
  },
  {
    "name": "Joshua",
    "fights": 2,
    "belts": null,
    "quote": "Toda grande trajetória começa com o primeiro passo no ringue.",
    "description": "Joshua representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/07.webp"
  },
  {
    "name": "Antonio",
    "fights": 1,
    "belts": null,
    "quote": "A primeira luta é só o início da história.",
    "description": "Antonio representa a Real Muay Thai com 1 luta registrada em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/antonio-foto-v4.jpg"
  },
  {
    "name": "Iago",
    "fights": 10,
    "belts": null,
    "quote": "Dez lutas na caminhada. O horizonte continua aberto.",
    "description": "Iago representa a Real Muay Thai com 10 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/09.webp"
  },
  {
    "name": "Narão",
    "fights": 2,
    "belts": null,
    "quote": "O ringue é o começo. A evolução é o caminho.",
    "description": "Narão representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/10.webp"
  },
  {
    "name": "Thiago",
    "fights": 2,
    "belts": null,
    "quote": "Cada novo round é uma oportunidade de escrever mais.",
    "description": "Thiago representa a Real Muay Thai com 2 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/11.webp"
  }
];

(() => {
  const section = document.querySelector('#competidores');
  if (!section) return;
  const buttons = [...section.querySelectorAll('[data-fighter]')];
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const toggle = section.querySelector('.fighter-motion-toggle');
  // --- Elephant training mini-game: a jointed SVG rig posed every frame. ---
  const arena = section.querySelector('.fighter-arena');
  const trainingButton = section.querySelector('.fighter-training-button');
  const game = (() => {
    const J = {};
    arena.querySelectorAll('[data-j]').forEach(el => { J[el.dataset.j] = el; });
    const THIGH = 30, SHIN = 28, DEG = 180 / Math.PI;
    // Guard stance. Limb angles are degrees; negative swings a limb forward (towards the bag).
    const GUARD = {
      hx: 100, hy: 120, lean: 6, head: 0,
      fS: -48, fE: -118, nS: -30, nE: -128,
      fax: 118, fay: 170, ffa: 0, nax: 84, nay: 170, nfa: 0,
      t1: -18, t2: 14, t3: 22, t4: 34, ear: 0, tail: 0
    };
    const KEYS = Object.keys(GUARD);
    // Each strike: keyframes [time ms, pose changes from guard, easing], then when/where/how hard it lands.
    const STRIKES = [
      { name: 'JAB', hit: 150, power: 45, at: [177, 77], end: 430, keys: [
        [70, { hx: 98, lean: 3, fS: -40, fE: -126 }, 'inOut'],
        [150, { hx: 113, hy: 121, lean: 11, fS: -101, fE: -2, fax: 128, nfa: 12, t1: -30 }, 'out'],
        [215, { hx: 112, hy: 121, lean: 10, fS: -99, fE: -8, fax: 128, nfa: 12, t1: -26 }, 'lin'] ] },
      { name: 'DIRETO', hit: 190, power: 80, at: [178, 78], end: 540, keys: [
        [90, { hx: 96, lean: 1, nS: -18, nE: -138, head: 3 }, 'inOut'],
        [190, { hx: 112, hy: 122, lean: 17, nS: -107, nE: 0, fS: -62, fE: -122, fax: 124, nax: 89, nfa: 24, head: -5, t1: -34, ear: .6 }, 'out'],
        [270, { hx: 111, hy: 122, lean: 15, nS: -104, nE: -8, fS: -62, fE: -122, fax: 124, nax: 89, nfa: 24, head: -4, t1: -28 }, 'lin'] ] },
      { name: 'COTOVELADA', hit: 260, power: 75, at: [177, 75], end: 640, keys: [
        [140, { hx: 120, lean: 4, fax: 140, nax: 98, nS: -8, nE: -152, head: 2 }, 'inOut'],
        [260, { hx: 135, hy: 121, lean: 17, fax: 147, nax: 107, nfa: 22, nS: -113, nE: -150, fS: -55, fE: -124, head: -6, t1: -32, ear: .7 }, 'out'],
        [340, { hx: 134, hy: 121, lean: 15, fax: 147, nax: 107, nfa: 22, nS: -106, nE: -150, fS: -55, fE: -124, head: -5 }, 'lin'] ] },
      { name: 'JOELHADA', hit: 310, power: 95, at: [176, 116], end: 720, keys: [
        [150, { hx: 119, lean: 10, fax: 139, nax: 92, nay: 167, nfa: 14, fS: -108, fE: -26, nS: -114, nE: -22 }, 'inOut'],
        [310, { hx: 141, hy: 115, lean: -11, fax: 141, nax: 149, nay: 137, nfa: 62, fS: -92, fE: -34, nS: -98, nE: -36, head: 8, t1: -8, ear: .8 }, 'out'],
        [400, { hx: 140, hy: 116, lean: -8, fax: 141, nax: 147, nay: 139, nfa: 58, fS: -92, fE: -34, nS: -98, nE: -36, head: 6 }, 'lin'] ] },
      { name: 'TEEP', hit: 270, power: 115, at: [177, 111], end: 680, keys: [
        [140, { hx: 97, hy: 118, lean: -6, fax: 127, fay: 127, ffa: -30, nS: -24, nE: -134 }, 'inOut'],
        [270, { hx: 105, hy: 117, lean: -21, fax: 169, fay: 112, ffa: -80, fS: -58, fE: -118, nS: -6, nE: -104, head: 12, t1: -6, ear: .5 }, 'out'],
        [350, { hx: 104, hy: 117, lean: -19, fax: 165, fay: 113, ffa: -78, fS: -58, fE: -118, nS: -6, nE: -104, head: 11 }, 'lin'],
        [480, { hx: 99, hy: 118, lean: -6, fax: 130, fay: 132, ffa: -25 }, 'inOut'] ] },
      { name: 'CHUTE ALTO', hit: 340, power: 150, at: [177, 86], end: 800, keys: [
        [130, { hx: 102, lean: 1, nS: -62, nE: -88, nax: 80, nay: 165, nfa: 18 }, 'inOut'],
        [240, { hx: 108, hy: 116, lean: -17, nax: 122, nay: 122, nfa: -10, ffa: -6, nS: -30, nE: -70, head: 8 }, 'in'],
        [340, { hx: 113, hy: 114, lean: -33, nax: 172, nay: 86, nfa: -25, ffa: -10, nS: 28, nE: -28, fS: -72, fE: -112, head: 17, t1: 4, t2: 20, ear: 1, tail: -30 }, 'out'],
        [420, { hx: 112, hy: 114, lean: -30, nax: 168, nay: 89, nfa: -22, ffa: -10, nS: 24, nE: -30, fS: -72, fE: -112, head: 15, t1: 2, tail: -20 }, 'lin'],
        [580, { hx: 106, hy: 117, lean: -10, nax: 118, nay: 132, nfa: 10, nS: -10, nE: -90, head: 4 }, 'inOut'] ] },
      { name: 'TROMBADA', hit: 330, power: 165, at: [180, 72], end: 820, keys: [
        [200, { hx: 95, lean: -9, head: -20, t1: -150, t2: -26, t3: -26, t4: -30, ear: 1, fS: -40, fE: -124 }, 'inOut'],
        [330, { hx: 102, hy: 122, lean: 13, head: 9, fax: 124, nfa: 16, t1: -104, t2: -3, t3: 2, t4: 8, ear: .2, tail: 25 }, 'in'],
        [430, { hx: 102, hy: 122, lean: 12, head: 8, fax: 124, nfa: 16, t1: -92, t2: 10, t3: 14, t4: 18, tail: 15 }, 'out'] ] }
    ];
    const EASE = {
      lin: u => u,
      in: u => u * u,
      out: u => 1 - (1 - u) ** 3,
      inOut: u => (u < .5 ? 4 * u * u * u : 1 - ((-2 * u + 2) ** 3) / 2)
    };
    const n = v => Math.round(v * 100) / 100;
    const label = J.label;
    let pose = { ...GUARD };      // base pose (guard or current point of a strike)
    let track = null;             // running strike: { keys, t, hit, done }
    let next = 0, running = false, raf = 0, last = 0, clock = 0, idleWeight = 1;
    let bag = 0, bagSpeed = 0;    // pendulum angle (deg) and speed (deg/s); positive swings towards the elephant
    let fx = null, labelAge = Infinity, lastInput = 0, staticTimer;

    function leg(hipX, hipY, ax, ay, thigh, shin, foot, footAngle) {
      // Two-bone IK with the knee always bending forward, so planted feet never slide.
      let dx = ax - hipX, dy = ay - hipY;
      const dist = Math.hypot(dx, dy) || 1;
      const d = Math.min(Math.max(dist, 6), THIGH + SHIN - .4);
      dx *= d / dist; dy *= d / dist;
      const base = Math.atan2(dy, dx);
      const a = Math.acos(Math.min(1, Math.max(-1, (THIGH * THIGH + d * d - SHIN * SHIN) / (2 * THIGH * d))));
      const td = base - a;
      const kx = hipX + THIGH * Math.cos(td), ky = hipY + THIGH * Math.sin(td);
      const fx2 = hipX + dx, fy2 = hipY + dy;
      const sd = Math.atan2(fy2 - ky, fx2 - kx);
      thigh.setAttribute('transform', `translate(${n(hipX)} ${n(hipY)}) rotate(${n(td * DEG - 90)})`);
      shin.setAttribute('transform', `translate(${n(kx)} ${n(ky)}) rotate(${n(sd * DEG - 90)})`);
      foot.setAttribute('transform', `translate(${n(fx2)} ${n(fy2)}) rotate(${n(footAngle)})`);
    }
    function draw(p) {
      const body = `translate(${n(p.hx)} ${n(p.hy)}) rotate(${n(p.lean)})`;
      J.bodyA.setAttribute('transform', body);
      J.bodyB.setAttribute('transform', body);
      J.fUp.setAttribute('transform', `translate(6 -43) rotate(${n(p.fS)})`);
      J.fFore.setAttribute('transform', `translate(0 20) rotate(${n(p.fE)})`);
      J.nUp.setAttribute('transform', `translate(2 -43) rotate(${n(p.nS)})`);
      J.nFore.setAttribute('transform', `translate(0 20) rotate(${n(p.nE)})`);
      J.head.setAttribute('transform', `translate(5 -46) rotate(${n(p.head)})`);
      J.t1.setAttribute('transform', `translate(23 -12) rotate(${n(p.t1)})`);
      J.t2.setAttribute('transform', `translate(0 11) rotate(${n(p.t2)})`);
      J.t3.setAttribute('transform', `translate(0 11) rotate(${n(p.t3)})`);
      J.t4.setAttribute('transform', `translate(0 11) rotate(${n(p.t4)})`);
      J.ear.setAttribute('transform', `translate(6 -14) scale(${n(1 - .32 * p.ear)} 1) translate(-6 14)`);
      J.tail.setAttribute('transform', `rotate(${n(p.tail)} -14 -6)`);
      leg(p.hx + 4, p.hy, p.fax, p.fay, J.fThigh, J.fShin, J.fFoot, p.ffa);
      leg(p.hx - 2, p.hy + 2, p.nax, p.nay, J.nThigh, J.nShin, J.nFoot, p.nfa);
      J.bag.setAttribute('transform', `rotate(${n(bag)} 193 8)`);
    }
    function sample(t) {
      const keys = track.keys;
      let i = 1;
      while (i < keys.length - 1 && t > keys[i].t) i++;
      const a = keys[i - 1], b = keys[i];
      const u = EASE[b.e](Math.min(1, Math.max(0, (t - a.t) / (b.t - a.t))));
      for (const k of KEYS) pose[k] = a.p[k] + (b.p[k] - a.p[k]) * u;
    }
    function land(strike) {
      bagSpeed -= strike.power;
      fx = { age: 0, x: strike.at[0], y: strike.at[1], power: strike.power / 165 };
    }
    function start(strike, announce) {
      const keys = [{ t: 0, p: { ...pose } }];
      strike.keys.forEach(([t, change, e]) => keys.push({ t, p: { ...GUARD, ...change }, e }));
      keys.push({ t: strike.end, p: { ...GUARD }, e: 'inOut' });
      track = { keys, t: 0, strike, hit: false };
      if (announce) { label.textContent = strike.name + '!'; labelAge = 0; }
    }
    function frame(now) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(.05, (now - last) / 1000 || 0);
      last = now; clock += dt;
      if (track) {
        track.t += dt * 1000;
        if (!track.hit && track.t >= track.strike.hit) { track.hit = true; land(track.strike); }
        if (track.t >= track.strike.end) { track = null; pose = { ...GUARD }; }
        else sample(track.t);
      } else if (clock - lastInput > 4.5) {
        // Left alone, the elephant keeps working the bag with light jabs.
        lastInput = clock - 1.6;
        start(STRIKES[Math.random() < .7 ? 0 : 1], false);
      }
      // Bag: damped pendulum, pushed by each landed strike.
      bagSpeed += (-48 * bag - 2.4 * bagSpeed) * dt;
      bag = Math.max(-30, Math.min(30, bag + bagSpeed * dt));
      // Idle life (bounce, breathing, trunk/ear/tail) layered over the base pose.
      idleWeight += ((track ? .2 : 1) - idleWeight) * Math.min(1, dt * 8);
      const w = idleWeight, beat = clock * 7;
      const p = { ...pose };
      p.hy += w * 1.7 * Math.sin(beat);
      p.lean += w * 1.2 * Math.sin(beat + 1);
      p.fE += w * 3 * Math.sin(beat + .6); p.nE += w * 3 * Math.sin(beat + 2);
      p.fS += w * 2 * Math.sin(beat + .3); p.nS += w * 2 * Math.sin(beat + 1.7);
      p.head += w * 1.5 * Math.sin(beat + 2.4);
      p.t2 += w * 5 * Math.sin(clock * 3.1); p.t3 += w * 6 * Math.sin(clock * 3.1 - .8); p.t4 += w * 8 * Math.sin(clock * 3.1 - 1.6);
      p.ear += w * Math.max(0, Math.sin(clock * 2.3)) ** 6;
      p.tail += 14 * Math.sin(clock * 4.2);
      draw(p);
      // Impact burst + short shake.
      if (fx) {
        fx.age += dt;
        const u = fx.age / .24;
        if (u >= 1) { fx = null; J.fx.setAttribute('opacity', 0); J.shake.removeAttribute('transform'); }
        else {
          J.fx.setAttribute('opacity', n(1 - u * u));
          J.fx.setAttribute('transform', `translate(${fx.x} ${fx.y}) rotate(${n(u * 40)}) scale(${n((.5 + fx.power * .7) * (.4 + EASE.out(u)))})`);
          J.shake.setAttribute('transform', `translate(${n(2.6 * fx.power * (1 - u) * Math.cos(u * 22))} 0)`);
        }
      }
      if (labelAge < 1.1) {
        labelAge += dt;
        const u = Math.min(1, labelAge / 1.1);
        label.setAttribute('opacity', n(u < .12 ? u / .12 : 1 - Math.max(0, (u - .6) / .4)));
        label.setAttribute('transform', `translate(0 ${n(6 - 8 * EASE.out(Math.min(1, u * 2.5)))})`);
        if (u >= 1) label.setAttribute('opacity', 0);
      }
    }
    function rest() {
      clearTimeout(staticTimer);
      track = null; fx = null; pose = { ...GUARD }; bag = 0; bagSpeed = 0; idleWeight = 1; labelAge = Infinity;
      J.fx.setAttribute('opacity', 0); label.setAttribute('opacity', 0);
      J.shake.removeAttribute('transform'); label.removeAttribute('transform');
      draw(pose);
    }
    function setRunning(on) {
      if (on === running) return;
      running = on;
      cancelAnimationFrame(raf);
      if (on) { last = performance.now(); lastInput = clock; raf = requestAnimationFrame(frame); }
      else rest();
    }
    function strike() {
      const s = STRIKES[next];
      next = (next + 1) % STRIKES.length;
      if (running) { lastInput = clock; start(s, true); return; }
      // Animations paused / reduced motion: show the landed strike as a still pose, no movement.
      rest();
      const key = s.keys.find(([t]) => t === s.hit);
      label.textContent = s.name + '!'; label.setAttribute('opacity', 1);
      draw({ ...GUARD, ...key[1] });
      staticTimer = setTimeout(rest, 700);
    }
    draw(pose);
    return { setRunning, strike, rest };
  })();
  trainingButton.addEventListener('click', game.strike);
  let paused = motion.matches;
  let visible = false;
  function updateMotion() {
    section.classList.toggle('motion-paused', paused || !visible || document.hidden);
    game.setRunning(!(paused || !visible || document.hidden));
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Ativar animações' : 'Pausar animações';
  }
  document.addEventListener('visibilitychange', updateMotion);
  toggle.addEventListener('click', () => { paused = !paused; updateMotion(); });
  motion.addEventListener('change', () => { paused = motion.matches; updateMotion(); });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting; updateMotion();
    }, { threshold: 0 }).observe(section);
  } else { visible = true; }
  updateMotion();
  function select(index, animate = true) {
    const f = realFighters[index];
    const set = (id, value) => { section.querySelector('#' + id).textContent = value; };
    const img = section.querySelector('#fighter-photo');
    img.src = f.image; img.alt = f.name;
    set('fighter-name', f.name);
    set('fighter-fights', f.fights);
    set('fighter-fights-label', f.fights === 1 ? 'LUTA' : 'LUTAS');
    section.querySelector('#fighter-belts-stat').hidden = f.belts === null;
    set('fighter-belts', f.belts ?? '');
    set('fighter-belts-label', f.belts === 1 ? 'CINTURÃO' : 'CINTURÕES');
    set('fighter-description', f.description);
    set('fighter-quote', f.quote);
    set('fighter-index', String(index + 1).padStart(2, '0') + ' / ' + buttons.length);
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
    if (animate && !paused && !motion.matches) {
      [img, section.querySelector('.fighter-info')].forEach(el => {
        el.getAnimations().forEach(animation => animation.cancel());
        el.animate([{ opacity: .35, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
          { duration: 320, easing: 'ease-out' });
      });
    }
  }
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      select(index);
      if (matchMedia('(max-width:600px)').matches) {
        section.querySelector('.fighter-stage').scrollIntoView({ behavior: 'instant', block: 'start' });
      }
    });
    button.addEventListener('keydown', event => {
      let target = index;
      if (event.key === 'ArrowRight') target = (index + 1) % buttons.length;
      else if (event.key === 'ArrowLeft') target = (index + buttons.length - 1) % buttons.length;
      else if (event.key === 'Home') target = 0;
      else if (event.key === 'End') target = buttons.length - 1;
      else return;
      event.preventDefault(); select(target); buttons[target].focus();
    });
  });
  select(0, false);
})();
