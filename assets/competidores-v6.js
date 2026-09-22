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
    "fights": 4,
    "belts": null,
    "quote": "O começo de uma história também merece fazer barulho.",
    "description": "Izabela representa a Real Muay Thai com 4 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
    "image": "/assets/competidores/04.webp"
  },
  {
    "name": "Wendel",
    "fights": 4,
    "belts": null,
    "quote": "O próximo desafio começa antes do primeiro gongo.",
    "description": "Wendel representa a Real Muay Thai com 4 lutas registradas em sua trajetória. Uma história que faz parte da nossa equipe, um encontro de cada vez.",
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
  const arena = section.querySelector('.fighter-arena');
  const trainingButton = section.querySelector('.fighter-training-button');
  let actionTimer;
  let rapidClicks = [];
  function returnToPunches() {
    clearTimeout(actionTimer);
    arena.dataset.action = 'punch';
  }
  function perform(action) {
    clearTimeout(actionTimer);
    // Reset only the action animations; rapid input never queues delayed kicks.
    arena.dataset.action = 'punch';
    void arena.offsetWidth;
    arena.dataset.action = action;
    actionTimer = setTimeout(returnToPunches, action === 'flip' ? 950 : 620);
  }
  trainingButton.addEventListener('click', () => {
    if (arena.dataset.action === 'flip') return;
    const now = performance.now();
    rapidClicks = rapidClicks.filter(time => now - time <= 650);
    rapidClicks.push(now);
    if (rapidClicks.length >= 3) {
      rapidClicks = [];
      perform('flip');
    } else {
      perform('kick');
    }
  });
  let paused = motion.matches;
  let visible = false;
  function updateMotion() {
    section.classList.toggle('motion-paused', paused || !visible || document.hidden);
    if (paused || !visible || document.hidden) {
      returnToPunches();
      rapidClicks = [];
    }
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
    returnToPunches();
    rapidClicks = [];
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
