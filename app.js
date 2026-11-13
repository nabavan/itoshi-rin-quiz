/**
 * BLUE LOCK // ITOSHI RIN ARCHIVE & 2D RAYLIB SIMULATOR
 * Full Interactive Suite (Navigation, Quiz Engine & Physics Game)
 */

// Anti-clickjacking guard: block embedding inside cross-origin iframes
(() => {
  if (typeof window !== 'undefined' && window.top !== window.self) {
    try {
      if (window.top.location.origin !== window.location.origin) {
        window.top.location.replace(window.location.href);
      }
    } catch {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.textContent = 'Доступ заборонено: вбудовування сайту на сторонніх ресурсах заблоковано.';
      });
      throw new Error('Blocked cross-origin frame embedding.');
    }
  }
})();

// -------------------------------------------------------------
// SOUND SYNTHESIZER (Web Audio API)
// -------------------------------------------------------------
class SoundManager {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playKick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.15);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.15);
  }

  playGoal() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);
      gain.gain.setValueAtTime(0.18, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.35);
    });
  }

  playBlocked() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.25);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.25);
  }

  playMiss() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.35);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.35);
  }

  playFlowAwaken() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.42);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.5);
  }

  playPostClank() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(920, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.22);
    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 0.24);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(now + 0.24);
  }

  playMarionetteGate() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [660, 990].forEach((freq, i) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0.16, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.005, now + i * 0.05 + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.14);
    });
  }

  playCallConnect() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    [523.25, 783.99, 1046.5].forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.075);
      gain.gain.setValueAtTime(0.09, now + idx * 0.075);
      gain.gain.exponentialRampToValueAtTime(0.002, now + idx * 0.075 + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + idx * 0.075);
      osc.stop(now + idx * 0.075 + 0.18);
    });
  }

  playCallTick(isFlow = false) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = isFlow ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(isFlow ? 480 : 690, now);
    gain.gain.setValueAtTime(0.032, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.028);
  }
}

// -------------------------------------------------------------
// ITOSHI RIN AMBIENT PUPPET THREADS & AURA PARTICLES
// -------------------------------------------------------------
class RinAmbientFX {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.mouse = { x: window.innerWidth * 0.65, y: window.innerHeight * 0.35, active: false };
    this.particles = [];
    this.rafId = null;

    if (!this.canvas || !this.ctx || this.reducedMotion) return;

    this.resize();
    this.initParticles();

    window.addEventListener('resize', () => this.resize());
    window.addEventListener('pointermove', (e) => {
      if (e.pointerType === 'mouse') {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.active = true;
      }
    }, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.rafId) {
        cancelAnimationFrame(this.rafId);
        this.rafId = null;
      } else if (!document.hidden && !this.rafId) {
        this.loop();
      }
    });

    this.loop();
  }

  resize() {
    this.dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    this.w = window.innerWidth;
    this.h = window.innerHeight;
    this.canvas.width = Math.floor(this.w * this.dpr);
    this.canvas.height = Math.floor(this.h * this.dpr);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
  }

  initParticles() {
    const count = this.w < 760 ? 16 : 28;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * this.w,
      y: Math.random() * this.h,
      vx: (Math.random() - 0.5) * 0.38,
      vy: -0.18 - Math.random() * 0.42,
      r: 1.1 + Math.random() * 1.9,
      alpha: 0.16 + Math.random() * 0.42,
      phase: Math.random() * Math.PI * 2
    }));
  }

  loop() {
    this.rafId = requestAnimationFrame(() => this.loop());
    const ctx = this.ctx;
    const isFlow = document.body.classList.contains('flow-mode-active');

    ctx.clearRect(0, 0, this.w, this.h);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.phase += 0.015;
      p.x += p.vx + Math.sin(p.phase) * 0.15;
      p.y += p.vy;

      if (p.y < -16) {
        p.y = this.h + 16;
        p.x = Math.random() * this.w;
      }
      if (p.x < -16) p.x = this.w + 16;
      if (p.x > this.w + 16) p.x = -16;

      // Subtle puppet-string link between close particles & cursor node
      if (this.mouse.active) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 170) {
          const op = (1 - dist / 170) * 0.2;
          ctx.strokeStyle = isFlow ? `rgba(255, 42, 95, ${op})` : `rgba(0, 255, 200, ${op})`;
          ctx.lineWidth = 0.85;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(this.mouse.x, this.mouse.y);
          ctx.stroke();
        }
      }

      for (let j = i + 1; j < this.particles.length; j++) {
        const q = this.particles[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 125) {
          const lineAlpha = (1 - d / 125) * 0.08;
          ctx.strokeStyle = isFlow ? `rgba(255, 42, 95, ${lineAlpha})` : `rgba(0, 255, 200, ${lineAlpha})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = isFlow && i % 3 === 0
        ? `rgba(255, 42, 95, ${p.alpha})`
        : `rgba(0, 255, 200, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

// -------------------------------------------------------------
// QUIZ DATASET
// -------------------------------------------------------------
const QUIZ_DATA = [
  // БЛОК 1: Біографія, дитинство та персональні факти
  {
    block: "БЛОК 1: БІОГРАФІЯ ТА ОСОБИСТІСТЬ",
    question: "Коли народився Ітоші Рін і яка в нього група крові?",
    options: [
      "1 квітня, група AB",
      "9 вересня, група A",
      "23 грудня, група O",
      "10 жовтня, група B"
    ],
    correctIndex: 1,
    explanation: "Згідно з офіційним гайдбуком Egoist Bible, Рін народився 9 вересня, знак Діва, його група крові A, зріст 186 см."
  },
  {
    block: "БЛОК 1: БІОГРАФІЯ ТА ОСОБИСТІСТЬ",
    question: "Що є улюбленою стравою Ріна згідно з офіційним профілем Egoist Bible?",
    options: [
      "Очадзуке — рис із зеленим чаєм та червоною рибою",
      "Гострий рамьон із яловичиною",
      "Стейк середнього просмаження",
      "Данґо та чорний шоколад"
    ],
    correctIndex: 0,
    explanation: "Улюблена їжа Ріна — очадзуке. Це рис, залитий зеленим чаєм або рибним даші, з лососем чи тай. Він цінує мінімалістичну й корисну їжу."
  },
  {
    block: "БЛОК 1: БІОГРАФІЯ ТА ОСОБИСТІСТЬ",
    question: "Що змусило Сае Ітоші відмовитися від мрії стати найкращим нападником після стажування в Реал Мадриді?",
    options: [
      "Сае отримав важку травму коліна і більше не міг бити з повною силою",
      "Сае зіткнувся з нападниками світового рівня й вирішив стати найкращим плеймейкером/півзахисником",
      "Керівництво клубу силоміць перевело його в захист через брак зросту",
      "Він розчарувався у футболі та хотів змусити Ріна покинути спорт"
    ],
    correctIndex: 1,
    explanation: "Побачивши рівень світових страйкерів в Іспанії, Сае тверезо переоцінив свої сили і вирішив підкорити світ як півзахисник номер один, що розбило їхню з Ріном дитячу обіцянку."
  },
  {
    block: "БЛОК 1: БІОГРАФІЯ ТА ОСОБИСТІСТЬ",
    question: "Яку незвичну звичку або хобі має Рін у повсякденному житті поза футбольним полем?",
    options: [
      "Читання історичної манги та гра в ґо",
      "Регулярні медитації та догляд за бонсай",
      "Перегляд фільмів жахів із кам’яним виразом обличчя та суворий стретчинг перед сном",
      "Колекціонування вінтажних кросівок і прослуховування класичної музики"
    ],
    correctIndex: 2,
    explanation: "Рін вважає горори розслаблюючими, бо монстри на екрані не викликають у нього страху, а його щовечірній стретчинг — це залізна дисципліна перед сном."
  },

  // БЛОК 2: Стиль гри, зброя та Flow
  {
    block: "БЛОК 2: СТИЛЬ ГРИ ТА «FLOW»",
    question: "Як називали первинну концепцію гри Ріна у Blue Lock до пробудження його справжнього его?",
    options: [
      "«Абсолютний егоїзм» — сольний дриблінг без передач",
      "«Маріонетковий футбол» — маніпуляція діями суперників та союзників",
      "«Хаотичний інстинкт» — гра виключно на швидких рефлексах",
      "«Тотальний пресинг» — жорсткий відбір по всьому полю"
    ],
    correctIndex: 1,
    explanation: "Рін прораховував дії кожного гравця на кілька ходів уперед, використовуючи їхні сильні та слабкі сторони як маріонеток для створення власного простору під удар."
  },
  {
    block: "БЛОК 2: СТИЛЬ ГРИ ТА «FLOW»",
    question: "Що є головною фірмовою зброєю Ріна при завданні ударів по воротах?",
    options: [
      "Неймовірна точність підкрутки м'яча та розрахунок траєкторії під будь-яким кутом",
      "Прямий гарматний удар без обертання",
      "Гра головою на другому поверсі з випередженням",
      "Акробатичний удар з льоту після підсікання п'ятою"
    ],
    correctIndex: 0,
    explanation: "Його техніка підкручування та геометричний розрахунок польоту м'яча бездоганні: Рін здатний вразити дальній кут воріт навіть із нульового кута чи крізь гущу захисту."
  },
  {
    block: "БЛОК 2: СТИЛЬ ГРИ ТА «FLOW»",
    question: "Як сам Рін формулює суть свого «справжнього его» та стану Flow, пробудженого в матчі проти U-20?",
    options: [
      "Грати так красиво й граціозно, щоб нарешті заслужити похвалу брата",
      "Досягти абсолютної тактичної синхронізації з усіма польовими гравцями",
      "«Потворне руйнування» — змусити суперника показати його найсильнішу зброю, щоб розчавити його саме в ній",
      "Досконалий контроль поля з використанням всеосяжного Metavision"
    ],
    correctIndex: 2,
    explanation: "Справжня природа гри Ріна — це не холодний тактичний розрахунок, а первісне знищення. Він змушує суперника викласти козир, щоб знищити його гордість."
  },
  {
    block: "БЛОК 2: СТИЛЬ ГРИ ТА «FLOW»",
    question: "Яка візуальна метафора чи аура супроводжує Ріна, коли він входить у максимальний стан трансу та шаленства?",
    options: [
      "Золоті спалахи блискавок та крила яструба",
      "Чорно-бірюзове полум'я, висунутий язик і темні щупальця розпаду",
      "Прозорі неонові призми та шахові лінії",
      "Синій лютий тигр, що розриває простір"
    ],
    correctIndex: 1,
    explanation: "У стані Flow Рін скидає маску байдужості, перетворюючись на нещадного хижака з висунутим язиком і темною водно-полум'яною аурою."
  },

  // БЛОК 3: Турнірний шлях та статистика
  {
    block: "БЛОК 3: ТУРНІРИ ТА СТАТИСТИКА",
    question: "З якими гравцями Рін утворив початкову трійку на Другому етапі відбору?",
    options: [
      "Шідо Рюсей та Карасу Табіто",
      "Джюбей Арію та Аоші Токіміцу",
      "Бачіра Меґуру та Наґі Сейшіро",
      "Мікаґе Рео та Кеню Юкімія"
    ],
    correctIndex: 1,
    explanation: "Трійка Ріна, Арію та Токіміцу представляла абсолютну верхівку рейтингу на початку другого відбору і розгромила команду Ісагі з рахунком 5:2."
  },
  {
    block: "БЛОК 3: ТУРНІРИ ТА СТАТИСТИКА",
    question: "Під яким номером на футболці Рін виступав у складі Blue Lock 11 проти збірної Японії U-20?",
    options: [
      "№ 9",
      "№ 11",
      "№ 10",
      "№ 1"
    ],
    correctIndex: 2,
    explanation: "Рін отримав культову «десятку» — статус центрального нападника, капітана та абсолютного вістря атаки команди Еґо."
  },
  {
    block: "БЛОК 3: ТУРНІРИ ТА СТАТИСТИКА",
    question: "До якого європейського клубу в Neo Egoist League приєднався Рін і хто став його майстер-страйкером?",
    options: [
      "Bastard München — Ноель Ноа",
      "Paris X Gen — Жульєн Локі",
      "Ubers — Марк Снаффі",
      "Manshine City — Кріс Прінс"
    ],
    correctIndex: 1,
    explanation: "Рін обрав французький гранд PXG під керівництвом Жульєна Локі — клуб, сфокусований на швидкості, талантах і гіпер-сучасному футболі."
  },
  {
    block: "БЛОК 3: ТУРНІРИ ТА СТАТИСТИКА",
    question: "Яку фінальну ринкову ставку отримав Ітоші Рін за підсумками турніру Neo Egoist League?",
    options: [
      "180,000,000 ¥",
      "198,000,000 ¥",
      "240,000,000 ¥ — розділив перше місце з Ісагі",
      "300,000,000 ¥"
    ],
    correctIndex: 2,
    explanation: "За підсумками всього турніру Neo Egoist League фінальна ставка Ріна сягнула рекордних 240,000,000 ¥ — він розділив абсолютне перше місце разом з Ісагі Йоічі та отримав офіційну пропозицію від клубу Re Al."
  },

  // БЛОК 4: Психологія, цитати та ключові протистояння
  {
    block: "БЛОК 4: ПСИХОЛОГІЯ ТА СУПЕРНИКИ",
    question: "Яким фірмовим японським словом Рін постійно зневажливо коментував зусилля суперників у значенні «тепленький, слабкий»?",
    options: [
      "Baka — дурний",
      "Nurui — тепла вода, слабак",
      "Zako — нікчема",
      "Shine — згинь"
    ],
    correctIndex: 1,
    explanation: "«Nurui» — культове слово Ріна. Для нього все, що не вимагає ризику й гри на абсолютній межі, здається теплою водою."
  },
  {
    block: "БЛОК 4: ПСИХОЛОГІЯ ТА СУПЕРНИКИ",
    question: "Чому після перемоги Blue Lock 11 над збірною U-20 Рін відчув лють і поразку, попри тріумф?",
    options: [
      "Він не зміг забити жодного м'яча за весь матч",
      "Його грубо травмував Олівер Айку",
      "Сае в післяматчевому інтерв'ю назвав майбутнім Японії не його, а Ісагі Йоічі",
      "Дзінпачі Еґо розкритикував його за надмірні емоції"
    ],
    correctIndex: 2,
    explanation: "Сае пройшов повз Ріна і публічно сказав пресі, що майбутнє японського футболу належить не йому, а Ісагі Йоічі. Це завдало Ріну нищівного удару по самолюбству."
  },
  {
    block: "БЛОК 4: ПСИХОЛОГІЯ ТА СУПЕРНИКИ",
    question: "Як Жульєн Локі вирішив проблему несумісності Ріна та Шідо Рюсея на полі в клубі PXG?",
    options: [
      "Шідо виходив на заміну лише на фінальні 5 хвилин",
      "Система «Double Star» — регулярна почергова зміна двох тактичних груп: система Ріна та система Шідо",
      "Ріна перевели в центр оборони, а Шідо зробили єдиним нападником",
      "Вони грали разом, але їм заборонялося пасувати один одному"
    ],
    correctIndex: 1,
    explanation: "Локі створив унікальну систему чергування: система Ріна опирається на контроль і методичність, а система Шідо — на чисті інстинкти та передачі Чарльза Шевальє."
  },
  {
    block: "БЛОК 4: ПСИХОЛОГІЯ ТА СУПЕРНИКИ",
    question: "Що стало остаточним переродженням мислення Ріна під час фіналу NEL проти Bastard München?",
    options: [
      "Він пробачив Сае і повернувся до дитячої командної гри",
      "Він відкинув одержимість Сае і знайшов справжню пристрасть у повному знищенні Ісагі Йоічі",
      "Він вирішив назавжди покинути футбол, якщо не заб'є вирішальний м'яч",
      "Він визнав лідерство Ісагі й погодився бути його другим номером"
    ],
    correctIndex: 1,
    explanation: "Рін усвідомив, що грати заради визнання брата було оманою. Справжнє полум'я його его запалює виключно знищення Ісагі Йоічі у відкритій битві."
  }
];

// -------------------------------------------------------------
// 2D TACTICAL BALLISTICS & FLOW ARENA SIMULATOR (ITOSHI RIN)
// -------------------------------------------------------------
class RaylibCanvasSimulator {
  constructor(canvas, sfx) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.sfx = sfx;

    // Logical Pitch Coordinate Space
    this.W = 920;
    this.H = 580;
    this.goalY = 66;
    this.goalW = 292;
    this.goalLeft = (this.W - this.goalW) / 2;
    this.goalRight = this.goalLeft + this.goalW;
    this.netDepth = 42;
    this.topBinWidth = 62;

    // Storage Keys
    this.storageBestKey = 'rin_arena_best_score_v2';
    this.storageStreakKey = 'rin_arena_best_streak_v2';

    // Game Progress State
    this.scenarioIndex = 0;
    this.endlessWave = 1;
    this.score = 0;
    this.streak = 0;
    this.bestScore = this.readStoredInt(this.storageBestKey, 0);
    this.flowCharge = 100; // Start ready so player can experience Destroyer Flow immediately
    this.flowActive = false;
    this.shotCount = 0;

    // Spin & Aim State
    this.currentSpin = 0; // -100 .. +100
    this.isDragging = false;
    this.activePointerId = null;
    this.dragCurrent = { x: 0, y: 0 };
    this.launchVec = { vx: 0, vy: 0, powerPct: 0, angleDeg: 0 };

    // Ball State
    this.spawnPos = { x: 795, y: 448 };
    this.ball = {
      x: this.spawnPos.x,
      y: this.spawnPos.y,
      vx: 0,
      vy: 0,
      radius: 11.5,
      spin: 0,
      rotAngle: 0,
      inFlight: false,
      resultHandled: false,
      hitMarionette: false,
      trail: []
    };

    // Dynamic Field Entities
    this.gk = {
      x: this.W * 0.5,
      y: this.goalY + 26,
      w: 44,
      h: 22,
      minX: this.goalLeft + 30,
      maxX: this.goalRight - 30,
      speed: 190,
      diveOffset: 0,
      stunTimer: 0,
      label: 'BLUE LOCK MAN'
    };
    this.defenders = [];
    this.marionetteGate = null;

    // Visual FX & Feedback
    this.particles = [];
    this.shockwaves = [];
    this.banner = null;
    this.netRipple = { force: 0, phase: 0, x: this.W * 0.5 };
    this.shakeTimer = 0;
    this.shakeMag = 0;
    this.simTime = 0;
    this.resetRoundTimer = null;

    // UI Elements
    this.wrapperEl = document.querySelector('#gameSection .game-wrapper');
    this.overlayHint = document.getElementById('gameOverlayText');
    this.scenarioBriefEl = document.getElementById('gameScenarioBrief');
    this.scenarioPills = document.querySelectorAll('.scenario-pill[data-scenario]');

    this.hudScoreVal = document.getElementById('hudScoreVal');
    this.hudStreakVal = document.getElementById('hudStreakVal');
    this.hudBestVal = document.getElementById('hudBestVal');
    this.hudFlowPct = document.getElementById('hudFlowPct');
    this.hudFlowFill = document.getElementById('hudFlowFill');
    this.hudPowerAngle = document.getElementById('hudPowerAngle');

    this.spinSlider = document.getElementById('spinRangeSlider');
    this.spinMeter = document.getElementById('spinMeterDisplay');
    this.spinLeftBtn = document.getElementById('spinLeftBtn');
    this.spinZeroBtn = document.getElementById('spinZeroBtn');
    this.spinRightBtn = document.getElementById('spinRightBtn');
    this.triggerFlowBtn = document.getElementById('triggerFlowBtn');
    this.resetShotBtn = document.getElementById('resetShotBtn');

    this.scenarios = [
      {
        title: 'STAGE 01 // СУХИЙ ЛИСТ З КУТА',
        brief: "STAGE 01 // Закрутіть м'яч від правого флангу в дальню дев'ятку повз воротаря Blue Lock Man",
        spawn: { x: 792, y: 446 },
        recommendedSpin: -68,
        gkSpeed: 185,
        gkLabel: 'BLUE LOCK MAN',
        defenders: [
          { baseX: 648, baseY: 266, w: 32, h: 20, ampX: 38, freq: 1.5, phase: 0, type: 'blocker', label: 'DF #4' },
          { baseX: 495, baseY: 215, w: 30, h: 20, ampX: 28, freq: 1.1, phase: 1.7, type: 'blocker', label: 'DF #7' }
        ],
        gate: null
      },
      {
        title: 'STAGE 02 // ШТРАФНИЙ НАД СТІНКОЮ',
        brief: 'STAGE 02 // Обігніть щільну стінку захисників на 28 метрах та поцільте у верхній кут воріт',
        spawn: { x: 535, y: 474 },
        recommendedSpin: -62,
        gkSpeed: 215,
        gkLabel: 'BLM UNIT-02',
        defenders: [
          { baseX: 438, baseY: 298, w: 30, h: 22, ampX: 14, freq: 2.3, phase: 0, type: 'wall', label: 'W1' },
          { baseX: 474, baseY: 298, w: 30, h: 22, ampX: 14, freq: 2.3, phase: 0, type: 'wall', label: 'W2' },
          { baseX: 510, baseY: 298, w: 30, h: 22, ampX: 14, freq: 2.3, phase: 0, type: 'wall', label: 'W3' }
        ],
        gate: null
      },
      {
        title: 'STAGE 03 // МАРІОНЕТКОВИЙ ТЕАТР 4v4',
        brief: 'STAGE 03 // Проведіть дугу крізь бірюзове вікно «МАРІОНЕТКА x2» між захисниками Ісагі й Бачіри',
        spawn: { x: 230, y: 472 },
        recommendedSpin: 56,
        gkSpeed: 225,
        gkLabel: 'BLM UNIT-03',
        defenders: [
          { baseX: 360, baseY: 326, w: 30, h: 20, ampX: 52, freq: 1.85, phase: 0.4, type: 'blocker', label: 'ISAGI' },
          { baseX: 550, baseY: 256, w: 30, h: 20, ampX: 60, freq: 1.65, phase: 2.1, type: 'blocker', label: 'BACHIRA' }
        ],
        gate: { baseX: 430, y: 290, w: 94, ampX: 48, freq: 1.0 }
      },
      {
        title: 'STAGE 04 // ПРОБУДЖЕННЯ FLOW: U-20',
        brief: 'STAGE 04 // Застосуйте Destroyer Flow проти пресингу Неру та Айку і пробийте воротаря збірної U-20',
        spawn: { x: 460, y: 484 },
        recommendedSpin: -48,
        gkSpeed: 265,
        gkLabel: 'FUKAKU U-20',
        defenders: [
          { baseX: 375, baseY: 312, w: 32, h: 22, ampX: 72, freq: 2.2, phase: 0.2, type: 'aiku', label: 'NERU' },
          { baseX: 545, baseY: 238, w: 36, h: 22, ampX: 85, freq: 1.9, phase: 2.4, type: 'aiku', label: 'AIKU' },
          { baseX: 460, baseY: 364, w: 28, h: 20, ampX: 42, freq: 2.6, phase: 1.1, type: 'wall', label: 'NIO' }
        ],
        gate: { baseX: 460, y: 175, w: 88, ampX: 65, freq: 1.3 }
      }
    ];

    this.handleResize();
    this.initListeners();
    this.loadScenario(0, true);
    this.lastTime = performance.now();
    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  readStoredInt(key, fallback, min = 0, max = 999999) {
    try {
      const raw = localStorage.getItem(key);
      if (typeof raw !== 'string' || !/^-?\d+$/.test(raw.trim())) return fallback;
      const val = parseInt(raw.trim(), 10);
      return Number.isFinite(val) ? Math.max(min, Math.min(max, val)) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  saveBestScore() {
    try {
      localStorage.setItem(this.storageBestKey, String(this.bestScore));
      localStorage.setItem(this.storageStreakKey, String(this.streak));
    } catch (_) {}
  }

  handleResize() {
    if (!this.canvas || !this.ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(this.W * dpr);
    this.canvas.height = Math.round(this.H * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  initListeners() {
    window.addEventListener('resize', () => this.handleResize());

    const getCanvasPos = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (this.W / rect.width),
        y: (e.clientY - rect.top) * (this.H / rect.height)
      };
    };

    this.canvas.addEventListener('pointerdown', (e) => {
      if (this.ball.inFlight) return;
      const pos = getCanvasPos(e);
      const dist = Math.hypot(pos.x - this.ball.x, pos.y - this.ball.y);
      if (dist <= 95 || pos.y > 350) {
        this.isDragging = true;
        this.activePointerId = e.pointerId;
        this.dragCurrent = pos;
        try { this.canvas.setPointerCapture(e.pointerId); } catch (_) {}
        if (this.banner && this.ball.resultHandled) this.banner = null;
        this.updateAimCalculations();
      }
    });

    this.canvas.addEventListener('pointermove', (e) => {
      if (!this.isDragging || e.pointerId !== this.activePointerId) return;
      this.dragCurrent = getCanvasPos(e);
      this.updateAimCalculations();
    });

    const releaseShot = (e) => {
      if (!this.isDragging || (e.pointerId !== undefined && e.pointerId !== this.activePointerId)) return;
      this.isDragging = false;
      this.activePointerId = null;
      this.updateAimCalculations();

      if (this.launchVec.powerPct >= 14) {
        this.kickBall();
      } else {
        this.launchVec = { vx: 0, vy: 0, powerPct: 0, angleDeg: 0 };
        if (this.hudPowerAngle) this.hudPowerAngle.textContent = 'ОЧІКУВАННЯ УДАРУ';
      }
    };

    this.canvas.addEventListener('pointerup', releaseShot);
    this.canvas.addEventListener('pointercancel', releaseShot);

    this.canvas.addEventListener('wheel', (e) => {
      if (this.ball.inFlight) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? 8 : -8;
      this.adjustSpin(delta);
    }, { passive: false });

    if (this.spinSlider) {
      this.spinSlider.addEventListener('input', () => {
        this.setSpin(parseInt(this.spinSlider.value, 10) || 0);
      });
    }
    if (this.spinLeftBtn) {
      this.spinLeftBtn.addEventListener('click', () => {
        this.sfx.playClick();
        this.adjustSpin(-16);
      });
    }
    if (this.spinRightBtn) {
      this.spinRightBtn.addEventListener('click', () => {
        this.sfx.playClick();
        this.adjustSpin(16);
      });
    }
    if (this.spinZeroBtn) {
      this.spinZeroBtn.addEventListener('click', () => {
        this.sfx.playClick();
        this.setSpin(0);
      });
    }
    if (this.triggerFlowBtn) {
      this.triggerFlowBtn.addEventListener('click', () => this.toggleFlow());
    }
    if (this.resetShotBtn) {
      this.resetShotBtn.addEventListener('click', () => {
        this.sfx.playClick();
        this.resetBall();
      });
    }

    this.scenarioPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const idx = parseInt(pill.getAttribute('data-scenario'), 10);
        if (!isNaN(idx)) {
          this.sfx.playClick();
          this.loadScenario(idx);
        }
      });
    });

    // Scoped Keyboard Shortcuts (only when #gameSection is active and modal is closed)
    window.addEventListener('keydown', (e) => {
      const gameSec = document.getElementById('gameSection');
      const modal = document.getElementById('galleryModal');
      if (!gameSec || !gameSec.classList.contains('active')) return;
      if (modal && modal.classList.contains('active')) return;
      if (e.target && (e.target.tagName === 'INPUT' && e.target.type !== 'range')) return;

      const key = e.key.toLowerCase();
      if (key === 'a' || key === 'q') {
        this.adjustSpin(-12);
      } else if (key === 'd' || key === 'e') {
        this.adjustSpin(12);
      } else if (key === 'r') {
        this.resetBall();
      } else if (e.code === 'Space' || key === 'f') {
        e.preventDefault();
        this.toggleFlow();
      } else if (key >= '1' && key <= '5') {
        this.loadScenario(parseInt(key, 10) - 1);
      }
    });
  }

  buildEndlessScenario(wave) {
    const spots = [
      { x: 775, y: 452, spin: -62 },
      { x: 165, y: 456, spin: 62 },
      { x: 540, y: 476, spin: 50 },
      { x: 370, y: 472, spin: -48 },
      { x: 460, y: 492, spin: 42 }
    ];
    const spot = spots[(wave - 1) % spots.length];
    const defs = [];
    const defCount = Math.min(4, 1 + Math.floor((wave + 1) / 2));

    for (let i = 0; i < defCount; i++) {
      const bandY = 195 + i * 54;
      const baseX = 310 + ((i * 170 + wave * 75) % 320);
      defs.push({
        baseX,
        baseY: bandY,
        w: 32,
        h: 21,
        ampX: Math.min(115, 40 + wave * 12),
        freq: 1.35 + (i * 0.35) + Math.min(1.4, wave * 0.12),
        phase: i * 1.4,
        type: i === 0 ? 'aiku' : 'blocker',
        label: i === 0 ? 'AIKU' : `DF #${i + 2}`
      });
    }

    const useGate = wave % 2 === 0;
    return {
      title: `БЕРСЕРК-ХВИЛЯ #${wave}`,
      brief: `ENDLESS ХВИЛЯ #${wave} // Адаптуйтесь до нової позиції та швидкості захисту!`,
      spawn: { x: spot.x, y: spot.y },
      recommendedSpin: spot.spin,
      gkSpeed: Math.min(340, 195 + wave * 16),
      gkLabel: wave >= 4 ? 'OLIVER / BLM-X' : 'BLUE LOCK MAN',
      defenders: defs,
      gate: useGate ? { baseX: 460, y: 278, w: 86, ampX: 68, freq: 1.15 } : null
    };
  }

  loadScenario(index, silent = false) {
    clearTimeout(this.resetRoundTimer);
    this.scenarioIndex = Math.max(0, Math.min(4, index));
    if (this.scenarioIndex === 4 && !silent) {
      this.endlessWave = 1;
    }

    this.scenarioPills.forEach(p => {
      const idx = parseInt(p.getAttribute('data-scenario'), 10);
      const active = idx === this.scenarioIndex;
      p.classList.toggle('active', active);
      p.setAttribute('aria-selected', active ? 'true' : 'false');
    });

    const spec = this.scenarioIndex === 4
      ? this.buildEndlessScenario(this.endlessWave)
      : this.scenarios[this.scenarioIndex];

    this.spawnPos = { ...spec.spawn };
    this.gk.speed = spec.gkSpeed;
    this.gk.label = spec.gkLabel;
    this.gk.x = this.W * 0.5;
    this.gk.diveOffset = 0;
    this.gk.stunTimer = 0;

    this.defenders = spec.defenders.map(d => ({
      ...d,
      x: d.baseX,
      y: d.baseY,
      r: d.w * 0.52,
      hitFlash: 0
    }));

    this.marionetteGate = spec.gate
      ? { ...spec.gate, x: spec.gate.baseX, passed: false }
      : null;

    if (this.scenarioBriefEl) {
      this.scenarioBriefEl.textContent = spec.brief;
    }

    this.flowActive = false;
    this.setSpin(spec.recommendedSpin || 0);
    this.resetBall();
    this.updateHUD();
  }

  setSpin(val) {
    this.currentSpin = Math.max(-100, Math.min(100, val));
    if (this.spinSlider) this.spinSlider.value = String(this.currentSpin);
    if (this.spinMeter) {
      const rpm = Math.round(Math.abs(this.currentSpin) * 14.5);
      const dir = this.currentSpin < 0 ? '⟲ ' : (this.currentSpin > 0 ? '⟳ ' : '');
      this.spinMeter.textContent = `${dir}${rpm} RPM`;
      if (this.currentSpin < -12) {
        this.spinMeter.style.color = '#00ffc8';
      } else if (this.currentSpin > 12) {
        this.spinMeter.style.color = '#38bdf8';
      } else {
        this.spinMeter.style.color = '#94a3b8';
      }
    }
  }

  adjustSpin(delta) {
    if (this.ball.inFlight) return;
    this.setSpin(this.currentSpin + delta);
  }

  toggleFlow() {
    if (this.ball.inFlight) return;

    if (!this.flowActive) {
      if (this.flowCharge < 100) {
        this.banner = {
          text: `FLOW ЗАРЯДЖЕНО НА ${Math.round(this.flowCharge)}%`,
          sub: "Забивайте голи, цільте у дев'ятку або проходьте маріонеткові ворота",
          col: '#ff2a5f'
        };
        setTimeout(() => {
          if (this.banner && this.banner.text.startsWith('FLOW ЗАРЯДЖЕНО')) this.banner = null;
        }, 1600);
        return;
      }
      this.flowActive = true;
      this.gk.stunTimer = 1.6;
      this.sfx.playFlowAwaken();
      this.triggerShockwave(this.ball.x, this.ball.y, '#ff2a5f', 180);
      this.spawnParticles(this.ball.x, this.ball.y, '#ff2a5f', 26, 220);
      if (this.overlayHint) {
        this.overlayHint.textContent = '🔥 DESTROYER FLOW АКТИВОВАНО — РОЗЧАВІТЬ ЇХ У ЇХНІЙ ЗОНІ!';
        this.overlayHint.style.color = '#ff2a5f';
        this.overlayHint.style.borderColor = '#ff2a5f';
      }
    } else {
      this.flowActive = false;
      this.sfx.playClick();
      if (this.overlayHint) {
        this.overlayHint.textContent = "ВІДТЯГНІТЬ М'ЯЧ НАЗАД ДЛЯ ПРИЦІЛУ ТА СИЛИ УДАРУ";
        this.overlayHint.style.color = '#00ffc8';
        this.overlayHint.style.borderColor = 'rgba(0, 255, 200, 0.35)';
      }
    }
    this.updateHUD();
  }

  updateHUD() {
    if (this.hudScoreVal) this.hudScoreVal.textContent = String(this.score);
    if (this.hudStreakVal) this.hudStreakVal.textContent = `${this.streak}x`;
    if (this.hudBestVal) this.hudBestVal.textContent = String(this.bestScore);

    const pct = Math.max(0, Math.min(100, Math.round(this.flowCharge)));
    if (this.hudFlowPct) this.hudFlowPct.textContent = this.flowActive ? 'MAX AWAKENED' : `${pct}%`;
    if (this.hudFlowFill) this.hudFlowFill.style.width = `${pct}%`;

    if (this.wrapperEl) {
      this.wrapperEl.classList.toggle('flow-awakened', this.flowActive);
    }

    const gameSecActive = document.getElementById('gameSection')?.classList.contains('active');
    if (gameSecActive) {
      document.body.classList.toggle('flow-mode-active', this.flowActive);
    }

    if (this.triggerFlowBtn) {
      this.triggerFlowBtn.classList.toggle('active-flow', this.flowActive);
      this.triggerFlowBtn.classList.toggle('ready-flow', !this.flowActive && pct >= 100);
      if (this.flowActive) {
        this.triggerFlowBtn.textContent = '🔥 СКАСУВАТИ FLOW [F / ПРОБІЛ]';
      } else if (pct >= 100) {
        this.triggerFlowBtn.textContent = '🔥 АКТИВУВАТИ DESTROYER FLOW [F]';
      } else {
        this.triggerFlowBtn.textContent = `ЗАРЯД FLOW: ${pct}% — ЗАБИЙТЕ ДЛЯ 100%`;
      }
    }
  }

  stepBallMotion(state, dt, isFlow) {
    const speed = Math.hypot(state.vx, state.vy);
    if (speed > 20) {
      const rx = -state.vy / speed;
      const ry = state.vx / speed;
      const magnusGain = isFlow ? 9.4 : 7.6;
      const speedFactor = 0.42 + 0.58 * Math.min(speed / 900, 1.25);
      const accel = state.spin * magnusGain * speedFactor;
      state.vx += rx * accel * dt;
      state.vy += ry * accel * dt;
    }

    const drag = Math.pow(0.62, dt);
    state.vx *= drag;
    state.vy *= drag;
    state.x += state.vx * dt;
    state.y += state.vy * dt;
  }

  updateAimCalculations() {
    if (!this.isDragging) return;
    const dx = this.ball.x - this.dragCurrent.x;
    const dy = this.ball.y - this.dragCurrent.y;
    const rawDist = Math.hypot(dx, dy);

    if (rawDist < 22) {
      this.launchVec = { vx: 0, vy: 0, powerPct: 0, angleDeg: 0 };
      if (this.hudPowerAngle) this.hudPowerAngle.textContent = 'ТЯГНІТЬ СИЛЬНІШЕ';
      return;
    }

    const maxPull = 175;
    const clampedPull = Math.min(maxPull, rawDist);
    const powerNorm = (clampedPull - 18) / (maxPull - 18);
    const maxSpeed = this.flowActive ? 1240 : 1080;
    const speed = 420 + powerNorm * (maxSpeed - 420);

    const nx = dx / rawDist;
    const ny = dy / rawDist;
    this.launchVec = {
      vx: nx * speed,
      vy: ny * speed,
      powerPct: Math.round(powerNorm * 100),
      angleDeg: Math.round((Math.atan2(nx, -ny) * 180) / Math.PI)
    };

    if (this.hudPowerAngle) {
      this.hudPowerAngle.textContent = `${this.launchVec.powerPct}% // ${this.launchVec.angleDeg > 0 ? '+' : ''}${this.launchVec.angleDeg}°`;
    }
  }

  kickBall() {
    this.ball.vx = this.launchVec.vx;
    this.ball.vy = this.launchVec.vy;
    this.ball.spin = this.currentSpin;
    this.ball.inFlight = true;
    this.ball.resultHandled = false;
    this.ball.hitMarionette = false;
    this.ball.trail = [];
    this.shotCount++;

    if (this.flowActive) {
      this.flowCharge = 0;
    }

    this.sfx.playKick();
    this.triggerShockwave(this.ball.x, this.ball.y, this.flowActive ? '#ff2a5f' : '#00ffc8', 75);
    this.spawnParticles(this.ball.x, this.ball.y, this.flowActive ? '#ff2a5f' : '#00ffc8', 16, 160);
    if (this.hudPowerAngle) this.hudPowerAngle.textContent = `У ПОЛЬОТІ // ${this.launchVec.powerPct}%`;
    this.updateHUD();
  }

  resetBall() {
    clearTimeout(this.resetRoundTimer);
    this.ball.x = this.spawnPos.x;
    this.ball.y = this.spawnPos.y;
    this.ball.vx = 0;
    this.ball.vy = 0;
    this.ball.inFlight = false;
    this.ball.resultHandled = false;
    this.ball.hitMarionette = false;
    this.ball.trail = [];
    if (this.marionetteGate) this.marionetteGate.passed = false;
    this.isDragging = false;
    this.activePointerId = null;
    this.banner = null;
    if (this.hudPowerAngle) this.hudPowerAngle.textContent = 'ОЧІКУВАННЯ УДАРУ';
    if (this.overlayHint) {
      this.overlayHint.textContent = this.flowActive
        ? '🔥 DESTROYER FLOW АКТИВОВАНО — РОЗЧАВІТЬ ЇХ У ЇХНІЙ ЗОНІ!'
        : "ВІДТЯГНІТЬ М'ЯЧ НАЗАД ДЛЯ ПРИЦІЛУ ТА СИЛИ УДАРУ";
      this.overlayHint.style.color = this.flowActive ? '#ff2a5f' : '#00ffc8';
      this.overlayHint.style.borderColor = this.flowActive ? '#ff2a5f' : 'rgba(0, 255, 200, 0.35)';
    }
    this.updateHUD();
  }

  addCharge(amount) {
    this.flowCharge = Math.min(100, this.flowCharge + amount);
  }

  scheduleNextShot(advanceEndless = false) {
    clearTimeout(this.resetRoundTimer);
    this.resetRoundTimer = setTimeout(() => {
      this.flowActive = false;
      if (advanceEndless && this.scenarioIndex === 4) {
        this.endlessWave++;
        this.loadScenario(4, true);
      } else {
        this.resetBall();
      }
    }, 1550);
  }

  handleGoalScored(ballX) {
    this.ball.resultHandled = true;
    this.ball.inFlight = false;
    this.streak++;

    const isLeftTopBin = ballX <= this.goalLeft + this.topBinWidth;
    const isRightTopBin = ballX >= this.goalRight - this.topBinWidth;
    const isTopBin = isLeftTopBin || isRightTopBin;
    const isBigCurve = Math.abs(this.ball.spin) >= 50;

    let pts = 100;
    const tags = [];
    if (isTopBin) { pts += 100; tags.push("ДЕВ'ЯТКА +100"); }
    if (this.ball.hitMarionette) { pts += 150; tags.push('МАРІОНЕТКА +150'); }
    if (isBigCurve) { pts += 60; tags.push('ЕФЕКТ МАГНУСА +60'); }
    if (this.flowActive) { pts *= 2; tags.push('FLOW x2'); }

    const streakBonus = Math.min(4, Math.floor((this.streak - 1) / 2)) * 25;
    pts += streakBonus;
    this.score += pts;

    if (this.score > this.bestScore) {
      this.bestScore = this.score;
    }
    this.saveBestScore();

    if (!this.flowActive) {
      this.addCharge(35 + (isTopBin ? 25 : 0) + (isBigCurve ? 15 : 0) + (this.ball.hitMarionette ? 30 : 0));
    }

    this.netRipple = { force: 16, phase: 0, x: ballX };
    this.shakeTimer = 0.25;
    this.shakeMag = this.flowActive || isTopBin ? 8 : 5;
    this.sfx.playGoal();

    const col = this.flowActive ? '#ff2a5f' : '#00ffc8';
    this.triggerShockwave(ballX, this.goalY, col, 130);
    this.spawnParticles(ballX, this.goalY, col, 36, 290);

    this.banner = {
      text: this.flowActive ? `🔥 DESTROYER ГОЛ! +${pts}` : (isTopBin ? `🎯 ТІЛЬКИ ДЕВ'ЯТКА! +${pts}` : `⚽ ГОЛ! +${pts}`),
      sub: tags.length ? tags.join('  •  ') : 'ХОЛОДНОКРОВНИЙ ПОСТРІЛ РІНА',
      col
    };

    this.updateHUD();
    this.scheduleNextShot(this.scenarioIndex === 4);
  }

  handleShotStopped(reasonTitle, reasonSub, col) {
    this.ball.resultHandled = true;
    this.streak = 0;
    this.saveBestScore();
    if (!this.flowActive) {
      this.addCharge(15);
    }
    this.banner = { text: reasonTitle, sub: reasonSub, col };
    this.updateHUD();
    this.scheduleNextShot(false);
  }

  triggerShockwave(x, y, col, maxR) {
    this.shockwaves.push({ x, y, r: 8, maxR, alpha: 0.9, col });
  }

  spawnParticles(x, y, col, count, speedMax) {
    for (let i = 0; i < count; i++) {
      const ang = Math.random() * Math.PI * 2;
      const spd = 40 + Math.random() * speedMax;
      this.particles.push({
        x, y,
        vx: Math.cos(ang) * spd,
        vy: Math.sin(ang) * spd,
        life: 0.45 + Math.random() * 0.45,
        maxLife: 0.9,
        size: 1.8 + Math.random() * 3.2,
        col
      });
    }
  }

  update(dt) {
    this.simTime += dt;

    if (this.shakeTimer > 0) this.shakeTimer = Math.max(0, this.shakeTimer - dt);
    if (this.netRipple.force > 0.1) {
      this.netRipple.phase += dt * 22;
      this.netRipple.force *= Math.pow(0.08, dt);
    } else {
      this.netRipple.force = 0;
    }

    const slowScale = this.flowActive ? 0.36 : 1.0;
    this.defenders.forEach(def => {
      def.x = def.baseX + Math.sin(this.simTime * def.freq * slowScale + def.phase) * def.ampX;
      def.jumpOffset = def.type === 'wall' ? Math.max(0, Math.sin(this.simTime * 3.2)) * 4 : 0;
      if (def.hitFlash > 0) def.hitFlash = Math.max(0, def.hitFlash - dt);
    });

    if (this.marionetteGate) {
      this.marionetteGate.x = this.marionetteGate.baseX + Math.sin(this.simTime * this.marionetteGate.freq * slowScale) * this.marionetteGate.ampX;
    }

    if (this.gk.stunTimer > 0) this.gk.stunTimer = Math.max(0, this.gk.stunTimer - dt);

    const gkEffectiveSpeed = this.flowActive ? this.gk.speed * 0.56 : this.gk.speed;
    if (this.ball.inFlight && this.ball.y < 395) {
      const leadX = this.ball.x + this.ball.vx * 0.14;
      const targetX = Math.max(this.gk.minX, Math.min(this.gk.maxX, leadX));
      const diff = targetX - this.gk.x;
      const step = gkEffectiveSpeed * 1.38 * dt;
      if (Math.abs(diff) > 2) {
        this.gk.x += Math.sign(diff) * Math.min(Math.abs(diff), step);
        this.gk.diveOffset = Math.max(-18, Math.min(18, diff * 0.28));
      }
    } else {
      const patrolTarget = this.W * 0.5 + Math.sin(this.simTime * 1.45) * (this.goalW * 0.28);
      const diff = patrolTarget - this.gk.x;
      this.gk.x += Math.sign(diff) * Math.min(Math.abs(diff), gkEffectiveSpeed * 0.72 * dt);
      this.gk.diveOffset *= Math.pow(0.05, dt);
    }

    if (this.ball.inFlight) {
      const subSteps = 4;
      const subDt = dt / subSteps;

      for (let s = 0; s < subSteps; s++) {
        if (!this.ball.inFlight) break;
        const prevY = this.ball.y;
        this.stepBallMotion(this.ball, subDt, this.flowActive);
        this.ball.rotAngle += this.ball.spin * 0.14 * subDt;

        if (this.marionetteGate && !this.ball.hitMarionette) {
          const crossedY = (prevY > this.marionetteGate.y && this.ball.y <= this.marionetteGate.y) ||
                           (Math.abs(this.ball.y - this.marionetteGate.y) < 12);
          if (crossedY && Math.abs(this.ball.x - this.marionetteGate.x) <= this.marionetteGate.w * 0.5) {
            this.ball.hitMarionette = true;
            this.sfx.playMarionetteGate();
            this.triggerShockwave(this.ball.x, this.marionetteGate.y, '#00ffc8', 95);
            this.spawnParticles(this.ball.x, this.marionetteGate.y, '#00ffc8', 22, 180);
          }
        }

        const posts = [
          { x: this.goalLeft, y: this.goalY, r: 7 },
          { x: this.goalRight, y: this.goalY, r: 7 }
        ];
        for (const post of posts) {
          const dx = this.ball.x - post.x;
          const dy = this.ball.y - post.y;
          const dist = Math.hypot(dx, dy);
          const minD = this.ball.radius + post.r;
          if (dist < minD && dist > 0.001) {
            const nx = dx / dist;
            const ny = dy / dist;
            this.ball.x = post.x + nx * minD;
            this.ball.y = post.y + ny * minD;
            const dot = this.ball.vx * nx + this.ball.vy * ny;
            this.ball.vx = (this.ball.vx - 2 * dot * nx) * 0.72;
            this.ball.vy = (this.ball.vy - 2 * dot * ny) * 0.72;
            this.sfx.playPostClank();
            this.shakeTimer = 0.15;
            this.shakeMag = 5;
            this.spawnParticles(post.x, post.y, '#fbbf24', 18, 200);
          }
        }

        if (this.ball.y <= this.goalY && this.ball.x > this.goalLeft + 4 && this.ball.x < this.goalRight - 4) {
          this.handleGoalScored(this.ball.x);
          break;
        }

        if (!this.ball.resultHandled) {
          const hitboxMult = this.flowActive ? 0.74 : 0.88;
          for (const def of this.defenders) {
            const dx = this.ball.x - def.x;
            const dy = this.ball.y - def.y;
            const dist = Math.hypot(dx, dy);
            const minD = this.ball.radius + def.r * hitboxMult;
            if (dist < minD && dist > 0.001) {
              def.hitFlash = 0.4;
              const nx = dx / dist;
              const ny = dy / dist;
              this.ball.x = def.x + nx * minD;
              this.ball.y = def.y + ny * minD;
              const dot = this.ball.vx * nx + this.ball.vy * ny;
              this.ball.vx = (this.ball.vx - 2 * dot * nx) * 0.55;
              this.ball.vy = (this.ball.vy - 2 * dot * ny) * 0.55;
              this.sfx.playBlocked();
              this.shakeTimer = 0.18;
              this.shakeMag = 5;
              this.spawnParticles(this.ball.x, this.ball.y, '#ef4444', 18, 170);
              this.handleShotStopped('ЗАБЛОКОВАНО СТІНКОЮ!', 'Збільште підкрутку Магнуса для обходу блоку', '#ef4444');
              break;
            }
          }
        }

        if (!this.ball.resultHandled) {
          const gkHalfW = this.gk.w * 0.5 + Math.abs(this.gk.diveOffset) * 0.35;
          const gkHalfH = this.gk.h * 0.5;
          if (
            this.ball.x >= this.gk.x - gkHalfW - this.ball.radius * 0.7 &&
            this.ball.x <= this.gk.x + gkHalfW + this.ball.radius * 0.7 &&
            this.ball.y >= this.gk.y - gkHalfH - this.ball.radius * 0.7 &&
            this.ball.y <= this.gk.y + gkHalfH + this.ball.radius * 0.7
          ) {
            this.ball.vy = Math.abs(this.ball.vy) * 0.58 + 120;
            this.ball.vx *= -0.4;
            this.sfx.playBlocked();
            this.shakeTimer = 0.2;
            this.shakeMag = 6;
            this.spawnParticles(this.ball.x, this.ball.y, '#ef4444', 22, 190);
            this.handleShotStopped('СЕЙВ ГОЛКІПЕРА!', `${this.gk.label} встиг зреагувати — цільтесь у кути!`, '#ef4444');
            break;
          }
        }

        if (
          !this.ball.resultHandled &&
          (this.ball.y < 14 || this.ball.y > this.H + 30 || this.ball.x < -30 || this.ball.x > this.W + 30)
        ) {
          this.sfx.playMiss();
          this.handleShotStopped('ПОВЗ ВОРОТА', 'Скоригуйте кут вильоту та RPM підкрутки', '#94a3b8');
          break;
        }
      }

      if (this.ball.inFlight) {
        this.ball.trail.push({ x: this.ball.x, y: this.ball.y, flow: this.flowActive });
        if (this.ball.trail.length > 26) this.ball.trail.shift();

        if (Math.hypot(this.ball.vx, this.ball.vy) < 42 && !this.ball.resultHandled) {
          this.ball.inFlight = false;
          this.sfx.playMiss();
          this.handleShotStopped('УДАР ЗГАС', 'Додайте більше сили натягу перед кидком', '#94a3b8');
        }
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx * dt;
      pt.y += pt.vy * dt;
      pt.vx *= Math.pow(0.18, dt);
      pt.vy *= Math.pow(0.18, dt);
      pt.life -= dt;
      if (pt.life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.r += (sw.maxR - sw.r) * Math.min(1, dt * 8);
      sw.alpha -= dt * 1.9;
      if (sw.alpha <= 0) this.shockwaves.splice(i, 1);
    }
  }

  loop(now) {
    const dt = Math.min(0.033, Math.max(0.001, (now - this.lastTime) / 1000));
    this.lastTime = now;

    this.update(dt);
    this.draw();
    requestAnimationFrame(this.loop);
  }

  draw() {
    const ctx = this.ctx;
    ctx.save();

    if (this.shakeTimer > 0) {
      const sx = (Math.random() - 0.5) * this.shakeMag * 2;
      const sy = (Math.random() - 0.5) * this.shakeMag * 2;
      ctx.translate(sx, sy);
    }

    const turfGrad = ctx.createLinearGradient(0, 0, 0, this.H);
    if (this.flowActive) {
      turfGrad.addColorStop(0, '#100712');
      turfGrad.addColorStop(0.45, '#09101a');
      turfGrad.addColorStop(1, '#04080e');
    } else {
      turfGrad.addColorStop(0, '#07171c');
      turfGrad.addColorStop(0.5, '#061218');
      turfGrad.addColorStop(1, '#040911');
    }
    ctx.fillStyle = turfGrad;
    ctx.fillRect(0, 0, this.W, this.H);

    const stripeCount = 10;
    const stripeW = this.W / stripeCount;
    for (let i = 0; i < stripeCount; i++) {
      if (i % 2 === 0) {
        ctx.fillStyle = this.flowActive ? 'rgba(255, 42, 95, 0.024)' : 'rgba(0, 255, 200, 0.022)';
        ctx.fillRect(i * stripeW, 0, stripeW, this.H);
      }
    }

    ctx.strokeStyle = this.flowActive ? 'rgba(255, 42, 95, 0.07)' : 'rgba(0, 255, 200, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x <= this.W; x += 46) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, this.H);
      ctx.stroke();
    }
    for (let y = 0; y <= this.H; y += 46) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(this.W, y);
      ctx.stroke();
    }

    ctx.strokeStyle = this.flowActive ? 'rgba(255, 42, 95, 0.38)' : 'rgba(0, 255, 200, 0.34)';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(28, this.goalY);
    ctx.lineTo(this.W - 28, this.goalY);
    ctx.stroke();

    ctx.strokeRect(this.W * 0.5 - 265, this.goalY, 530, 232);
    ctx.strokeRect(this.W * 0.5 - 155, this.goalY, 310, 92);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.beginPath();
    ctx.arc(this.W * 0.5, this.goalY + 172, 3.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.W * 0.5, this.goalY + 172, 95, 0.24 * Math.PI, 0.76 * Math.PI);
    ctx.stroke();

    const netTop = this.goalY - this.netDepth;
    ctx.save();
    ctx.fillStyle = 'rgba(0, 255, 200, 0.04)';
    ctx.fillRect(this.goalLeft, netTop, this.goalW, this.netDepth);

    const binColor = this.flowActive ? 'rgba(255, 42, 95, 0.24)' : 'rgba(0, 255, 200, 0.2)';
    ctx.fillStyle = binColor;
    ctx.fillRect(this.goalLeft + 2, this.goalY - 12, this.topBinWidth, 12);
    ctx.fillRect(this.goalRight - this.topBinWidth - 2, this.goalY - 12, this.topBinWidth, 12);

    ctx.fillStyle = this.flowActive ? '#ff6b91' : '#00ffc8';
    ctx.font = "bold 9px 'Exo 2', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText("ДЕВ'ЯТКА", this.goalLeft + this.topBinWidth * 0.5, this.goalY - 18);
    ctx.fillText("ДЕВ'ЯТКА", this.goalRight - this.topBinWidth * 0.5, this.goalY - 18);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.14)';
    ctx.lineWidth = 1;
    for (let x = this.goalLeft; x <= this.goalRight; x += 14) {
      const distFactor = Math.exp(-Math.pow((x - this.netRipple.x) / 55, 2));
      const shiftY = Math.sin(this.netRipple.phase) * this.netRipple.force * distFactor;
      ctx.beginPath();
      ctx.moveTo(x, this.goalY);
      ctx.quadraticCurveTo(x, netTop + this.netDepth * 0.4 + shiftY, x, netTop + shiftY * 0.5);
      ctx.stroke();
    }
    for (let y = netTop; y <= this.goalY; y += 10) {
      ctx.beginPath();
      ctx.moveTo(this.goalLeft, y);
      ctx.lineTo(this.goalRight, y);
      ctx.stroke();
    }

    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(this.goalLeft, this.goalY);
    ctx.lineTo(this.goalLeft, netTop);
    ctx.lineTo(this.goalRight, netTop);
    ctx.lineTo(this.goalRight, this.goalY);
    ctx.stroke();

    [this.goalLeft, this.goalRight].forEach(px => {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = this.flowActive ? '#ff2a5f' : '#00ffc8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(px, this.goalY, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    });
    ctx.restore();

    if (this.marionetteGate) {
      const mg = this.marionetteGate;
      const gCol = this.ball.hitMarionette ? '#4ade80' : '#00ffc8';
      ctx.save();
      ctx.strokeStyle = gCol;
      ctx.lineWidth = 2.5;
      ctx.setLineDash([7, 5]);
      ctx.beginPath();
      ctx.moveTo(mg.x - mg.w * 0.5, mg.y);
      ctx.lineTo(mg.x + mg.w * 0.5, mg.y);
      ctx.stroke();
      ctx.setLineDash([]);

      [mg.x - mg.w * 0.5, mg.x + mg.w * 0.5].forEach(px => {
        ctx.fillStyle = gCol;
        ctx.shadowColor = gCol;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(px, mg.y, 5.5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.fillStyle = gCol;
      ctx.font = "bold 10px 'Exo 2', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(this.ball.hitMarionette ? '✓ МАРІОНЕТКА АКТИВНА!' : 'МАРІОНЕТКА x2', mg.x, mg.y - 10);
      ctx.restore();
    }

    if (this.isDragging && this.launchVec.powerPct >= 14 && !this.ball.inFlight) {
      this.drawTrajectoryPreview(ctx);
    }

    for (const sw of this.shockwaves) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, sw.alpha);
      ctx.strokeStyle = sw.col;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(sw.x, sw.y, sw.r, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    this.defenders.forEach(def => {
      ctx.save();
      ctx.strokeStyle = this.flowActive ? 'rgba(255, 42, 95, 0.16)' : 'rgba(0, 255, 200, 0.1)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(this.ball.x, this.ball.y);
      ctx.lineTo(def.x, def.y);
      ctx.stroke();
      ctx.setLineDash([]);

      const bodyCol = def.hitFlash > 0 ? '#ef4444' : (def.type === 'aiku' ? '#7c3aed' : '#e11d48');
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.beginPath();
      ctx.ellipse(def.x, def.y + 8, def.w * 0.56, 7, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#0d1424';
      ctx.strokeStyle = bodyCol;
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      ctx.roundRect(def.x - def.w * 0.5, def.y - def.h * 0.5 - def.jumpOffset, def.w, def.h, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = bodyCol;
      ctx.beginPath();
      ctx.arc(def.x, def.y - def.jumpOffset - 1, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#f8fafc';
      ctx.font = "bold 9px 'Exo 2', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(def.label, def.x, def.y - def.h * 0.5 - def.jumpOffset - 6);
      ctx.restore();
    });

    ctx.save();
    const gkIntimidated = this.flowActive && this.gk.stunTimer > 0;
    const gkColor = gkIntimidated ? '#ff2a5f' : '#38bdf8';
    const gkStretchW = this.gk.w + Math.abs(this.gk.diveOffset) * 0.55;

    ctx.fillStyle = 'rgba(56, 189, 248, 0.14)';
    ctx.beginPath();
    ctx.ellipse(this.gk.x, this.gk.y + 6, gkStretchW * 0.65, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#091526';
    ctx.strokeStyle = gkColor;
    ctx.lineWidth = 2.5;
    ctx.shadowColor = gkColor;
    ctx.shadowBlur = gkIntimidated ? 14 : 8;
    ctx.beginPath();
    ctx.roundRect(this.gk.x - gkStretchW * 0.5, this.gk.y - this.gk.h * 0.5, gkStretchW, this.gk.h, 9);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    [-1, 1].forEach(side => {
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(this.gk.x + side * (gkStretchW * 0.46), this.gk.y, 4.2, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.fillStyle = gkColor;
    ctx.font = "bold 10px 'Exo 2', sans-serif";
    ctx.textAlign = 'center';
    ctx.fillText(this.gk.label, this.gk.x, this.gk.y - 16);
    ctx.restore();

    if (!this.ball.inFlight && !this.ball.resultHandled) {
      ctx.save();
      const pulse = 1 + Math.sin(this.simTime * 4) * 0.08;
      ctx.strokeStyle = this.flowActive ? 'rgba(255, 42, 95, 0.55)' : 'rgba(0, 255, 200, 0.42)';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      ctx.arc(this.ball.x, this.ball.y, 26 * pulse, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const rinSide = this.ball.x > this.W * 0.5 ? 1 : -1;
      const rinX = this.ball.x + rinSide * 26;
      const rinY = this.ball.y + 18;
      ctx.fillStyle = '#050b14';
      ctx.strokeStyle = this.flowActive ? '#ff2a5f' : '#00ffc8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rinX, rinY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = this.flowActive ? '#ff2a5f' : '#00ffc8';
      ctx.font = "bold 9px 'Exo 2', sans-serif";
      ctx.textAlign = rinSide > 0 ? 'left' : 'right';
      ctx.fillText('RIN #10', rinX + rinSide * 15, rinY + 3);

      if (this.isDragging) {
        ctx.strokeStyle = this.launchVec.powerPct >= 14
          ? (this.flowActive ? '#ff2a5f' : '#00ffc8')
          : 'rgba(148, 163, 184, 0.5)';
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(this.ball.x, this.ball.y);
        ctx.lineTo(this.dragCurrent.x, this.dragCurrent.y);
        ctx.stroke();

        ctx.fillStyle = ctx.strokeStyle;
        ctx.beginPath();
        ctx.arc(this.dragCurrent.x, this.dragCurrent.y, 6, 0, Math.PI * 2);
        ctx.fill();

        if (this.launchVec.powerPct >= 14) {
          ctx.font = "bold 12px 'Exo 2', sans-serif";
          ctx.fillText(`${this.launchVec.powerPct}%`, this.dragCurrent.x, this.dragCurrent.y + 20);
        }
      }
      ctx.restore();
    }

    if (this.ball.trail.length > 1) {
      for (let i = 1; i < this.ball.trail.length; i++) {
        const p0 = this.ball.trail[i - 1];
        const p1 = this.ball.trail[i];
        const frac = i / this.ball.trail.length;
        ctx.strokeStyle = p1.flow
          ? `rgba(255, 42, 95, ${frac * 0.72})`
          : `rgba(0, 255, 200, ${frac * 0.58})`;
        ctx.lineWidth = frac * 11;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(p0.x, p0.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.stroke();
      }
    }

    ctx.save();
    ctx.translate(this.ball.x, this.ball.y);
    ctx.rotate(this.ball.rotAngle);
    ctx.shadowColor = this.flowActive ? '#ff2a5f' : '#00ffc8';
    ctx.shadowBlur = this.flowActive ? 22 : 12;

    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    ctx.fillStyle = this.flowActive ? '#ff2a5f' : '#092229';
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const a = (i * 2 * Math.PI) / 5;
      const px = Math.cos(a) * 5;
      const py = Math.sin(a) * 5;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#0f172a';
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.arc(0, 0, this.ball.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    for (const pt of this.particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, pt.life / pt.maxLife);
      ctx.fillStyle = pt.col;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    if (this.flowActive) {
      const edgeGrad = ctx.createRadialGradient(this.W * 0.5, this.H * 0.5, 220, this.W * 0.5, this.H * 0.5, 560);
      edgeGrad.addColorStop(0, 'transparent');
      edgeGrad.addColorStop(1, 'rgba(255, 42, 95, 0.22)');
      ctx.fillStyle = edgeGrad;
      ctx.fillRect(0, 0, this.W, this.H);
    }

    if (this.banner) {
      ctx.save();
      ctx.fillStyle = 'rgba(5, 9, 17, 0.9)';
      ctx.strokeStyle = this.banner.col;
      ctx.lineWidth = 2;
      ctx.shadowColor = this.banner.col;
      ctx.shadowBlur = 24;
      ctx.beginPath();
      ctx.roundRect(this.W * 0.5 - 245, this.H * 0.5 - 48, 490, 96, 12);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.fillStyle = this.banner.col;
      ctx.font = "800 20px 'Unbounded', 'Exo 2', sans-serif";
      ctx.textAlign = 'center';
      ctx.fillText(this.banner.text, this.W * 0.5, this.H * 0.5 - 6);

      ctx.fillStyle = '#cbd5e1';
      ctx.font = "500 12.5px Inter, sans-serif";
      ctx.fillText(this.banner.sub, this.W * 0.5, this.H * 0.5 + 24);
      ctx.restore();
    }

    ctx.restore();
  }

  drawTrajectoryPreview(ctx) {
    const sim = {
      x: this.ball.x,
      y: this.ball.y,
      vx: this.launchVec.vx,
      vy: this.launchVec.vy,
      spin: this.currentSpin
    };

    const subDt = 1 / 96;
    const pts = [];
    let blockedAt = null;
    const hitboxMult = this.flowActive ? 0.74 : 0.88;

    for (let i = 0; i < 66; i++) {
      this.stepBallMotion(sim, subDt, this.flowActive);
      pts.push({ x: sim.x, y: sim.y });

      if (sim.y <= this.goalY) break;
      for (const def of this.defenders) {
        if (Math.hypot(sim.x - def.x, sim.y - def.y) < this.ball.radius + def.r * hitboxMult) {
          blockedAt = { x: sim.x, y: sim.y };
          break;
        }
      }
      if (blockedAt) break;
    }

    ctx.save();
    for (let i = 0; i < pts.length; i += 2) {
      const p = pts[i];
      const fade = 1 - i / pts.length;
      ctx.fillStyle = blockedAt && i >= pts.length - 4
        ? `rgba(239, 68, 68, ${fade * 0.9})`
        : (this.flowActive ? `rgba(255, 42, 95, ${fade * 0.82})` : `rgba(0, 255, 200, ${fade * 0.8})`);
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2.2 + fade * 1.4, 0, Math.PI * 2);
      ctx.fill();
    }

    if (blockedAt) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(blockedAt.x, blockedAt.y, 10, 0, Math.PI * 2);
      ctx.stroke();
    } else if (pts.length) {
      const endPt = pts[pts.length - 1];
      ctx.strokeStyle = this.flowActive ? '#ff2a5f' : '#00ffc8';
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(endPt.x, endPt.y, 8, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }
}

// -------------------------------------------------------------
// EMBEDDED QUIZ CONTROLLER
// -------------------------------------------------------------
class EmbeddedQuizApp {
  constructor(sfx) {
    this.sfx = sfx;
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;

    // Elements
    this.introSubScreen = document.getElementById('quizIntroSubScreen');
    this.activeSubScreen = document.getElementById('quizActiveSubScreen');
    this.resultSubScreen = document.getElementById('quizResultSubScreen');

    this.startBtn = document.getElementById('startEmbeddedQuizBtn');
    this.currentBlockBadge = document.getElementById('currentBlockBadge');
    this.questionNumText = document.getElementById('questionNumText');
    this.progressBarFill = document.getElementById('progressBarFill');
    this.questionText = document.getElementById('questionText');
    this.optionsGrid = document.getElementById('optionsGrid');

    this.feedbackBox = document.getElementById('feedbackBox');
    this.feedbackStatusIcon = document.getElementById('feedbackStatusIcon');
    this.feedbackTitle = document.getElementById('feedbackTitle');
    this.feedbackExplanation = document.getElementById('feedbackExplanation');
    this.nextQuestionBtn = document.getElementById('nextQuestionBtn');

    this.rankTitle = document.getElementById('rankTitle');
    this.rankTierBadge = document.getElementById('rankTierBadge');
    this.rankBox = document.getElementById('rankBox');
    this.finalScore = document.getElementById('finalScore');
    this.scorePercent = document.getElementById('scorePercent');
    this.rinVerdictQuote = document.getElementById('rinVerdictQuote');
    this.blockStatsList = document.getElementById('blockStatsList');

    this.restartBtn = document.getElementById('restartBtn');
    this.shareBtn = document.getElementById('shareBtn');
    this.toggleReviewBtn = document.getElementById('toggleReviewBtn');
    this.reviewContainer = document.getElementById('reviewContainer');
    this.reviewList = document.getElementById('reviewList');

    this.bindEvents();
  }

  bindEvents() {
    this.startBtn.addEventListener('click', () => {
      this.sfx.playClick();
      this.start();
    });

    this.nextQuestionBtn.addEventListener('click', () => {
      this.sfx.playClick();
      this.advance();
    });

    this.restartBtn.addEventListener('click', () => {
      this.sfx.playClick();
      this.start();
    });

    this.shareBtn.addEventListener('click', () => {
      this.sfx.playClick();
      this.copyShare();
    });

    this.toggleReviewBtn.addEventListener('click', () => {
      this.sfx.playClick();
      this.reviewContainer.classList.toggle('active');
      const isOpen = this.reviewContainer.classList.contains('active');
      this.toggleReviewBtn.querySelector('span').textContent = isOpen ? 'ПРИХОВАТИ РОЗБІР ПОМИЛОК' : 'РОЗГОРНУТИ РОЗБІР ПОМИЛОК';
    });
  }

  showSubScreen(screen) {
    [this.introSubScreen, this.activeSubScreen, this.resultSubScreen].forEach(s => s.classList.remove('active'));
    screen.classList.add('active');
  }

  start() {
    this.currentIndex = 0;
    this.userAnswers = [];
    this.answeredCurrent = false;
    this.reviewContainer.classList.remove('active');
    this.showSubScreen(this.activeSubScreen);
    this.renderQuestion();
  }

  renderQuestion() {
    this.answeredCurrent = false;
    this.feedbackBox.classList.remove('active', 'is-correct', 'is-wrong');

    const q = QUIZ_DATA[this.currentIndex];
    const total = QUIZ_DATA.length;

    this.currentBlockBadge.textContent = q.block;
    this.questionNumText.textContent = String(this.currentIndex + 1).padStart(2, '0');
    this.progressBarFill.style.width = `${(this.currentIndex / total) * 100}%`;
    this.questionText.textContent = q.question;

    this.optionsGrid.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    q.options.forEach((optText, idx) => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.innerHTML = `<span class="option-key">${letters[idx]}</span><span class="option-text">${optText}</span>`;
      btn.addEventListener('click', () => this.handleSelect(idx));
      this.optionsGrid.appendChild(btn);
    });
  }

  handleSelect(idx) {
    if (this.answeredCurrent) return;
    this.answeredCurrent = true;

    const q = QUIZ_DATA[this.currentIndex];
    const isCorrect = (idx === q.correctIndex);
    this.userAnswers.push({ selectedIndex: idx, isCorrect });

    if (isCorrect) {
      this.sfx.playGoal();
    } else {
      this.sfx.playBlocked();
    }

    const btns = this.optionsGrid.querySelectorAll('.option-btn');
    btns.forEach((btn, bIdx) => {
      btn.disabled = true;
      if (bIdx === q.correctIndex) btn.classList.add('correct');
      else if (bIdx === idx) btn.classList.add('incorrect');
    });

    this.feedbackBox.classList.remove('is-correct', 'is-wrong');
    if (isCorrect) {
      this.feedbackBox.classList.add('active', 'is-correct');
      this.feedbackStatusIcon.textContent = '✓';
      this.feedbackTitle.textContent = 'ТОЧНИЙ РОЗРАХУНОК';
    } else {
      this.feedbackBox.classList.add('active', 'is-wrong');
      this.feedbackStatusIcon.textContent = '✕';
      this.feedbackTitle.textContent = 'ПОМИЛКА У СПРИЙНЯТТІ ПОЛЯ';
    }

    this.feedbackExplanation.textContent = q.explanation;
    this.nextQuestionBtn.querySelector('span').textContent = (this.currentIndex === QUIZ_DATA.length - 1) ? 'ПЕРЕГЛЯНУТИ ВЕРДИКТ' : 'ДАЛІ';

    setTimeout(() => {
      this.feedbackBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  }

  advance() {
    this.currentIndex++;
    if (this.currentIndex < QUIZ_DATA.length) {
      this.renderQuestion();
    } else {
      this.showResults();
    }
  }

  showResults() {
    this.progressBarFill.style.width = '100%';
    this.showSubScreen(this.resultSubScreen);
    this.sfx.playGoal();

    const total = QUIZ_DATA.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const accuracy = Math.round((correctCount / total) * 100);

    this.finalScore.textContent = correctCount;
    this.scorePercent.textContent = `${accuracy}% ТОЧНІСТЬ`;

    let rankName = "";
    let tierText = "";
    let tierClass = "";
    let verdict = "";

    if (correctCount >= 15) {
      rankName = "MONSTER OF DESTRUCTION";
      tierText = "S+ TIER // ПОВНЕ ПРОБУДЖЕННЯ";
      verdict = "«Ти бачиш поле крізь ту ж саму призму безжального знищення. Твоє розуміння досконале. Ми ще зустрінемось у фіналі.»";
    } else if (correctCount >= 11) {
      rankName = "СВІТОВИЙ ЕГОЇСТ";
      tierText = "S/A TIER // ОСНОВНИЙ КАЛІБР";
      verdict = "«Непогано. Ти розумієш геометрію моєї гри і бачиш нитки, якими я керую. Але доки ти не готовий зруйнувати все до тла — ти все ще на крок позаду.»";
    } else if (correctCount >= 7) {
      rankName = "ГРАВЕЦЬ ОСНОВНОГО СКЛАДУ";
      tierText = "B TIER // ДОСТАТНІЙ РІВЕНЬ";
      verdict = "«Твоя реакція запізнюється. Ти запам'ятав лише базові рухи, але не відчув справжньої суті мого его. Перечитай моменти U-20.»";
    } else {
      rankName = "ТЕПЛА ВОДА // NURUI";
      tierText = "C TIER // ПОВНЕ ВІДСІЮВАННЯ";
      tierClass = "tier-nurui";
      verdict = "«Nurui. Все, що ти показав — це прісна тепла вода. З таким розумінням гри тобі взагалі не варто було заходити у Blue Lock.»";
    }

    this.rankTitle.textContent = rankName;
    this.rankTierBadge.textContent = tierText;
    this.rankBox.className = `rank-result-box ${tierClass}`;
    this.rinVerdictQuote.textContent = verdict;

    this.renderStats();
    this.renderReview();
  }

  renderStats() {
    this.blockStatsList.innerHTML = '';
    const blockNames = [
      "БЛОК 1: БІОГРАФІЯ ТА ОСОБИСТІСТЬ",
      "БЛОК 2: СТИЛЬ ГРИ ТА «FLOW»",
      "БЛОК 3: ТУРНІРИ ТА СТАТИСТИКА",
      "БЛОК 4: ПСИХОЛОГІЯ ТА СУПЕРНИКИ"
    ];

    blockNames.forEach(bName => {
      const qIndices = QUIZ_DATA.map((q, i) => q.block === bName ? i : -1).filter(i => i !== -1);
      const bCorrect = qIndices.filter(i => this.userAnswers[i]?.isCorrect).length;
      const bTotal = qIndices.length;
      const percent = Math.round((bCorrect / bTotal) * 100);

      const item = document.createElement('div');
      item.className = 'block-stat-item';
      item.innerHTML = `
        <div class="block-stat-header">
          <span class="block-stat-name">${bName}</span>
          <span class="block-stat-score">${bCorrect} / ${bTotal} • ${percent}%</span>
        </div>
        <div class="block-stat-bar-track">
          <div class="block-stat-bar-fill" style="width: ${percent}%"></div>
        </div>
      `;
      this.blockStatsList.appendChild(item);
    });
  }

  renderReview() {
    this.reviewList.innerHTML = '';
    const letters = ['A', 'B', 'C', 'D'];

    QUIZ_DATA.forEach((q, idx) => {
      const uAns = this.userAnswers[idx];
      const isCorrect = uAns ? uAns.isCorrect : false;
      const userLetter = uAns ? letters[uAns.selectedIndex] : '—';
      const userText = uAns ? q.options[uAns.selectedIndex] : 'Немає';
      const correctLetter = letters[q.correctIndex];
      const correctText = q.options[q.correctIndex];

      const item = document.createElement('div');
      item.className = `review-item ${isCorrect ? 'is-correct' : 'is-wrong'}`;
      item.innerHTML = `
        <div class="review-q-header">
          <span>#${String(idx + 1).padStart(2, '0')} // ${q.block}</span>
          <span>${isCorrect ? '✓ ПРАВИЛЬНО' : '✕ ПОМИЛКА'}</span>
        </div>
        <div class="review-q-title">${q.question}</div>
        <div class="review-answers-compare">
          <div>Ваша відповідь: <strong class="user-ans ${isCorrect ? 'match' : ''}">${userLetter} • ${userText}</strong></div>
          ${!isCorrect ? `<div>Правильна: <strong class="correct-ans">${correctLetter} • ${correctText}</strong></div>` : ''}
        </div>
        <div class="review-explanation">${q.explanation}</div>
      `;
      this.reviewList.appendChild(item);
    });
  }

  copyShare() {
    const total = QUIZ_DATA.length;
    const correctCount = this.userAnswers.filter(a => a.isCorrect).length;
    const rank = this.rankTitle.textContent;
    const text = `⚽ Мій результат у тесті про Ітоші Ріна — Blue Lock: ${correctCount}/${total} [Ранг: ${rank}]!\nСпробуй перевершити моє его! 🔥`;

    navigator.clipboard.writeText(text).then(() => {
      this.showToast('Результат скопійовано в буфер обміну!');
    }).catch(() => {
      this.showToast('Не вдалося скопіювати.');
    });
  }

  showToast(msg) {
    let toast = document.querySelector('.toast-msg');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-msg';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }
}

// -------------------------------------------------------------
// GALLERY MOMENTS DATASET (CANON ANIME & MANGA EPISODES)
// -------------------------------------------------------------
const GALLERY_MOMENTS = [
  {
    "index": 0,
    "badge": "ORIGINS // ITOSHI BROTHERS",
    "canon": "СПОГАДИ ДИТИНСТВА // РОЗДІЛ 124",
    "egoBadge": "INNOCENT VOW",
    "title": "Клятва під зливою: Брати Ітоші та спільна мрія",
    "cardTag": "ORIGINS & DUALITY",
    "cardCh": "CH. 124",
    "cardTitle": "Клятва під дощем: Брати Ітоші",
    "cardSub": "«Ти геній, Ріне» • Спільна мрія дитинства",
    "img": "assets/rin_resolve_football.webp",
    "quote": "«Ти геній, Ріне. Ми підкоримо цей світ удвох: я буду номером один, а ти — номером два.»",
    "context": "// Перший прояв футбольного таланту маленького Ріна під дощем",
    "narrative": "У дитинстві Рін обожнював свого старшого брата Сае і не уявляв життя без нього. Під час гри у дворі під проливним дощем, коли захист щільно перекрив прямий прохід, маленький Рін інтуїтивно пробив у єдину вільну мертву зону, вразивши ворота й змусивши Сае затамувати подих. Сае купив молодшому братові морозиво і запропонував велику клятву: разом виграти кубок світу. Ця обіцянка була дороговказом Ріна, поки Сае після повернення з Європи не розірвав її на засніженому полі зі словами «Nurui».",
    "tactical": "Вроджене просторове бачення: здатність миттєво зчитувати кути польоту м'яча без спеціальної підготовки, спираючись на чистий інстинкт та відчуття геометрії поля.",
    "egoStatus": "CHILDHOOD PRODIGY // THE BROTHER'S SHADOW",
    "rival": "САЕ ІТОШІ // СТАРШИЙ БРАТ"
  },
  {
    "index": 1,
    "badge": "WINTER SHATTER // TRAUMA",
    "canon": "СПОГАДИ РІНА // РОЗДІЛ 125 // АНІМЕ ЕП. 23",
    "egoBadge": "COLD SEPARATION",
    "title": "Травма зимового снігу: «Nurui — ти заслабкий»",
    "cardTag": "WINTER SHATTER",
    "cardCh": "CH. 125 / EP. 23",
    "cardTitle": "Зимовий розкол: Зрада Сае під снігом",
    "cardSub": "«Кидай футбол» • Народження люті та помсти",
    "img": "assets/rin_sae_snow_duel.webp",
    "quote": "«Якщо ти не здатен навіть уявити футбол без мене — ти просто слабак. Кидай футбол, Ріне.»",
    "context": "// Розрив братерських зв'язків та переродження любові на лють",
    "narrative": "Сае повертається з Мадрида з новиною про те, що відмовляється від мрії стати нападником №1 і переходить на позицію півзахисника. Рін у розпачі благає його не кидати спільну мрію. На засніженому майданчику Сае викликає молодшого брата на дуель 1-на-1, легко знищує його дриблінгом, називає його футбол теплою водою і наказує зав'язувати зі спортом. Цей день назавжди змінив особистість Ріна, перетворивши футбол на персональний інструмент помсти.",
    "tactical": "Удар по психіці: Сае показує Ріну повну технічну безпорадність перед європейською швидкістю прийняття рішень, що змусило Ріна фанатично нарощувати власний технічний арсенал.",
    "egoStatus": "BORN IN ANGER // VENGEANCE EGO",
    "rival": "САЕ ІТОШІ // КОРОЛІВСЬКИЙ КЛУБ RE AL"
  },
  {
    "index": 2,
    "badge": "FIRST TO ENTER // RANK #1",
    "canon": "СТАРТ ДРУГОГО ЕТАПУ // РОЗДІЛ 43 // АНІМЕ ЕП. 11",
    "egoBadge": "SOLITARY REAPER",
    "title": "Вхід першим: Випробування голографічного воротаря Blue Lock Man",
    "cardTag": "2ND SELECTION GATE",
    "cardCh": "CH. 43 / EP. 11",
    "cardTitle": "Вхід першим: Кімната 100 голів",
    "cardSub": "Ранг №1 серед 125 форвардів Blue Lock",
    "img": "assets/rin_going_first.webp",
    "quote": "«Ви тут усі просто баласт. Мені байдуже, скільки вас — я пройду перший.»",
    "context": "// Початок Другого етапу відбору Blue Lock",
    "narrative": "Коли 125 найкращих форвардів Японії після Першого відбору вагаються перед темними дверима невідомого другого етапу, Рін мовчки підводиться і першим переступає поріг. У залі з голографічним воротарем Blue Lock Man Рін ставить абсолютний рекорд швидкості проходження випробування у 100 голів, вражаючи мішені крученими пострілами з хірургічною точністю та офіційно отримуючи ранг №1 усього проєкту.",
    "tactical": "Тест на витривалість і серійну влучність: забивання 100 м'ячів за 90 хвилин при постійно зростаючій складності та переміщенні віртуальних захисників.",
    "egoStatus": "ABSOLUTE #1 // LEADER OF 300",
    "rival": "УСІ 125 ФОРВАРДІВ СИСТЕМИ BLUE LOCK"
  },
  {
    "index": 3,
    "badge": "WAR MINDSET // DESTROYER",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛ 45 // АНІМЕ ЕП. 12",
    "egoBadge": "WARRIOR INSTINCT",
    "title": "Філософія знищення: «Поле битви, а не дитячі забавки»",
    "cardTag": "EGO MANIFESTO",
    "cardCh": "CH. 45 / EP. 12",
    "cardTitle": "Поле битви: Холодний вирок Ісагі",
    "cardSub": "«Футбол — це війна за життя, а не забавка»",
    "img": "assets/rin_battlefield_c45.webp",
    "quote": "«Для вас футбол — це гра? Смішно. Для мене це поле битви, де я вбиваю чужі життя.»",
    "context": "// Діалог з Ісагі перед першим поєдинком 3 на 3",
    "narrative": "Перед матчем 3-на-3 Ісагі намагається знайти людський контакт і запитує Ріна про його прагнення. Рін відповідає холодним крижаним поглядом, заявляючи, що на полі немає місця дружбі, романтиці чи взаємоповазі. Для Ріна кожен матч — це гладіаторська арена, де виживає лише той, хто готовий переступити через амбіції опонентів. Цей монолог стає маніфестом його стилю гри.",
    "tactical": "Психологічне домінування: Рін руйнує оптимізм і командний дух суперників ще до стартового свистка, змушуючи їх грати під тиском його холодної впевненості.",
    "egoStatus": "PSYCHOLOGICAL APEX // COLD EXECUTIONER",
    "rival": "ІСАГІ ЙОІЧІ / НАҐІ СЕЙШІРО"
  },
  {
    "index": 4,
    "badge": "TOP THREE // APEX SQUAD",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛ 44 // АНІМЕ ЕП. 12",
    "egoBadge": "APEX MONARCH",
    "title": "Альянс Верхівки: Топ-3 гравці Другого етапу",
    "cardTag": "TOP THREE ALLIANCE",
    "cardCh": "CH. 44 / EP. 12",
    "cardTitle": "Альянс Верхівки: Рін, Арію та Токіміцу",
    "cardSub": "Тріо №1, №2 та №3 • Неприступна фортеця",
    "img": "assets/rin_top3_team.webp",
    "quote": "«Стійте там, де я скажу, і робіть те, що я накажу. Решту я зроблю сам.»",
    "context": "// Рін об'єднується з Джюбеєм Арію та Аоші Токіміцу",
    "narrative": "Перші три гравці, які подолали кімнату 100 голів — Рін №1, велетень із неймовірним розмахом кінцівок Джюбей Арію №2 та невпинний фізичний танк Аоші Токіміцу №3 — утворюють непереможну початкову команду. Рін не сприймає їх як рівних партнерів, а використовує їхні видатні анатомічні дані як пішаків у своїй шаховій партії проти команди Ісагі.",
    "tactical": "Ідеальна тривимірна побудова: таранна фізична міць Токіміцу на першому рубежі, високі перехоплення Арію на другому та хірургічний фініш Ріна.",
    "egoStatus": "PUPPETEER CONDUCTOR // DOMINANT TRIO",
    "rival": "КОМАНДА БІЛИХ: ІСАГІ / НАҐІ / БАЧІРА"
  },
  {
    "index": 5,
    "badge": "PINPOINT ACCURACY // MAGIC CORNER",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛ 47 // АНІМЕ ЕП. 12",
    "egoBadge": "PUPPETEER EGO",
    "title": "Маріонетковий майстер: Прямий гол з кутового прапорця",
    "cardTag": "PINPOINT CURVE",
    "cardCh": "CH. 47 / EP. 12",
    "cardTitle": "Шедевр з кутового: Сухий лист",
    "cardSub": "Прямий підкручений удар у дальню дев'ятку",
    "img": "assets/rin_corner_goal_anim.webp",
    "quote": "«Футбол простий: я розставляю вас, як ляльок, а потім забиваю туди, куди вважаю за потрібне.»",
    "context": "// Перший матч трійки Ріна проти команди Ісагі, Наґі та Бачіри",
    "narrative": "Перша шокуюча демонстрація безмежної прірви між Ріном та рештою гравців Blue Lock. Отримавши право на кутовий, Рін не став робити навіс на партнерів — він завдав прямого підкрученого удару по воротах. М'яч описав надлюдську параболу над головами захисників і точно вкрутився у дальню верхню дев'ятку повз розгубленого воротаря-голограму, викликавши шок у всіх присутніх.",
    "tactical": "Математичне використання сили Магнуса: бездоганний кут нахилу стопи, крутний момент 1200+ об/хв та вектор, що перетворює звичайний стандарт на невідпорний гол.",
    "egoStatus": "COLD-BLOODED PUPPETEER",
    "rival": "ІСАГІ / НАҐІ / БАЧІРА"
  },
  {
    "index": 6,
    "badge": "PLAYER SELECTION // CALCULATION",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛ 49 // АНІМЕ ЕП. 13",
    "egoBadge": "STRATEGIC EYE",
    "title": "За правом переможця: Вибір Бачіри Меґуру",
    "cardTag": "DRAFT PICK",
    "cardCh": "CH. 49 / EP. 13",
    "cardTitle": "За правом сильного: Вибір Бачіри",
    "cardSub": "Конфіскація дриблера • Розрив дуету з Ісагі",
    "img": "assets/rin_takes_bachira.webp",
    "quote": "«Ти йдеш зі мною. Твої рухи найменш прісні серед цієї сірої маси.»",
    "context": "// Завершення матчу 3 на 3 і конфіскація гравця",
    "narrative": "Після перемоги з рахунком 5:2 Рін має право забрати одного гравця з команди опонентів. Попри сподівання Ісагі, Рін обирає Бачіру Меґуру. Рін пояснює, що інстинктивний дриблінг Бачіри створює непередбачувані кути для передач, якими він зможе маніпулювати в наступних раундах. Цей момент розбиває дует Ісагі та Бачіри й стає головним каталізатором люті для Ісагі.",
    "tactical": "Підсилення креативного ресурсу: отримання гравця з нелінійним пасом для дестабілізації глибоких оборонних ліній.",
    "egoStatus": "PRAGMATIC RULER // EMOTIONLESS",
    "rival": "БАЧІРА МЕҐУРУ / ІСАГІ ЙОІЧІ"
  },
  {
    "index": 7,
    "badge": "CURVE GEOMETRY // TOP SPIN",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛ 76 // МАНГА",
    "egoBadge": "BALLISTIC GENIUS",
    "title": "Вертикальний топ-спін: Постріл, що пікірує з неба",
    "cardTag": "BALLISTIC ARC",
    "cardCh": "CH. 76",
    "cardTitle": "Вертикальний топ-спін: Пікіруючий удар",
    "cardSub": "Прямий вертикальний оберт над захистом",
    "img": "assets/rin_vertical_spin.webp",
    "quote": "«Бачиш цю траєкторію? Вона існує лише в моїй голові, а тепер ламає твій захист.»",
    "context": "// Демонстрація балістичного розрахунку в реванші 4v4",
    "narrative": "У розпал реваншу 4-на-4 Рін стикається з щільною позиційною опікою. Замість звичної горизонтальної підкрутки Рін завдає удару підйомом з різким нахилом стопи вперед, надаючи м'ячу екстремального вертикального обертання. Снаряд здіймається над головами захисників, огинає блок і різко падає каменем під саму перекладину, не залишаючи шансів голкіперу.",
    "tactical": "Вертикальний ефект Магнуса: створення зони підвищеного тиску над м'ячем, що примушує його падати вниз удвічі швидше за дію сили тяжіння.",
    "egoStatus": "BALLISTIC ARCHITECT",
    "rival": "ОБОРОНА КОМАНДИ ІСАГІ ТА БАРО"
  },
  {
    "index": 8,
    "badge": "FATAL REBOUND // BITTER TRIUMPH",
    "canon": "ДРУГИЙ ЕТАП // РОЗДІЛИ 84–85 // АНІМЕ ЕП. 23",
    "egoBadge": "FUELED BY HATRED",
    "title": "Відчайдушний відскок: Перемога 5:4, що відчувається поразкою",
    "cardTag": "FATAL REBOUND",
    "cardCh": "CH. 84–85 / EP. 23",
    "cardTitle": "Реванш 4v4: Переможний відскок на 5:4",
    "cardSub": "Сліпий фатум • Оголошення Ісагі заклятим ворогом",
    "img": "assets/rin_winning_goal_rematch.webp",
    "quote": "«Я не переможець... Мене врятував клятий випадок. Ісагі, я ніколи тобі цього не пробачу.»",
    "context": "// Останні секунди грандіозного матчу 4 на 4",
    "narrative": "Кульмінаційний момент другого відбору. Після сольного ривка Бачіри м'яч у повітрі блокує Ісагі, і він летить у сліпу зону. Рін завдяки неймовірному ривку випереджає захисників і забиває вирішальний п'ятий гол на 5:4. Однак замість тріумфу Рін охоплений сказом: він усвідомлює, що Ісагі прочитав фінальний епізод на мить раніше, і лише сліпа удача принесла Ріну м'яч. Обираючи Ісагі до своєї п'ятірки, Рін оголошує його своїм заклятим ворогом.",
    "tactical": "Зіткнення двох систем прогнозування: вперше 'Маріонеткове диригування' Ріна натрапило на рівного суперника в особі Ісагі.",
    "egoStatus": "DARK MOTIVATION // NEMESIS AWAKENING",
    "rival": "ІСАГІ ЙОІЧІ // ГОЛОВНИЙ СУПЕРНИК"
  },
  {
    "index": 9,
    "badge": "IRON DISCIPLINE // RITUAL",
    "canon": "ПІДГОТОВКА ДО ТРЕТЬОГО ЕТАПУ // АНІМЕ ЕП. 24",
    "egoBadge": "PERFECT BODY BALANCE",
    "title": "Залізна дисципліна: Щоденна йога та ментальна концентрація",
    "cardTag": "IRON DISCIPLINE",
    "cardCh": "EP. 24",
    "cardTitle": "Залізна дисципліна: Щоденна йога Ріна",
    "cardSub": "Стретчинг та баланс тіла перед сном",
    "img": "assets/rin_yoga_routine.webp",
    "quote": "«Якщо твоє тіло не чує розуму з точністю до міліметра — ти не нападник, а мішень.»",
    "context": "// Нічний ритуал перед сном у гуртожитку Blue Lock",
    "narrative": "Коли інші гравці святкують або відпочивають, Рін зачиняється у своїй кімнаті для обов'язкового півторагодинного комплексу йоги, розтяжки та дихальних практик. Ця звичка сформувалася ще в дитинстві, коли Сае поїхав до Іспанії, а Рін поклявся не давати своєму тілу слабини жодного дня. Завдяки цьому Рін зберігає надлюдську гнучкість суглобів, що дозволяє йому завдавати ударів з будь-якого незручного положення.",
    "tactical": "Підтримка еластичності зв'язок: запобігання мікротравмам при вибухових змінах траєкторії та збільшення кута виносу робочої ноги.",
    "egoStatus": "METICULOUS PERFECTIONIST",
    "rival": "ВЛАСНЕ ТІЛО ТА ФІЗИЧНІ МЕЖІ"
  },
  {
    "index": 10,
    "badge": "CLASH OF TITANS // EXPLOSION",
    "canon": "ТРЕТІЙ ВІДБІР // РОЗДІЛИ 97–100 // СЕЗОН 2",
    "egoBadge": "CALCULATION VS CHAOS",
    "title": "Зіткнення его: Холодний Розрахунок проти Дикого Хаосу",
    "cardTag": "RIN VS SHIDO",
    "cardCh": "CH. 97–100",
    "cardTitle": "Війна его: Рін проти Шідо Рюсея",
    "cardSub": "Розрахунок проти Інстинкту • Бійка в Команді A",
    "img": "assets/rin_vs_shido_clash.webp",
    "quote": "«Твій футбол — це брудний танець комахи. Не смій плутатися під моїми ногами.»",
    "context": "// Конфлікт у Команді A між Ріном та Шідо",
    "narrative": "Під час Третього відбору Дзінпачі Еґо ставить Ріна та дикого форварда Шідо Рюсея в одну ланку Команди A. Їхня взаємодія миттєво перетворюється на війну на знищення: Шідо грає виключно на біологічних інстинктах і рефлексах, руйнуючи вивірені математичні схеми пасів Ріна. Їхні суперечки регулярно закінчуються бійками, змушуючи Еґо шукати нові тактичні рішення.",
    "tactical": "Тактична несумісність двох ультра-его: неможливість поділити простір у штрафному майданчику без чіткого розділення ролей.",
    "egoStatus": "UNCOMPROMISING DOMINANCE",
    "rival": "ШІДО РЮСЕЙ // ДИКИЙ ХИЖАК"
  },
  {
    "index": 11,
    "badge": "BLUE LOCK 11 // THE CAPTAIN",
    "canon": "ОГОЛОШЕННЯ СКЛАДУ НА МАТЧ U-20 // РОЗДІЛ 108",
    "egoBadge": "NUMBER TEN HERITAGE",
    "title": "Капітан революції: Футболка з номером 10 у Blue Lock 11",
    "cardTag": "CAPTAIN #10",
    "cardCh": "CH. 108",
    "cardTitle": "Капітан Blue Lock 11: Футболка №10",
    "cardSub": "Центральна вісь атаки проти збірної Японії",
    "img": "assets/rin_bl11_captain.webp",
    "quote": "«Мені плювати на честь країни. Я тут лише для того, щоб Сае дивився на мене знизу вгору.»",
    "context": "// Офіційне призначення капітаном на матч століття",
    "narrative": "Перед історичною зустріччю проти збірної Японії U-20 Дзінпачі Еґо оголошує стартовий склад революційного проєкту Blue Lock Eleven. Еґо вручає Ріну священну футболку під номером 10 і капітанську пов'язку, роблячи його абсолютним лідером і серцем тактичної моделі команди. Рін приймає це не як честь, а як найвищу відповідальність за розправу над збірною, за яку погодився грати Сае.",
    "tactical": "Центральна роль хибної дев'ятки: координація атаки 4-3-3, де Рін стягує на себе двох центральних оборонців і створює коридори для вінґерів.",
    "egoStatus": "SUPREME CAPTAIN // SYSTEM EPICENTER",
    "rival": "ЗБІРНА ЯПОНІЇ U-20 ТА САЕ ІТОШІ"
  },
  {
    "index": 12,
    "badge": "EYE TO EYE // PRE-MATCH CHILL",
    "canon": "ПЕРЕДМАТЧЕВИЙ ТУНЕЛЬ // РОЗДІЛ 112 // СЕЗОН 2",
    "egoBadge": "GLACIAL RESOLVE",
    "title": "Крижаний погляд: Зустріч із Сае у тунелі арени",
    "cardTag": "PRE-MATCH TUNNEL",
    "cardCh": "CH. 112",
    "cardTitle": "Крижаний погляд: Зустріч братів у тунелі",
    "cardSub": "Німа дуель поглядів перед 60 000 глядачів",
    "img": "assets/rin_sae_tunnel.webp",
    "quote": "«Подивись на мене уважно, Сае. Сьогодні ти побачиш, ким я став завдяки твоїм словам.»",
    "context": "// Перша зустріч братів після зимового розриву перед виходом на поле",
    "narrative": "У напівтемряві підтрибунного приміщення перед виходом на 60-тисячний стадіон шляхи братів Ітоші знову перетинаються. Сае дивиться на молодшого брата звично холодним, незацікавленим поглядом світового профі, тоді як очі Ріна палають прихованим смертоносним вогнем. Ця німа дуель поглядів задає тон усьому матчу століття: битва двох рідних братів за футбольне життя.",
    "tactical": "Психологічна стійкість під тиском багатотисячного стадіону та камери світових трансляцій.",
    "egoStatus": "COLD HATRED // PRE-WAR MEDITATION",
    "rival": "САЕ ІТОШІ // ГЕНІЙ NEW GEN 11"
  },
  {
    "index": 13,
    "badge": "TRIUMPH OVER DEFENSE // U-20 GOAL",
    "canon": "МАТЧ ПРОТИ ЗБІРНОЇ U-20 // РОЗДІЛ 120",
    "egoBadge": "WALL BREAKER",
    "title": "Гол за Blue Lock 11: Удар крізь захисний мур U-20",
    "cardTag": "U-20 CLASH GOAL",
    "cardCh": "CH. 120",
    "cardTitle": "Гол крізь мур: Удар повз Айку",
    "cardSub": "Шедевральна дуга в кут воріт збірної U-20",
    "img": "assets/rin_u20_goal2.webp",
    "quote": "«Замовкніть. Поле належить мені. Цей гол — вирок усім вашим надіям.»",
    "context": "// Рін виводить команду Blue Lock уперед у матчі століття",
    "narrative": "У першому таймі непробивний захист молодіжної збірної Японії на чолі з Олівером Айку не давав продихнути нападникам. Рін бере відповідальність на себе: отримавши пас на дузі штрафного, він робить оманливий замах, ховає момент удару за тілом захисника і запускає м'яч по божевільній дузі точно в кут повз розпластаного голкіпера. Стадіон вибухає ревом, а Blue Lock виходить уперед.",
    "tactical": "Сліпий постріл із приховуванням фази розмаху: голкіпер не міг зафіксувати момент удару через розташування корпусу Айку.",
    "egoStatus": "MATCH DEFINER // NATIONAL SHOCK",
    "rival": "ОЛІВЕР АЙКУ // ОБОРОНА U-20"
  },
  {
    "index": 14,
    "badge": "FLOW STATE // BERSERKER",
    "canon": "БИТВА З U-20 // РОЗДІЛИ 146–148",
    "egoBadge": "BERSERKER FLOW",
    "title": "Пробудження Flow: Потворне руйнування найсильніших сторін",
    "cardTag": "BERSERKER FLOW",
    "cardCh": "CH. 146–148",
    "cardTitle": "Пробудження Flow: Потворне руйнування",
    "cardSub": "Висунутий язик • Знищення сильних сторін опонентів",
    "img": "assets/rin_destroyer_flow.webp",
    "quote": "«Я витягну з тебе все найкраще і розтопчу перед твоїми очима!»",
    "context": "// Рін скидає маску стилю Сае і пробуджує справжній інстинкт",
    "narrative": "Кульмінація матчу U-20. Рін усвідомлює, що спроби грати за логікою Сае стримували його потенціал. Він скидає маску стриманого стратега, висуває язик і входить у трансовий стан Flow. Рін не шукає слабких місць — він атакує головну силу кожного опонента: знищує дриблінг Неру, блокує зріст Ніу, перемагає рефлекси Айку і в повітряній дуелі зупиняє самого Сае, вибиваючи м'яч обличчям.",
    "tactical": "Філософія 'Руйнування сильних сторін': психологічне знищення впевненості суперника в його коронному прийомі.",
    "egoStatus": "BERSERKER FLOW // ABSOLUTE DESTRUCTION",
    "rival": "САЕ ІТОШІ / ОЛІВЕР АЙКУ / ТЕПЕЙ НЕРУ"
  },
  {
    "index": 15,
    "badge": "FRENCH ELITE // NEO EGOIST",
    "canon": "NEO EGOIST LEAGUE // РОЗДІЛ 239",
    "egoBadge": "TACTICAL MASTERCLASS",
    "title": "Французький дебют: Гол за Paris X Gen проти тактики Ubers",
    "cardTag": "PARIS X GEN",
    "cardCh": "CH. 239",
    "cardTitle": "Дебют у PXG: Розгром системи Ubers",
    "cardSub": "Хірургічний гол за пас Чарльза Шевальє",
    "img": "assets/rin_pxg_ubers_goal.webp",
    "quote": "«Ваша італійська стратегія — просто наївна схема. Я бачу крізь неї так само ясно, як крізь скло.»",
    "context": "// Дебют системи Локі в матчі проти клубу Ubers",
    "narrative": "У своєму першому матчі в Neo Egoist League за французький Paris X Gen Рін виходить на поле в системі тренера Локі. Протистоячи італійському Ubers під керівництвом майстер-страйкера Марка Снаффі, Рін легко знаходить шпарину в найміцнішій обороні турніру. Отримавши вивірену передачу від молодого вундеркінда Чарльза Шевальє, Рін блискавично вражає ворота, розпочавши переможну ходу PXG.",
    "tactical": "Аналіз зон переходу: використання проміжків між лінією опорних хавбеків та трійкою центральних беків для нанесення прихованого удару.",
    "egoStatus": "EUROPEAN SUPERSTAR // 36M DEBUT",
    "rival": "МАРК СНАФФІ / ОБОРОННА СИСТЕМА UBERS"
  },
  {
    "index": 16,
    "badge": "NEL APEX // #1 EGOIST",
    "canon": "ФІНАЛ NEO EGOIST LEAGUE // РОЗДІЛ 280+",
    "egoBadge": "WORLD APEX 240M",
    "title": "Вершина ліги: 240,000,000 ¥ та контракт від Re Al",
    "cardTag": "NEL ERA APEX #1",
    "cardCh": "CH. 280+",
    "cardTitle": "Вершина ліги: 240 млн ¥ та оферта Re Al",
    "cardSub": "Топ-1 разом з Ісагі • Запрошення в Реал Мадрид",
    "img": "assets/rin_gallery_apex_240m.webp?v=apex_face_centered",
    "quote": "«Моє життя починається там, де я ламаю сильних. Ісагі, твоя смерть буде моїм бенкетом.»",
    "context": "// Оголошення фінальних ставок Neo Egoist League",
    "narrative": "За підсумками найжорсткішої боротьби в Neo Egoist League, Рін очолює список нападників Японії з рекордною ринковою оцінкою у 240 мільйонів єн — розділивши абсолютне перше місце з Ісагі Йоічі. Королівський іспанський клуб Re Al офіційно надсилає Ріну пропозицію контракту світового рівня, визнавши його страйкером нового покоління, здатним перевернути футбольний світ.",
    "tactical": "Універсальний фінішер світового класу: феноменальна вибухова швидкість, удари з нульових кутів, абсолютний контроль штрафного майданчика та безкомпромісний егоїзм.",
    "egoStatus": "SUPERNOVA STRIKER // RE AL OFFER",
    "rival": "ІСАГІ ЙОІЧІ / МІХАЕЛЬ КАЙЗЕР"
  },
  {
    "index": 17,
    "badge": "SECOND SELECTION // CH. 78",
    "canon": "ДРУГИЙ ВІДБІР // РОЗДІЛ 78 • ЕП. 21",
    "egoBadge": "BALLISTIC FREE KICK",
    "title": "Штрафний удар над стінкою у дев'ятку",
    "cardTag": "MAGNUS FREE KICK",
    "cardCh": "CH. 78 // EP. 21",
    "cardTitle": "Штрафний удар над стінкою у дев'ятку",
    "cardSub": "Закручений постріл у міліметрі над головами стінки",
    "img": "assets/rin_goal_team_red.webp",
    "quote": "«Ваші стрибки, ваша реакція — я вже прорахував кожен міліметр ще до того, як розбігся.»",
    "context": "// Стандарт з 28 метрів проти команди Ісагі",
    "narrative": "Заробивши небезпечний штрафний з 28 метрів, Рін стикається з високою щільною стінкою оборонців. Він миттєво розраховує максимальну висоту їхнього стрибка і посилає м'яч по бездоганній дузі на кілька міліметрів вище чужих голів прямо у верхній кут без шансів для голкіпера.",
    "tactical": "Міліметровий контроль вертикального й бічного обертання для обходу блокуючої стінки.",
    "egoStatus": "SURGICAL STRIKER // 28M LOCK",
    "rival": "ІСАГІ ЙОІЧІ / БАЧІРА МЕҐУРУ"
  },
  {
    "index": 18,
    "badge": "SPATIAL PREDICTION // CH. 81",
    "canon": "ДРУГИЙ ВІДБІР // РОЗДІЛ 81 • ЕП. 22",
    "egoBadge": "PUPPET MASTERMIND",
    "title": "Перехоплення на випередження: Блок сліпої зони Ісагі",
    "cardTag": "SPATIAL CHECKMATE",
    "cardCh": "CH. 81 // EP. 22",
    "cardTitle": "Перехоплення у сліпій зоні Ісагі",
    "cardSub": "Читання гри на чотири кроки попереду",
    "img": "assets/rin_stops_isagi.webp",
    "quote": "«Ти думав, що перехитрив мене? Я бачив твій гол ще до того, як ти взагалі вирішив бігти.»",
    "context": "// Кульмінаційне перехоплення у битві 4v4",
    "narrative": "Коли Ісагі вирішив, що знайшов ідеальну сліпу зону за спинами оборонців і чекав завершального пасу для переможного удару, Рін уже чекав у потрібній точці поля. Прочитавши логіку суперників на кілька кроків наперед, Рін холоднокровно перехопив атаку і поховав надію Ісагі.",
    "tactical": "Абсолютне прогнозування поля зору всіх 8 гравців і маніпуляція моментом пасу.",
    "egoStatus": "PUPPET MASTER // 4-STEP AHEAD",
    "rival": "ІСАГІ ЙОІЧІ / НАҐІ СЕЙШІРО"
  },
  {
    "index": 19,
    "badge": "DESTROYER INSTINCT // CH. 146",
    "canon": "МАТЧ U-20 // РОЗДІЛ 146",
    "egoBadge": "PREDATOR TRANSCENDENCE",
    "title": "Пробудження Хижака: Око Руйнування",
    "cardTag": "DESTROYER INSTINCT",
    "cardCh": "CH. 146",
    "cardTitle": "Око Руйнування: Повний транс",
    "cardSub": "Чистий первісний інстинкт на полі U-20",
    "img": "assets/rin_predator_eye.webp",
    "quote": "«Усі ваші зброї не мають значення. Я зламаю кожного з вас саме там, де ви вважаєте себе найкращими.»",
    "context": "// Перехід свідомості в режим повного знищення",
    "narrative": "У вирішальні хвилини битви з національною молодіжною збірною погляд Ріна порожніє від будь-якої раціональної обережності. Зіниці звужуються у форму хижака, розкриваючи глибинну ауру Руйнівника: кожен дотик стає ризиком на межі фолу й мистецтва.",
    "tactical": "Гіперфокус в умовах екстремального тиску для миттєвої реакції та прориву подвійної опіки.",
    "egoStatus": "PREDATOR TRANSCENDENCE // U-20",
    "rival": "ОЛІВЕР АЙКУ / САЕ ІТОШІ"
  }
];

// -------------------------------------------------------------

// -------------------------------------------------------------
// WEAPONS & COMBAT FLOW DETAILED DATASET
// -------------------------------------------------------------
const WEAPONS_DATA = {
  curve: {
    id: "curve",
    num: "WEAPON 01",
    hudBadge: "// WEAPON 01 • MAGNUS BALLISTICS",
    name: "ІДЕАЛЬНА ПІДКРУТКА ТА БАЛІСТИЧНА ДУГА",
    sub: "Хірургічна точність параболічних ударів, непередбачуваний ефект Магнуса та голи з нульових кутів",
    quote: "«Мій м'яч підкоряється законам фізики, які я розраховую швидше, ніж ваші очі встигають кліпнути.»",
    isFlow: false,
    stats: [
      { name: "Точність розрахунку", val: "99%", fill: 99 },
      { name: "Швидкість підкрутки", val: "1200+ RPM", fill: 98 },
      { name: "Кутова складність", val: "Ранг S+", fill: 100 },
      { name: "Дальність ураження", val: "35 метрів", fill: 92 }
    ],
    mechanics: [
      {
        title: "Аеродинамічний розрахунок сили Магнуса",
        desc: "Рін б'є внутрішньою або зовнішньою стороною стопи з точним закручуванням. У польоті різниця швидкостей повітряних потоків з різних боків м'яча створює бічну силу, яка згинає траєкторію в неможливу для блокування параболу."
      },
      {
        title: "Балістична геометрія поля",
        desc: "Здатність вражати ворота з прямих кутових ударів — сухий лист, зрізати м'яч у дальню дев'ятку з гострих кутів та направляти кулю в обхід вистрибуючих захисних стінок."
      },
      {
        title: "Психологічний шок голкіперів",
        desc: "Воротар фіксує початковий вектор вильоту м'яча і готується до стрибка, але раптовий злам траєкторії в польоті паралізує реакцію, змушуючи голкіпера застигати на місці."
      }
    ],
    moments: [
      {
        title: "Шедевр «Сухий лист»: Прямий гол з кутового",
        canon: "АНІМЕ ЕП. 12 // МАНГА РОЗДІЛ 47",
        img: "assets/rin_corner_goal_anim.webp",
        galleryIndex: 5,
        narrative: "У матчі 3 на 3 проти команди Ісагі Рін заробив кутовий. Замість подачі на партнерів, він закрутив м'яч прямо у дальній кут воріт повз розгубленого воротаря Blue Lock Man. М'яч описав надлюдську дугу над головами захисників, шокувавши всіх на полі.",
        quote: "«Футбол простий: я розставляю вас, як ляльок, а потім забиваю туди, куди вважаю за потрібне.»"
      },
      {
        title: "Вертикальний топ-спін: Пікіруючий удар з неба",
        canon: "МАНГА РОЗДІЛ 76 // ДРУГИЙ ВІДБІР",
        img: "assets/rin_vertical_spin.webp",
        galleryIndex: 7,
        narrative: "Коли суперники перекрили горизонт оборони, очікуючи класичної бокової дуги, Рін надав м'ячу сильного вертикального обертання. М'яч злетів увись над головами оборонців і під дією топ-спіну різко пікірував точно під перекладину.",
        quote: "«Ви думали, що перекрили траєкторію? У моїй геометрії є виміри, про які ви навіть не здогадуєтесь.»"
      },
      {
        title: "Штрафний удар над стінкою у дев'ятку",
        canon: "МАНГА РОЗДІЛ 78 // АНІМЕ ЕП. 21",
        img: "assets/rin_goal_team_red.webp",
        galleryIndex: 17,
        narrative: "Стандарт з 28 метрів. Захисна стінка вистрибує на граничну висоту, але Рін закручує м'яч у міліметрах над чужими маківками. М'яч залітає у саму павутину воріт без найменшого шансу на порятунок.",
        quote: "«Ваші стрибки, ваша реакція — я вже прорахував кожен міліметр ще до того, як розбігся.»"
      },
      {
        title: "Дебют у PXG: Хірургічний гол системі Ubers",
        canon: "МАНГА РОЗДІЛ 239 // NEO EGOIST LEAGUE",
        img: "assets/rin_pxg_ubers_goal.webp",
        galleryIndex: 15,
        narrative: "У французькому гранді Paris X Gen проти італійської фортеці Ubers з Доном Лоренцо та Марком Снаффі, Рін за пасом Чарльза Шевальє зняв павутину дальнім обвідним пострілом, оформивши вирішальний дубль у дебюті ліги.",
        quote: "«Яка різниця, скільки у вас захисників? Мій м'яч завжди знайде вільний коридор.»"
      }
    ]
  },
  puppet: {
    id: "puppet",
    num: "WEAPON 02",
    hudBadge: "// WEAPON 02 • SPATIAL PUPPETRY",
    name: "МАРІОНЕТКОВИЙ ФУТБОЛ ТА ПРОСТОРОВИЙ КОНТРОЛЬ",
    sub: "Маніпулювання союзниками та суперниками як пішаками на шаховій дошці футбольного поля",
    quote: "«Ви біжите туди, куди я хочу. Ви дихаєте так, як я вам дозволю. Це не ваша гра — це мій театр.»",
    isFlow: false,
    stats: [
      { name: "Тактичне бачення поля", val: "99%", fill: 99 },
      { name: "Маніпуляція захистом", val: "98%", fill: 98 },
      { name: "Швидкість рішень", val: "95%", fill: 95 },
      { name: "Психологічний контроль", val: "97%", fill: 97 }
    ],
    mechanics: [
      {
        title: "Передбачення на 3-4 ходи вперед",
        desc: "Рін не просто читає рух м'яча — він зчитує міміку, центр тяжіння та кут зору суперників, визначаючи їхні наступні дії за кілька секунд до того, як вони самі усвідомлять власні наміри."
      },
      {
        title: "Використання партнерів як живих щитів",
        desc: "Він розміщує власних соратників на полі так, щоб їхні анатомічні габарити перекривали огляд воротарю або змушували захисників робити помилкові кроки у сторону."
      },
      {
        title: "Створення безпомилкових вогневих ліній",
        desc: "Шляхом штучного провокування опонентів на пресинг, Рін відкриває собі абсолютно вільний коридор для прямого розстрілу воріт без ризику заблокованого удару."
      }
    ],
    moments: [
      {
        title: "Маніпулювання Тріо Верхівки: Розгром команди Ісагі 5:2",
        canon: "АНІМЕ ЕП. 12-13 // МАНГА РОЗДІЛ 45-48",
        img: "assets/rin_top3_team.webp",
        galleryIndex: 4,
        narrative: "Рін перетворює таранну міць Аоші Токіміцу та довгі кінцівки Джюбея Арію на інструменти для дестабілізації оборони Ісагі, Наґі та Бачіри. Суперники виявилися тактично розірваними на шматки з рахунком 5:2.",
        quote: "«Стійте там, де я скажу, і робіть те, що я накажу. Решту я зроблю сам.»"
      },
      {
        title: "Перехоплення на випередження: Блок комбінації Ісагі",
        canon: "МАНГА РОЗДІЛ 81 // АНІМЕ ЕП. 22",
        img: "assets/rin_stops_isagi.webp",
        galleryIndex: 18,
        narrative: "У дуелі 4 на 4 Ісагі був упевнений, що знайшов ідеальну сліпу зону за спиною захисту. Проте Рін прорахував думку Ісагі за секунди до передачі та заблокував пас у повітрі з холоднокровним презирством.",
        quote: "«Ти думав, що перехитрив мене? Я бачив твій гол ще до того, як ти взагалі вирішив бігти.»"
      },
      {
        title: "Капітан Blue Lock 11: Монолітний центр тактики",
        canon: "МАНГА РОЗДІЛ 112-115 // АНІМЕ 2 СЕЗОН",
        img: "assets/rin_bl11_captain.webp",
        galleryIndex: 11,
        narrative: "Дзінпачі Еґо ставить Ріна капітаном та абсолютним ядром команди у битві за життя проти молодіжної збірної Японії U-20. Рін диригує атаками та обороною найамбітніших форвардів країни.",
        quote: "«Якщо хтось із вас зіб'є мій ритм хоч на частку секунди — я знищу вас прямо на полі.»"
      },
      {
        title: "Конфіскація Бачіри Меґуру за правом сили",
        canon: "АНІМЕ ЕП. 13 // МАНГА РОЗДІЛ 49",
        img: "assets/rin_takes_bachira.webp",
        galleryIndex: 6,
        narrative: "Після перемоги 5:2 Рін обирає Бачіру не через емоції, а через холодний аналіз: нелінійний дриблінг Бачіри створює непередбачувані кути передач, якими Рін маніпулює в наступних матчах.",
        quote: "«Ти йдеш зі мною. Твої рухи найменш прісні серед цієї сірої маси.»"
      }
    ]
  },
  flow: {
    id: "flow",
    num: "AWAKENED EGO",
    hudBadge: "// AWAKENED EGO • BERSERK FLOW",
    name: "СТАН FLOW: ПОТВОРНЕ ЗНИЩЕННЯ",
    sub: "Первісне пробудження справжнього демонічного Его: знищення суперників прямо у їхній найсильнішій точці",
    quote: "«Я більше не ношу маску брата. Моє справжнє Его — це потворне, первісне руйнування всього сущого!»",
    isFlow: true,
    stats: [
      { name: "Руйнівна сила дуелей", val: "100% ABSOLUTE", fill: 100 },
      { name: "Швидкість дриблінгу", val: "98%", fill: 98 },
      { name: "Інстинкт руйнації", val: "100%", fill: 100 },
      { name: "Стійкість до тиску", val: "99%", fill: 99 }
    ],
    mechanics: [
      {
        title: "Скидання тіні Сае та звільнення інстинкту",
        desc: "Роками Рін намагався грати у «вишуканий холодний футбол», наслідуючи свого брата. У стані Flow він відкидає цю маску: висунутий язик, багряно-чорна аура смерті та чистий первісний звір."
      },
      {
        title: "Знищення суперника в його найсильнішій якості",
        desc: "Замість того, щоб уникати зіткнень, Рін провокує найсильнішого оборонця суперника використати його головну зброю — фізичну силу, гру на другому поверсі, швидкість чи гнучкість — і розбиває його саме в цій характеристиці."
      },
      {
        title: "Драйв повного самознищення заради тріумфу",
        desc: "Рін грає з відчуттям того, що кожна секунда — остання в його житті. Це вивільняє піковий фізичний баланс і надшвидкісний дриблінг з немислимою зміною векторів руху."
      }
    ],
    moments: [
      {
        title: "Пробудження Flow: Потворне руйнування",
        canon: "МАНГА РОЗДІЛ 144-146 // АНІМЕ 2 СЕЗОН",
        img: "assets/rin_destroyer_flow.webp",
        galleryIndex: 14,
        narrative: "Кульмінація матчу з U-20. Рін входить у стан трансу і самотужки розриває всю захисну лінію національної збірної: перемагає Ніу на гнучкості, розбиває Дарку на силі та обводить Олівера Айку на реакції.",
        quote: "«Це не футбол мого брата. Це моє потворне Его — я розчавлю вашу гордість у порох!»"
      },
      {
        title: "Дуель братів: Зупинка геніального Сае Ітоші",
        canon: "МАНГА РОЗДІЛ 147 // АНІМЕ 2 СЕЗОН",
        img: "assets/rin_sae_tunnel.webp",
        galleryIndex: 12,
        narrative: "Сае Ітоші мчить на шаленій швидкості, щоб забити вирішальний переможний гол. Рін у нестямі Flow кидається на перехоплення і в стрибку вибиває м'яч у старшого брата, вперше в житті зупинивши Сае.",
        quote: "«Я не чекаю твого визнання, Сае. Я вийшов на це поле, аби вбити твою гордість!»"
      },
      {
        title: "Гол крізь мур U-20: Пробиття захисту Олівера Айку",
        canon: "МАНГА РОЗДІЛ 120 // АНІМЕ 2 СЕЗОН",
        img: "assets/rin_u20_goal2.webp",
        galleryIndex: 13,
        narrative: "Удар крізь захисний мур збірної U-20. Рін бере гру на себе: оманливим замахом ховає момент удару за корпусом оборонця і запускає м'яч по божевільній дузі точно в дальній кут повз розпластаного воротаря та Олівера Айку.",
        quote: "«Замовкніть. Поле належить мені. Цей гол — вирок усім вашим надіям.»"
      },
      {
        title: "Берсерк-вирішальний гол проти Bastard München у NEL",
        canon: "МАНГА РОЗДІЛ 275-280 // NEO EGOIST LEAGUE",
        img: "assets/rin_gallery_apex_240m.webp?v=apex_face_centered",
        galleryIndex: 16,
        narrative: "У фіналі Neo Egoist League Рін досягає апогею Flow у дуелі з Ісагі та Кайзером. Він забиває шедевральний м'яч на 2:2, що закріпило його фінальну ставку в 240 000 000 ¥ та запрошення до Re Al.",
        quote: "«Ісагі... я знищу твою світлу надію просто на очах усього світу.»"
      }
    ]
  }
};

// -------------------------------------------------------------
// DIRECT CALL WITH ITOSHI RIN (RICH OFFLINE INTELLIGENCE ENGINE)
// -------------------------------------------------------------
const RIN_LOCAL_KB = [
  // === ITOSHI RIN: SELF / CANON DOSSIER ===
  {
    id: 'self_bio',
    kind: 'self',
    weight: 11,
    patterns: [
      /(про\s+себ|розкаж[а-яіїєґ]*\s+про\s+себ|хто\s+ти(?=$|[^а-яіїєґa-z0-9])|хто\s+такий\s+ітоші\s+рін|тво[яє]\s+(?:історі|біограф|мет|сім'я|дитинств|позиц|цін|клуб)|скільки\s+тобі|звідки\s+ти|який\s+ти(?=$|[^а-яіїєґa-z0-9])|ітоші\s+рін.*хто|розкажи\s+про\s+ріна)/
    ],
    replies: [
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Ітоші Рін. 16 років, другий клас старшої школи, Канаґава — Камакура. 186 сантиметрів, 70 кілограмів, 9 вересня, група крові A. Мій футбол почався як тінь старшого брата на снігу, поки Сае не розбив її сам. Тепер я — номер один Blue Lock із цінником 240 мільйонів єн, пропозицією від Re Al і PXG, і мені не потрібна корона на двох. Я виходжу на поле не перемагати — я виходжу ламати найкращих гравців планети. ❄️'
      },
      {
        emotion: 'neutral',
        respectDelta: 3,
        reply: 'До того, як я виріс у тактика-ляльковода, я ламав пластикових монстрів у дитинстві просто щоб відчути момент, коли ідеальна конструкція тріщить у руках. У цьому весь я. Поки інші мріють про стадіони і славу, для мене футбол — це поле бою, де виживає лише мій інстинкт Руйнівника. Якщо не готовий поставити на кон усе — відійди з лінії удару.'
      },
      {
        emotion: 'flow',
        respectDelta: 5,
        reply: 'Раніше я будував гру холодним розрахунком, керуючи двадцятьма однією фігурою на полі, як маріонетками. Але справжній я прокинувся лише тоді, коли відкинув чужі очікування, включно з Ісагі й Сае. Зараз у мене одна траєкторія: знайти найсильнішу зброю суперника, розірвати її вщент і забити гол ціною власного тіла. 🩸'
      }
    ]
  },
  {
    id: 'self_likes_hates',
    kind: 'self',
    weight: 10,
    patterns: [
      /(що\s+ти\s+(?:люб|ненавид|їси|п'?єш|робиш)|тво[їє]\s+(?:хоб|звичк|улюбле|страх)|чому\s+хорор|чому\s+йог|очадзуке|камакур|дитяч[а-яіїєґ]*\s+іграш|монстр|англійськ)/
    ],
    replies: [
      {
        emotion: 'neutral',
        respectDelta: 3,
        reply: 'Щоденна рутина проста: вранці — важкий стретчинг і складні пози йоги, щоб центр ваги тримався при будь-якому контакті. Із їжі — гаряче очадзуке із зеленим чаєм, рибою та хрусткою скоринкою. Увечері — жорсткі фільми жахів і англійська, щоб у Європі мені не знадобився перекладач. Терпіти не можу фальшивий позитив, солодку «теплу воду» і людей, які плутають дружбу з футболом. ❄️'
      },
      {
        emotion: 'annoyed',
        respectDelta: 2,
        reply: 'Люди дивуються, чому я спокійно дивлюся хорори на ніч. Бо в кадрі, де монстр винищує слабких без жалю, більше чесності, ніж у всіх ваших солодких інтерв’ю. Моє хобі — холодна дисципліна, ненависть до посередності і бездоганний удар у верхню дев’ятку. 😒'
      }
    ]
  },

  // === BLUE LOCK CHARACTERS ===
  {
    id: 'sae',
    kind: 'character',
    weight: 10,
    patterns: [/(ітоші сае|(?:^|[^а-яіїєґa-z0-9])сае(?=$|[^а-яіїєґa-z0-9])|\bsae\b|старш[а-яіїєґ]*\s+брат|мадрид|re al|(?:^|[^а-яіїєґa-z0-9])ре ал(?=$|[^а-яіїєґa-z0-9])|сніг[а-яіїєґ]*\s+пол)/],
    compareLine: 'Ітоші Сае бачить геометрію поля швидше за більшість дорослих профі і ріже оборону крижаними пасами без жодної зайвої емоції.',
    replies: [
      {
        emotion: 'angry',
        respectDelta: -1,
        reply: 'Не вимовляй ім’я Ітоші Сае буденно. Він розбив нашу спільну мрію під снігом і кинув мені «Nurui» просто в обличчя — і тепер моя єдина мета на газоні це змусити його пошкодувати про кожне сказане тоді слово. ❄️'
      },
      {
        emotion: 'flow',
        respectDelta: 4,
        reply: 'Сае проміняв мрію найкращого нападника на роль півзахисника у Re Al, а тепер дивиться згори. У матчі проти U-20 я зірвав його контроль своїм потворним руйнуванням і довів, що більше не граю за його сценарієм. 🩸'
      },
      {
        emotion: 'disgust',
        respectDelta: -3,
        reply: 'Колись у дитинстві під дощем він сам назвав мене генієм і купив морозиво за спільну клятву Кубка світу. Тепер між нами немає братства — є лише незакритий рахунок, який вирішить футбол. 😒'
      }
    ]
  },
  {
    id: 'isagi',
    kind: 'character',
    weight: 10,
    patterns: [/(ісагі|исаги|isagi|йоічі|метавіж|metavision|бастард)/],
    compareLine: 'Ісагі Йоічі не має моєї фізики чи ідеальної підкрутки, але його Metavision та хижа адаптація роблять із нього небезпечного паразита, який краде вирішальний момент.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Ісагі Йоічі — єдиний у Blue Lock, чиї очі бачать ту ж точку поля, що й мої. Він збирає гру як пазл через Metavision і чужу хімію, поки я ламаю оборону власною силою й точністю. 🎯'
      },
      {
        emotion: 'flow',
        respectDelta: 5,
        reply: '240 мільйонів єн на двох у фіналі Neo Egoist League? Мене нудить від самої думки про нічию. Наступного разу я розчавлю його адаптивність так чисто, що він навіть не встигне прочитати мій крок. 🩸'
      },
      {
        emotion: 'annoyed',
        respectDelta: 2,
        reply: 'У матчі 4 на 4 Ісагі переграв не мене, а удачу відскоку, а на U-20 добив мій блок проти Сае. Він завжди підбирає чужі залишки — саме тому я змушений перевершувати навіть удачу. ⚡'
      }
    ]
  },
  {
    id: 'kaiser',
    kind: 'character',
    weight: 10,
    patterns: [/(кайзер|kaiser|імператор|магнус|magnus|kaiser impact)/],
    compareLine: 'Міхаель Кайзер тримає шалений за швидкістю удар Kaiser Impact і навчився крутити Magnus, але довго тонув у власній токсичній гордині.',
    replies: [
      {
        emotion: 'smirk',
        respectDelta: 4,
        reply: 'Міхаель Кайзер хизується своїм Kaiser Impact та імператорським статусом, хоча закрутити м’яч за ідеальною дугою його змусив саме страх програти мені й Ісагі. Моя підкрутка не потребує шоу. 😏'
      },
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Поки Кайзер тримався за свиту і Несса, він був передбачуваним рабом власної репутації. Лише коли він скинув усе зайве у фіналі NEL і пішов у «нуль», він хоча б на мить став гідною мішенню. 🎯'
      },
      {
        emotion: 'annoyed',
        respectDelta: 2,
        reply: 'Імператор Bastard München? Занадто багато пафосу навколо одного прямого пострілу. У ближньому бою Руйнівника я перекушую його траєкторію швидше, ніж він замахнеться правою.'
      }
    ]
  },
  {
    id: 'shidou',
    kind: 'character',
    weight: 9,
    patterns: [/(шідо|шидо|shidou|рюсей|вибух|тарган)/],
    compareLine: 'Шідо Рюсей грає на чистому біологічному інстинкті в штрафному без жодної логіки, немов звір на полі.',
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: 'Шідо Рюсей — шумний психопат без грама дисципліни. Його «вибухи» у штрафному працюють лише через дику пластику тіла, але ділити з ним атаку в PXG було схоже на утримання скаженої тварини на повідку. 💧'
      },
      {
        emotion: 'angry',
        respectDelta: 1,
        reply: 'На відміну від цього рогатого клоуна, який заводився навіть від пасів Сае на U-20, мені не потрібен чужий допінг, щоб забивати. Його хаос передбачуваний, щойно закриваєш кут тіла в штрафному. 💢'
      },
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'У PXG Локі будував дві полярні системи — мій холодний розрахунок і тваринні рефлекси Шідо. Як конкурент він корисний лише тим, що змушує тримати приціл ще жорсткішим. 🎯'
      }
    ]
  },
  {
    id: 'nagi',
    kind: 'character',
    weight: 9,
    patterns: [/(нагі|наги|nagi|сейшіро|сейширо)/],
    compareLine: 'Нагі Сейшіро володіє божественним першим дотиком, але його лінивий мозок перетворив величезний талант на тимчасовий спалах.',
    replies: [
      {
        emotion: 'annoyed',
        respectDelta: 1,
        reply: 'Нагі Сейшіро — живий доказ того, що буває, коли талант зустрічає лінощі. Його контроль м’яча в повітрі небезпечний, але без власного голоду після одного шаленого гола він просто вигорів у Manshine. 😒'
      },
      {
        emotion: 'disgust',
        respectDelta: -1,
        reply: 'Казати на полі «мені влом» — це найчистіша тепла вода. Футбол не пробачає тих, хто грає лише тоді, коли поруч стоїть нянька або випадкове натхнення.'
      }
    ]
  },
  {
    id: 'reo',
    kind: 'character',
    weight: 9,
    patterns: [/((?:^|[^а-яіїєґa-z0-9])рьо(?=$|[^а-яіїєґa-z0-9])|(?:^|[^а-яіїєґa-z0-9])рео(?=$|[^а-яіїєґa-z0-9])|\breo\b|мікаге|микаге|хамелеон)/],
    compareLine: 'Рьо Мікаге копіює чужі прийоми на рівні хамелеона і бачить поле непогано, але роками душив власне его залежністю від Нагі.',
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: 'Рьо Мікаге має все для ідеального універсала — гроші, розум, стиль хамелеона — і все одно витратив половину Blue Lock на емоційні істерики навколо Нагі. Залежність на полі це вирок. 💧'
      },
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Коли Рьо перестав няньчити чужу тінь і навіть скопіював елементи моєї та Сае техніки, він став небезпечним. Але копія на 99 відсотків усе одно програє оригіналу. 🎯'
      }
    ]
  },
  {
    id: 'bachira',
    kind: 'character',
    weight: 9,
    patterns: [/(бачір|бачир|bachira|мегуру|барча|barcha)/],
    compareLine: 'Бачіра Мегуру перетворює дриблінг на непередбачуваний вільний танець, але це швидше творчий спалах, ніж холодна система вбивці.',
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 4,
        reply: 'Бачіра — єдиний із тієї компанії, хто в матчі 4 на 4 викинув навіть «монстра» і почав танцювати один проти всього мого пресингу. Його дриблінг у FC Barcha дратівливо живий, але його траєкторію прориву теж можна зламати. ⚡'
      },
      {
        emotion: 'smirk',
        respectDelta: 3,
        reply: 'Він називає футбол грою з ритмом і самбою? Хай грається на фланзі. Поки він малює фінти, справжній нападник уже закриває гру на табло. 😏'
      }
    ]
  },
  {
    id: 'barou',
    kind: 'character',
    weight: 9,
    patterns: [/((?:^|[^а-яіїєґa-z0-9])баро(?=$|[^а-яіїєґa-z0-9])|бароу|\bbarou\b|шоей|уберс|\bubers\b|король)/],
    compareLine: 'Баро Шое гне свою королівську лінію через Predator Eye і жорстоку фізику в Ubers, немов танк, що відмовляється ділитися світлом.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Баро називає себе Королем, і, мушу визнати, принаймні в ньому немає «теплої води». Його Predator Eye та шалена фізична пружність у Ubers поглинають темряву поля — хоча проти мого контролю простір йому тіснуватий. 🎯'
      },
      {
        emotion: 'smirk',
        respectDelta: 3,
        reply: 'Він ламав навіть власну команду, бо відмовлявся бути статистом. Поважаю таку впертість — але на полі може бути лише один абсолютний диктатор, і це точно не Баро. 😏'
      }
    ]
  },
  {
    id: 'chigiri',
    kind: 'character',
    weight: 9,
    patterns: [/(чігірі|чигірі|чигири|chigiri|хьома|пантер|44\s*градус)/],
    compareLine: 'Чігірі Хьома б’є рекорди флангового спринту і небезпечно закручує з лівого золотого кута 44 градуси.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: '«Червона пантера» Чігірі заслуговує на повагу хоча б за те, що біжить на повній швидкості попри страх знову порвати коліно. Його золота зона 44 градуси в Manshine небезпечна, якщо не перекрити внутрішній крок завчасно. 🎯'
      },
      {
        emotion: 'neutral',
        respectDelta: 2,
        reply: 'Швидкість по прямій сама по собі не виграє матчі проти організованої оборони. Як тільки читаєш момент його першого ривка, Чігірі перетворюється на заблоковану стрілу. ❄️'
      }
    ]
  },
  {
    id: 'kunigami',
    kind: 'character',
    weight: 9,
    patterns: [/(кунігамі|кунигамі|kunigami|ренске|wild card|вайлд кард|герой)/],
    compareLine: 'Кунігамі Ренске після Wild Card став штучною м’язовою машиною без іскри — фізично сильний, але емоційно порожній.',
    replies: [
      {
        emotion: 'neutral',
        respectDelta: 1,
        reply: 'Старий наївний «супергерой» здох у підвалі Wild Card, а замість нього вийшов мовчазний голем із фізикою під Ноеля Ноа. Ліва гармата в нього жорстка, але копія чужого тіла ніколи не перевершить оригінал. ❄️'
      },
      {
        emotion: 'annoyed',
        respectDelta: 2,
        reply: 'На полі проти PXG він більше працював персональним ланцюгом для Шідо, ніж самостійним нападником. Поважно для захисника, жалюгідно для претендента на трон.'
      }
    ]
  },
  {
    id: 'aiku',
    kind: 'character',
    weight: 9,
    patterns: [/(айку|aiku|олівер|капітан u-?20)/],
    compareLine: 'Олівер Айку — справжній сталевий замок оборони, який через статистичний аналіз і Metavision перекриває навіть найнебезпечніші прориви.',
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 4,
        reply: 'Олівер Айку став найсерйознішою стіною з усього складу U-20, та й у Ubers він читав комбінації не гірше за європейських профі. Саме таких жорстких захисників приємно ламати своїм Flow. ⚡'
      },
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Коли Айку вмикає свою «базу даних» і зріст у верховій боротьбі, стандартний удар не проходить. Проти нього працює тільки чиста нелогічність руйнування.'
      }
    ]
  },
  {
    id: 'lorenzo',
    kind: 'character',
    weight: 9,
    patterns: [/(лоренцо|lorenzo|зомбі|донд|дон лоренцо)/],
    compareLine: 'Дон Лоренцо з Ubers перетворює захист на хижий абсурдний дриблінг «Зомбі» і спокійно зачиняв у клітці навіть Кайзера.',
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 4,
        reply: 'Дон Лоренцо — рідкісний захисник світового класу з вулиць, який може нейтралізувати навіть Кайзера і ще розкрутити контратаку на своєму кривому дриблінгу. З таким цікаво перевіряти межі власної зброї. ⚡'
      },
      {
        emotion: 'smirk',
        respectDelta: 2,
        reply: 'Оцінювати людей у грошах? Трохи брудно, але принаймні в нього немає фальшивих промов — він чесно виконує роботу аса оборони й коштує кожного євро.'
      }
    ]
  },
  {
    id: 'charles',
    kind: 'character',
    weight: 8,
    patterns: [/(шарль|шарля|charles|шевальє)/],
    compareLine: 'Шарль Шевальє — капризний 15-річний плеймейкер PXG, чиї контрарні паси працюють на чистому бунті та хаосі.',
    replies: [
      {
        emotion: 'annoyed',
        respectDelta: 2,
        reply: 'Цей 15-річний капризний чорт у PXG? Шарль пасує туди, де ніхто не чекає, бо його нудить від логічних схем. Іноді хотілося скрутити йому шию, але паси він видає рівня європейської ліги. 😒'
      }
    ]
  },
  {
    id: 'loki',
    kind: 'character',
    weight: 9,
    patterns: [/(локі|локи|loki|жульєн|godspeed)/],
    compareLine: 'Жульєн Локі у 17 років володіє абсолютною швидкістю Godspeed, яка ламає саму фізику часу на полі.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Жульєн Локі всього на пару років старший за нас, а його Godspeed у PXG та World Five уже стирає захисників із трави. Настільки неприродна швидкість бісить — і саме тому обігнати його інтелектом та голом це виклик №1. 🎯'
      }
    ]
  },
  {
    id: 'noa',
    kind: 'character',
    weight: 9,
    patterns: [/(ноель|(?:^|[^а-яіїєґa-z0-9])ноа(?=$|[^а-яіїєґa-z0-9])|\bnoa\b|номер 1 у світі)/],
    compareLine: 'Ноель Ноа — чинний №1 світу, ходяча машина двоногої ефективності й чистого раціоналізму без зайвих жестів.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 5,
        reply: 'Ноель Ноа сидить на троні №1 у світі завдяки абсолютному раціоналізму й ударам обома ногами. Поважаю його як орієнтир для знищення, але я переступлю через нього не чужою теорією, а власним руйнуванням. 🎯'
      }
    ]
  },
  {
    id: 'masters_nel',
    kind: 'character',
    weight: 8,
    patterns: [/(прінс|принс|prince|снаффі|снаффи|snuffy|лавінь|лавіньо|lavinho|світов[а-яіїєґ]*\s+майстр)/],
    compareLine: 'Майстри NEL Кріс Прінс, Марк Снаффі та Лавіньйо показують три вершини профі — абсолютну фізику, тактичний шаховий бізнес і бразильський імпровізаційний дриблінг.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Кріс Прінс поклоняється власній біомеханіці тіла, Снаффі тримає команду Ubers як безпомилкову корпорацію, а Лавіньйо танцює під вуличний біт. Корисні взірці, але кожен із них — лише сходинка до моєї власної вершини. 🎯'
      }
    ]
  },
  {
    id: 'ego_anri',
    kind: 'character',
    weight: 8,
    patterns: [/(его дзінпачі|джінпачі|дзинпачи|(?:^|[^а-яіїєґa-z0-9])его(?=$|[^а-яіїєґa-z0-9])|\banri\b|анрі|теїрі)/],
    compareLine: 'Джінпачі Его викував саму теорію егоїзму Blue Lock, тоді як Анрі Теїрі вірить у японський футбол, який Его безжально переплавляє.',
    replies: [
      {
        emotion: 'smirk',
        respectDelta: 3,
        reply: 'Джінпачі Его в окулярах і з вічною локшиною — психопат, який розуміє головну істину краще за всіх чиновників федерації: у штрафному перемагає тільки холодний егоїзм, а не командні казки. 😏'
      },
      {
        emotion: 'neutral',
        respectDelta: 2,
        reply: 'Його формула «помнож себе на нуль під тиском» несподівано спрацювала навіть у моїх найгірших моментах. Як архітектор цього пекла, Его знає свою справу. ❄️'
      }
    ]
  },
  {
    id: 'hiori_kurona',
    kind: 'character',
    weight: 8,
    patterns: [/(хіорі|хіори|hiori|курона|kurona|акула)/],
    compareLine: 'Хіорі Йо з крижаним баченням пасу та спритний Курона Ранзе стали ідеальними саппортами на орбіті Ісагі.',
    replies: [
      {
        emotion: 'neutral',
        respectDelta: 2,
        reply: 'Хіорі бачить простір пасів майже так само чисто, як і Сае, але сам не хоче бути нападником-вбивцею. А Курона — просто спритний супутник на чужій орбіті. Якісний сервіс, не більше. ❄️'
      }
    ]
  },
  {
    id: 'karasu_otoya',
    kind: 'character',
    weight: 8,
    patterns: [/(карасу|karasu|отой|отоя|otoya|ворон|ніндзя)/],
    compareLine: 'Карасу Табіто б’є по найслабшій ланці опонента холодною аналітикою, а Отоя Ейта ріже фланг у сліпій зоні.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Карасу вміє швидко знаходити «посередність» на полі й тиснути туди, а Отоя ковзає за спинами як тінь. Непогана зв’язка для підтримки, але в лобовому зіткненні зі мною слабкі місця знаходжу я. 🎯'
      }
    ]
  },
  {
    id: 'yukimiya_niko',
    kind: 'character',
    weight: 8,
    patterns: [/(юкімі|юкими|yukimiya|(?:^|[^а-яіїєґa-z0-9])ніко(?=$|[^а-яіїєґa-z0-9])|(?:^|[^а-яіїєґa-z0-9])нико(?=$|[^а-яіїєґa-z0-9])|\bniko\b|іккі)/],
    compareLine: 'Юкімія Кенью вигризає простір 1 на 1 своїм вуличним дриблінгом попри втрату зору, а Ніко Іккі переродився в розумну сторожову вежу захисту.',
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Юкімія кидається в дриблінг 1 на 1 як божевільний, бо його час із зором обмежений — хоча іноді засліпленість власним его робить його передбачуваним. А Ніко в Ubers нарешті визнав, що його мозок створений не для голів, а для перехоплень.'
      }
    ]
  },
  {
    id: 'gagamaru_igaguri',
    kind: 'character',
    weight: 8,
    patterns: [/(гагамару|gagamaru|ігараші|игараши|ігагурі|igaguri|воротар|маліц)/],
    compareLine: 'Гагамару Гін рятує безнадійні м’ячі дикими рефлексами у воротах, тоді як Іґараші намагається вижити дешевими фолами й «маліцією».',
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 3,
        reply: 'Гагамару у воротах — аномалія з гір. Звичайна теорія голкіперів проти нього ламається, бо він стрибає туди, де люди просто ламають ребра. Поважно для №1 у рамці. ⚡'
      },
      {
        emotion: 'disgust',
        respectDelta: -4,
        reply: 'А ось лисий Іґараші з його симуляціями та «маліцією» — уособлення всього огидного у футболі. Якщо твій план на гру це падати від дотику вітру, тобі взагалі нічого робити на газоні. 💧'
      }
    ]
  },
  {
    id: 'ness_sendou',
    kind: 'character',
    weight: 8,
    patterns: [/(несс|(?:^|[^а-яіїєґa-z0-9])нес(?=$|[^а-яіїєґa-z0-9])|\bness\b|сендо|сендоу|sendou|голлівуд)/],
    compareLine: 'Алексіс Несс задихнувся в сліпому служінні Кайзеру, а Шюто Сендо довго грав на рівні посередності, поки U-20 не зламала його ілюзії.',
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: 'Несс поводився як дресирований маг при нозі Кайзера — це жалюгідне видовище, коли талановитий пасуючий добровільно вбиває власну волю. Хоча на останній секунді в PXG навіть у ньому прокинувся пас не для хазяїна. 😒'
      },
      {
        emotion: 'annoyed',
        respectDelta: 1,
        reply: 'Сендо хотів одружитися з голлівудською акторкою і грав у півсили — поки на U-20 не відчув справжній жах. Хай дякує, що не вилетів у першому ж таймі.'
      }
    ]
  },
  {
    id: 'aryu_tokimitsu_zantetsu',
    kind: 'character',
    weight: 8,
    patterns: [/(арію|ариу|aryu|токіміцу|токимицу|tokimitsu|занецу|зантецу|zantetsu|ошам)/],
    compareLine: 'Арію, Токіміцу і Занецу мають вузькі природні козирі — висоту стрибка, тваринну міць у паніці та вибухове прискорення без тактичного мозку.',
    replies: [
      {
        emotion: 'smirk',
        respectDelta: 2,
        reply: 'У Другому відборі я спокійно керував і гламурним Арію з його «ошам», і переляканим танком Токіміцу як власними пішаками. Обидва мають шалені фізичні плюси, але без голови вони просто іграшки на нитках. 😏'
      },
      {
        emotion: 'neutral',
        respectDelta: 1,
        reply: 'Занецу в PXG бігає швидко на короткій дистанції, та якби він читав поле хоча б на половину своєї швидкості — мав би зовсім іншу ціну. ❄️'
      }
    ]
  },

  // === BLUE LOCK MOMENTS, ARCS & WEAPONS ===
  {
    id: 'u20_match',
    kind: 'moment',
    weight: 9,
    patterns: [/(u-?20|матч.*япон|збірн[а-яіїєґ]*\s+япон|проти\s+ю-?20|другий\s+сезон|бій\s+брат)/],
    replies: [
      {
        emotion: 'flow',
        respectDelta: 5,
        reply: 'Матч Blue Lock 11 проти Japan U-20 змінив усе. У першому таймі я поклав гол зовнішньою підкруткою так, щоб роздратувати Сае, а наприкінці відкинув «красивий футбол» і на голому Flow Руйнівника зупинив навіть його. 🩸'
      },
      {
        emotion: 'angry',
        respectDelta: 3,
        reply: 'Момент на останній хвилині U-20, коли я вибив м’яч із ніг Сае, а добив його Ісагі — я досі ненавиджу цей фінал. Сае навіть не назвав моє ім’я, а показав на Ісагі — саме тоді почалося моє справжнє полювання. 💢'
      }
    ]
  },
  {
    id: 'nel_pxg',
    kind: 'moment',
    weight: 8,
    patterns: [/(pxg|пхг|neo egoist|\bnel\b|нео\s*егоїст|240|ставк|офер|хет-?трик|crashoot|франц)/],
    replies: [
      {
        emotion: 'smirk',
        respectDelta: 4,
        reply: 'У Neo Egoist League я став центром PXG, оформив хет-трик проти Manshine і забив божевільний Crashoot-гол крізь Ісагі та Кайзера у фіналі. 240 мільйонів єн і запрошення від Re Al — лише розминка. 😏'
      },
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'У французькій системі Локі довелося грати через постійний внутрішній тиск із боку Шідо та примх Шарля — саме це змусило мій Flow прокинутися не випадково, а за моєю командою. 🎯'
      }
    ]
  },
  {
    id: 'world_five',
    kind: 'moment',
    weight: 8,
    patterns: [/(world\s*five|світов[а-яіїєґ]*\s+п'?ятір|(?:^|[^а-яіїєґa-z0-9])луна(?=$|[^а-яіїєґa-z0-9])|леонардо луна|блейк|дада сілва|кавасос)/],
    replies: [
      {
        emotion: 'focused',
        respectDelta: 5,
        reply: 'Проти World Five я єдиний у всьому Blue Lock пробив їхніх зірок на старті — але те, як легко Леонардо Луна розкрутив мене одним фінт-кроком, назавжди врізалося мені в пам’ять. Професійний світ безжальний, і саме тому я не знижую планку. 🎯'
      }
    ]
  },
  {
    id: 'room100_selection',
    kind: 'moment',
    weight: 8,
    patterns: [/(кімнат[а-яіїєґ]*\s*100|перший\s+відбір|другий\s+відбір|4\s*на\s*4|3\s*на\s*3|\bluck\b|вдач[а-яіїєґ]*\s+гол|увійшов перш)/],
    replies: [
      {
        emotion: 'smirk',
        respectDelta: 3,
        reply: 'Кімнату 100 голів я пройшов першим із усіх учасників без жодної зупинки на сумніви. А гол Ісагі в матчі 4 на 4 — це жорстокий урок від долі: удача падає лише до ніг того, хто вже добіг у потрібну точку раніше за всіх. 😏'
      }
    ]
  },
  {
    id: 'childhood_rain',
    kind: 'moment',
    weight: 8,
    patterns: [/(дитинств|під\s+дощем|клятв|морозив|мертв[а-яіїєґ]*\s+зон|іграшк|монстр[а-яіїєґ]*\s+злама)/],
    replies: [
      {
        emotion: 'shocked',
        respectDelta: 4,
        reply: '...Той матч у дворі під зливою, коли захисник перекрив мені шлях, а я пробив у єдину сліпу щілину, куди мене несло тіло — тоді я ще грав із чистої любові до Сае. Зараз від тієї дитини залишився лише гострий інстинкт. ❄️'
      }
    ]
  },
  {
    id: 'flow_destroyer',
    kind: 'weapon',
    weight: 9,
    patterns: [/(flow|флоу|потік|руйнів|разруш|маріонетк|підкрутк|підкруч|траєктор|predator eye|язик|демон)/],
    replies: [
      {
        emotion: 'flow',
        respectDelta: 7,
        reply: 'Справжній Flow — це не гарна тікі-така. Це момент, коли ти витягуєш із ворога його найсильнішу зброю і ламаєш її об коліно прямо перед воротами, забиваючи з потворною холодністю. 🩸'
      },
      {
        emotion: 'focused',
        respectDelta: 6,
        reply: 'Спочатку я будував «Простір Маріонетки» і крутив м’яч по бездоганній геометричній дузі зовнішньою чи внутрішньою. Але лише поєднання холодної балістики та дикого Руйнівника зробило мене по-справжньому нечитаним. 🎯'
      }
    ]
  },
  {
    id: 'minigame_help',
    kind: 'portal',
    weight: 8,
    patterns: [/(міні-гр|мінігр|raylib|2d|стріля|керуван|джойст|тактик.*грі|як перемог.*грі)/],
    replies: [
      {
        emotion: 'focused',
        respectDelta: 5,
        reply: 'У нашій 2D-арені не бий у лоб як аматор. Закладай криву підкручену траєкторію по дузі повз корпус воротаря, лови захисників у «Простір Маріонетки» і рви центр, щойно шкала Flow спалахне червоним. 🎯'
      },
      {
        emotion: 'smirk',
        respectDelta: 3,
        reply: 'Якщо бот у міні-грі тебе читає — ти сам занадто прямолінійний. Фальшивий замах на фланг, різкий зріз і удар у дальню дев’ятку вирішують матч за десять секунд. 😏'
      }
    ]
  },
  {
    id: 'quiz_audit',
    kind: 'portal',
    weight: 8,
    patterns: [/(тест[а-яіїєґ]*|вікторин|еґо-?аудит|его-?аудит|питання.*ранг)/],
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 4,
        reply: 'Пройшов Его-Аудит на сайті? Сухі цифри на кшталт 9 вересня чи 186 см це лише база — перевірка в тому, чи розумієш ти логіку кожного мого рішення від Кюсю до PXG. ⚡'
      }
    ]
  },

  // === MODERN LIFE, TECH, REAL FOOTBALL & EVERYDAY TOPICS ===
  {
    id: 'ai_tech_coding',
    kind: 'modern',
    weight: 8,
    patterns: [/(нейромереж|штучн[а-яіїєґ]*\s+інтелект|chatgpt|чатгпт|чатджпт|gemini|джем[іи]ні|\bai\b|(?:^|[^а-яіїєґa-z0-9])ші(?=$|[^а-яіїєґa-z0-9])|програм|кодинг|(?:^|[^а-яіїєґa-z0-9])код(?=$|[^а-яіїєґa-z0-9])|айті|\bit\b|розроб|сайт|технолог)/],
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'ШІ, код, алгоритми? Це просто сталева лінійка для розрахунків — як перегляд записів чужих матчів. Сильний використовує її, щоб швидше знайти вразливість ворога, а слабкий віддає машині власні мізки і деградує. Якщо за тебе думає алгоритм — на полі ти першим станеш кормом.'
      },
      {
        emotion: 'disgust',
        respectDelta: -1,
        reply: 'Мене нудить від тих, хто копіює чужий код або питає нейросеть, що їм робити зі своїм життям. Жоден алгоритм не навчить тебе холодної люті в штрафному майданчику. Це типова «nurui» — тепла вода для ледачих. 😒'
      }
    ]
  },
  {
    id: 'social_media',
    kind: 'modern',
    weight: 8,
    patterns: [/(tiktok|тікток|інста|instagram|reels|рілс|youtube|ютуб|соцмереж|телеграм|твіттер|мем|лайк|підпис|хейт|стрім|блог)/],
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -3,
        reply: 'Годинами скролити TikTok і чужі нарізки — це добровільне самознищення. Поки ти залипаєш у п’ятнадцятисекундному смітті й рахуєш чужі лайки, хтось інший точить зуби, щоб розчавити тебе. Жалке видовище. 😒'
      },
      {
        emotion: 'annoyed',
        respectDelta: 0,
        reply: 'Соцмережі потрібні маріонеткам, які залежать від чужого схвалення. Мільйон підписників не закриє твої дірки в захисті, коли ти лишишся зі мною 1 на 1.'
      }
    ]
  },
  {
    id: 'real_football',
    kind: 'modern',
    weight: 8,
    patterns: [/(мессі|месси|messi|роналду|рональдо|ronaldo|мбаппе|mbappe|холанд|haaland|ямаль|yamal|белінгем|ліга\s+чемпіон|var\b|барселон|реал\s*мадрид|псж|psg|футбол\s+сьогод|матчі)/],
    replies: [
      {
        emotion: 'intrigued',
        respectDelta: 5,
        reply: 'Мессі бачить геометрію раніше, ніж захисник встигає повернути шию. Роналду вирізьбив себе чистою манією. Мбаппе — прототип Локі. Але захоплюватися ними знизу вгору — доля фанатів. Я дивлюся їхні матчі лише щоб вирахувати, як розірвати кожну з цих вершин. ❄️'
      },
      {
        emotion: 'focused',
        respectDelta: 4,
        reply: 'Сучасний європейський футбол — це війна пресингу, міліметрового VAR і звірячої фізики. Там немає часу на сентименти: або ти диктуєш ритм і ховаєш м’яч у сітку, або сідаєш на лавку назавжди.'
      }
    ]
  },
  {
    id: 'gaming_esports',
    kind: 'modern',
    weight: 7,
    patterns: [/(відеоіг[а-яіїєґ]*|(?:^|[^а-яіїєґa-z0-9])іг(?:ор|ри|ра)(?=$|[^а-яіїєґa-z0-9])|геймінг|fifa|ea fc|fc\s*25|fc\s*26|dota|дота|cs2|кс2|valorant|валорант|кіберспорт|комп'ютер|консол|playstation|стім|steam)/],
    replies: [
      {
        emotion: 'annoyed',
        respectDelta: -1,
        reply: 'Цифрові ранги, FIFA, Valorant… Якщо ти перемагаєш за рахунок читання карти й крижаних нервів — це ще можна зрозуміти. Але якщо після програшу ти ниєш про тіммейтів чи пінг, краще навіть не вмикай монітор. Це менталітет жертви. 😒'
      },
      {
        emotion: 'focused',
        respectDelta: 2,
        reply: 'Різниця між екранним героєм і реальним гравцем проста: у грі в тебе є кнопка «повторити», на полі ти платиш власною кров’ю та м’язами. Не плутай пікселі з реальністю.'
      }
    ]
  },
  {
    id: 'school_work_money',
    kind: 'modern',
    weight: 7,
    patterns: [/(школ|універ|внз|екзамен|іспит|зн[оа]|нмт|домашк|робот|карь?єр|грош|бізнес|крипт|зарплат|дедлайн|вчитися|навчання)/],
    replies: [
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Екзамени, гроші, робота — та сама арена на вибування. Нікому не цікаво, як довго ти старався і скільки не спав. Зараховується лише кінцевий удар: або ти незамінний хижак зі своєю зброєю, або ти — дешева масовка на заміну.'
      },
      {
        emotion: 'annoyed',
        respectDelta: 1,
        reply: 'Гроші самі по собі — нуль, лише побічний продукт рівня. Якщо твої навички слабкі, будь-які ставки чи кар’єрні мрії згорять при першому реальному зіткненні. Спершу стань небезпечним.'
      }
    ]
  },
  {
    id: 'mindset_lazy_stress',
    kind: 'modern',
    weight: 7,
    patterns: [/(лін|прокрастин|втом|стрес|вигоран|сумно|депрес|нема\s*сил|мотивац|страшн|сумнів|здат|не\s*виход|важко|погано)/],
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: '«Немає мотивації», «вигорання», «страшно»… Ти чуєш, як це звучить? Справжня «тепла вода». Ніхто не прийде витирати тобі сльози. Або стискаєш зуби, пережовуєш біль і б’єш у ціль, або здаєшся і звільняєш місце іншим. 😒'
      },
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'Тиск має не ламати тебе, а випалювати все зайве. Коли ноги горять і в голові шум — дихай через живіт, вимикай жалість до себе і роби наступний крок на чистому інстинкті. Інакше ти вже програв. ❄️'
      }
    ]
  },
  {
    id: 'relationships_love',
    kind: 'modern',
    weight: 7,
    patterns: [/(люб|кохан|дівчин|хлоп|дружб|стосунк|розбит|зрад|ревн|симпат|весілл|сім'?я)/],
    replies: [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: 'Любов, дружба, рожеві обійми — пуста трата кисню. Поки я не знищив усіх, хто стоїть попереду, для мене не існує жодного теплого почуття. Сліпа прив’язаність робить із гравця ручну маріонетку. 😒'
      },
      {
        emotion: 'annoyed',
        respectDelta: 0,
        reply: 'Якщо твоє оточення вимагає, щоб ти став м’якшим і «нормальним» — виріж цих людей із поля зору. Єдиний прийнятний зв’язок — холодне суперництво, що змушує еволюціонувати.'
      }
    ]
  },
  {
    id: 'daily_routine_food',
    kind: 'modern',
    weight: 8,
    patterns: [/(йог|спортзал|тренуван|качал|біг|хорор|жах|фільм|кіно|музик|пісн|аніме|манг|чай|очадзуке|кав|енергетик|їж|фастфуд|(?:^|[^а-яіїєґa-z0-9])сон(?=$|[^а-яіїєґa-z0-9])|спати|день народ|зріст|вік|хобі)/],
    replies: [
      {
        emotion: 'neutral',
        respectDelta: 3,
        reply: 'Мій день заточений під одне: вранці йога і розтяжка для ідеального балансу, вдень — удари до кривавого поту, у раціоні — гаряче очадзуке і зелений чай без солодкого сміття. Фастфуд і енергетики — паливо для тих, кому байдуже на власне тіло. ❄️'
      },
      {
        emotion: 'focused',
        respectDelta: 3,
        reply: 'На ніч можу поставити жорсткий хорор — не заради адреналіну, а щоб відчути холодну ясність розуму, коли все навколо тріщить. А ще англійська: за кордоном я маю розуміти кожну репліку суперника без затримок.'
      }
    ]
  },
  {
    id: 'weather_world',
    kind: 'modern',
    weight: 6,
    patterns: [/(погод|дощ|сніг|(?:^|[^а-яіїєґa-z0-9])ніч(?=$|[^а-яіїєґa-z0-9])|зима|літо|війна|тривог|світ\s+навколо|новини|життя\s+загалом|сучасн[а-яіїєґ]*\s+жит)/],
    replies: [
      {
        emotion: 'neutral',
        respectDelta: 3,
        reply: 'Сніг завжди нагадує мені Камакуру й день, коли мій світ уперше розколовся. Тому погода й хаос навколо для мене нічого не змінюють — хай надворі хоч шторм, я однаково виходжу і виконую свою норму. ❄️'
      },
      {
        emotion: 'focused',
        respectDelta: 2,
        reply: 'Світ переповнений шумом, панікою та порожніми новинами. Слабкі розчиняються в цьому потоці. Єдина точка опори, яка не зраджує — твоя власна холодна голова і контроль над моментом.'
      }
    ]
  }
];
const RIN_CALL_EMOTIONS = {
  neutral: { label: '❄️ ХОЛОДНИЙ СПОКІЙ', src: 'assets/call/rin_call_neutral.webp' },
  annoyed: { label: '😒 РОЗДРАТУВАННЯ // NURUI', src: 'assets/call/rin_call_annoyed.webp' },
  disgust: { label: '💧 ОГИДА // ТЕПЛА ВОДА', src: 'assets/call/rin_call_disgust.webp' },
  focused: { label: '🎯 ТАКТИЧНИЙ ФОКУС', src: 'assets/call/rin_call_focused.webp' },
  intrigued: { label: '⚡ ЗАЦІКАВЛЕННЯ', src: 'assets/call/rin_call_intrigued.webp' },
  smirk: { label: '😏 ЗВЕРХНЯ ПОСМІШКА', src: 'assets/call/rin_call_smirk.webp' },
  shocked: { label: '😳 ХОЛОДНИЙ ПОДИВ', src: 'assets/call/rin_call_shocked.webp' },
  angry: { label: '💢 ПРИДУШЕНА ЛЮТЬ', src: 'assets/call/rin_call_angry.webp' },
  flow: { label: '🩸 РЕЖИМ FLOW // РУЙНІВНИК', src: 'assets/call/rin_call_flow.webp' }
};

const RIN_CALL_STORAGE_KEY = 'itoshi_rin_call_settings_v1';

class RinCallController {
  constructor(sfx, onThemeChange) {
    this.sfx = sfx;
    this.onThemeChange = onThemeChange;

    this.section = document.getElementById('callSection');
    if (!this.section) return;

    this.stage = document.getElementById('callMainStage');
    this.layerA = document.getElementById('rinPortraitLayerA');
    this.layerB = document.getElementById('rinPortraitLayerB');
    this.activeLayer = 'A';

    this.dialogueBox = document.getElementById('rinDialogueBox');
    this.dialogueText = document.getElementById('rinDialogueText');
    this.typingIndicator = document.getElementById('callTypingIndicator');
    this.skipTypingBtn = document.getElementById('callSkipTypingBtn');
    this.sourceTag = document.getElementById('callReplySourceTag');
    this.emotionLabel = document.getElementById('callEmotionLabel');
    this.respectRank = document.getElementById('callRespectRank');
    this.respectBar = document.getElementById('callRespectBar');
    this.waveform = document.getElementById('callWaveform');
    this.timerEl = document.getElementById('callTimer');

    this.modeBadge = document.getElementById('callActiveModeBadge');
    this.modeLabel = document.getElementById('callActiveModeLabel');

    this.inputForm = document.getElementById('callInputForm');
    this.userInput = document.getElementById('callUserInput');
    this.sendBtn = document.getElementById('callSendBtn');
    this.quickTopics = document.getElementById('callQuickTopics');

    // Settings Modal Elements
    this.settingsModal = document.getElementById('callSettingsModal');
    this.apiSettingsBtn = document.getElementById('callApiSettingsBtn');
    this.closeSettingsBtn = document.getElementById('closeCallSettingsBtn');
    this.settingsBackdrop = document.getElementById('callSettingsBackdrop');
    this.modeButtons = document.querySelectorAll('#callModeSelector .mode-option-btn');
    this.apiKeyInput = document.getElementById('geminiApiKeyInput');
    this.toggleKeyVisBtn = document.getElementById('toggleApiKeyVisBtn');
    this.modelSelect = document.getElementById('geminiModelSelect');
    this.testKeyBtn = document.getElementById('testGeminiKeyBtn');
    this.saveSettingsBtn = document.getElementById('saveCallSettingsBtn');
    this.clearKeyBtn = document.getElementById('clearGeminiKeyBtn');
    this.testStatus = document.getElementById('callApiTestStatus');

    // History Modal Elements
    this.historyBtn = document.getElementById('callHistoryBtn');
    this.historyModal = document.getElementById('callHistoryModal');
    this.historyBackdrop = document.getElementById('callHistoryBackdrop');
    this.closeHistoryBtn = document.getElementById('closeCallHistoryBtn');
    this.historyList = document.getElementById('callHistoryList');
    this.resetBtn = document.getElementById('callResetBtn');

    this.currentEmotion = 'neutral';
    this.respect = 35;
    this.history = [];
    this.usedLocalPools = {};
    this.lastLocalTopic = null;
    this.apiUiHidden = true;
    this.turnCount = 0;
    this.isRequestPending = false;
    this.typingTimer = null;
    this.fullCurrentText = '';
    this.callSeconds = 0;
    this.callTimerInterval = null;
    this.hasGreeted = false;
    this.imagesPreloaded = false;
    this.cachedGeminiModels = [];

    this.settings = this.loadSettings();
    this.pendingModalMode = this.settings.mode;

    this.bindEvents();
    this.syncModeUI();
    this.updateRespectUI();
    this.setEmotion('neutral', false);
  }

  loadSettings() {
    const defaults = {
      mode: 'hybrid',
      apiKey: '',
      model: 'gemini-3.8-flash'
    };
    try {
      const raw = localStorage.getItem(RIN_CALL_STORAGE_KEY);
      if (!raw || raw.length > 4096) return defaults;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return defaults;
      let loadedModel = typeof parsed.model === 'string' && parsed.model.trim() ? parsed.model.trim().slice(0, 64) : 'gemini-3.8-flash';
      if (
        loadedModel === 'gemini-2.5-flash' ||
        loadedModel === 'gemini-2.0-flash' ||
        loadedModel === 'gemini-2.5-flash-lite' ||
        /(hydrogen|helium|lithium|bison|gecko)/i.test(loadedModel)
      ) {
        loadedModel = 'gemini-3.8-flash';
      }
      const sanitized = {
        mode: ['hybrid', 'local', 'gemini'].includes(parsed.mode) ? parsed.mode : 'hybrid',
        apiKey: this.apiUiHidden ? '' : (typeof parsed.apiKey === 'string' ? parsed.apiKey.trim().slice(0, 256) : ''),
        model: loadedModel
      };
      if (this.apiUiHidden && typeof parsed.apiKey === 'string' && parsed.apiKey.trim()) {
        // Purge leftover API credentials from browser storage while API mode is disabled
        localStorage.setItem(RIN_CALL_STORAGE_KEY, JSON.stringify(sanitized));
      }
      return sanitized;
    } catch {
      return defaults;
    }
  }

  persistSettings() {
    try {
      const payload = {
        mode: this.settings.mode,
        apiKey: this.apiUiHidden ? '' : this.settings.apiKey,
        model: this.settings.model
      };
      localStorage.setItem(RIN_CALL_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }

  sanitizeUserInput(raw) {
    if (typeof raw !== 'string') return '';
    return raw
      .replace(/[\u0000-\u001F\u007F\u200B-\u200F\u202A-\u202E\uFEFF]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 400);
  }

  isRateLimited() {
    const now = Date.now();
    if (!Array.isArray(this.submitTimestamps)) {
      this.submitTimestamps = [];
    }
    this.submitTimestamps = this.submitTimestamps.filter((ts) => now - ts < 10000);
    const lastTs = this.submitTimestamps[this.submitTimestamps.length - 1] || 0;
    if (now - lastTs < 450 || this.submitTimestamps.length >= 6) {
      return true;
    }
    this.submitTimestamps.push(now);
    return false;
  }

  preloadEmotions() {
    if (this.imagesPreloaded) return;
    this.imagesPreloaded = true;
    Object.values(RIN_CALL_EMOTIONS).forEach((entry) => {
      const img = new Image();
      img.src = entry.src;
    });
  }

  bindEvents() {
    if (this.inputForm) {
      this.inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = this.sanitizeUserInput(this.userInput?.value || '');
        if (!text || this.isRequestPending) return;
        this.userInput.value = '';
        this.handleUserMessage(text);
      });
    }

    if (this.quickTopics) {
      this.quickTopics.addEventListener('click', (e) => {
        const chip = e.target.closest('.topic-chip');
        if (!chip || this.isRequestPending) return;
        const prompt = this.sanitizeUserInput(chip.getAttribute('data-prompt') || '');
        if (prompt) {
          this.sfx.playClick();
          this.handleUserMessage(prompt);
        }
      });
    }

    if (this.dialogueBox) {
      this.dialogueBox.addEventListener('click', () => {
        if (this.typingTimer) {
          this.finishTypingImmediately();
        }
      });
    }

    if (this.skipTypingBtn) {
      this.skipTypingBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.finishTypingImmediately();
      });
    }

    // Settings modal listeners
    this.apiSettingsBtn?.addEventListener('click', () => {
      this.sfx.playClick();
      this.openSettingsModal();
    });
    this.closeSettingsBtn?.addEventListener('click', () => this.closeSettingsModal());
    this.settingsBackdrop?.addEventListener('click', () => this.closeSettingsModal());

    this.modeButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        this.sfx.playClick();
        this.pendingModalMode = btn.getAttribute('data-mode') || 'hybrid';
        this.modeButtons.forEach((b) => b.classList.toggle('active', b === btn));
      });
    });

    this.toggleKeyVisBtn?.addEventListener('click', () => {
      if (!this.apiKeyInput) return;
      this.apiKeyInput.type = this.apiKeyInput.type === 'password' ? 'text' : 'password';
    });

    this.testKeyBtn?.addEventListener('click', () => this.testGeminiConnection());

    this.saveSettingsBtn?.addEventListener('click', () => {
      this.settings.mode = this.pendingModalMode || 'hybrid';
      this.settings.apiKey = (this.apiKeyInput?.value || '').trim();
      this.settings.model = this.modelSelect?.value || 'gemini-3.8-flash';
      this.persistSettings();
      this.syncModeUI();
      this.sfx.playClick();
      this.setTestStatus('Налаштування збережено.', 'ok');
      setTimeout(() => this.closeSettingsModal(), 450);
    });

    this.clearKeyBtn?.addEventListener('click', () => {
      this.settings.apiKey = '';
      if (this.apiKeyInput) this.apiKeyInput.value = '';
      this.persistSettings();
      this.syncModeUI();
      this.setTestStatus('Ключ очищено з пам’яті браузера.', '');
    });

    // History modal listeners
    this.historyBtn?.addEventListener('click', () => {
      this.sfx.playClick();
      this.openHistoryModal();
    });
    this.closeHistoryBtn?.addEventListener('click', () => this.closeHistoryModal());
    this.historyBackdrop?.addEventListener('click', () => this.closeHistoryModal());

    // Reset call
    this.resetBtn?.addEventListener('click', () => {
      this.sfx.playCallConnect();
      this.resetConversation();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.settingsModal?.classList.contains('active')) this.closeSettingsModal();
        if (this.historyModal?.classList.contains('active')) this.closeHistoryModal();
      }
    });
  }

  onSectionEnter() {
    this.preloadEmotions();
    this.startCallTimer();
    this.syncFlowGlobalTheme();

    if (!this.hasGreeted) {
      this.hasGreeted = true;
      this.sfx.playCallConnect();
      const openingText = 'Зв’язок відкрито. Якщо забереш мій час теплою балаканиною — вимкну канал без попередження. Кажи по суті.';
      this.recordMessage('rin', openingText, 'focused', 'ПРЯМИЙ КАНАЛ');
      this.presentRinResponse({
        emotion: 'focused',
        reply: openingText,
        sourceLabel: 'ПРЯМИЙ КАНАЛ',
        respectDelta: 0
      });
    }
  }

  onSectionLeave() {
    this.stopCallTimer();
  }

  startCallTimer() {
    if (this.callTimerInterval) return;
    this.callTimerInterval = setInterval(() => {
      this.callSeconds += 1;
      if (this.timerEl) {
        const mins = String(Math.floor(this.callSeconds / 60)).padStart(2, '0');
        const secs = String(this.callSeconds % 60).padStart(2, '0');
        this.timerEl.textContent = `${mins}:${secs}`;
      }
    }, 1000);
  }

  stopCallTimer() {
    if (this.callTimerInterval) {
      clearInterval(this.callTimerInterval);
      this.callTimerInterval = null;
    }
  }

  resetConversation() {
    this.finishTypingImmediately();
    this.history = [];
    this.usedLocalPools = {};
    this.lastLocalTopic = null;
    this.apiUiHidden = true;
    this.turnCount = 0;
    this.respect = 35;
    this.callSeconds = 0;
    if (this.timerEl) this.timerEl.textContent = '00:00';
    this.updateRespectUI();

    const resetLine = 'Канал очищено. Попередній шум стерто — наступна твоя фраза має бути гострішою, інакше не марнуй мій час.';
    this.recordMessage('rin', resetLine, 'neutral', 'СИСТЕМА');
    this.presentRinResponse({
      emotion: 'neutral',
      reply: resetLine,
      sourceLabel: 'СИСТЕМА',
      respectDelta: 0
    });
  }

  syncModeUI() {
    if (this.apiUiHidden) {
      if (this.modeLabel) this.modeLabel.textContent = 'РЕЖИМ: ЛОКАЛЬНИЙ ІНТЕЛЕКТ';
      if (this.modeBadge) this.modeBadge.classList.remove('is-gemini');
      if (this.apiSettingsBtn) this.apiSettingsBtn.hidden = true;
      return;
    }

    const hasKey = Boolean(this.settings.apiKey);
    let label = 'РЕЖИМ: ЛОКАЛЬНИЙ';
    let isGeminiActive = false;

    if (this.settings.mode === 'hybrid') {
      if (hasKey) {
        label = 'РЕЖИМ: ГІБРИД · GEMINI';
        isGeminiActive = true;
      } else {
        label = 'РЕЖИМ: ГІБРИД · ЛОКАЛЬНИЙ';
      }
    } else if (this.settings.mode === 'gemini') {
      label = hasKey ? 'РЕЖИМ: GEMINI AI' : 'РЕЖИМ: GEMINI — БЕЗ КЛЮЧА';
      isGeminiActive = hasKey;
    }

    if (this.modeLabel) this.modeLabel.textContent = label;
    if (this.modeBadge) this.modeBadge.classList.toggle('is-gemini', isGeminiActive);
  }

  openSettingsModal() {
    if (!this.settingsModal) return;
    this.pendingModalMode = this.settings.mode;
    this.modeButtons.forEach((b) => {
      b.classList.toggle('active', b.getAttribute('data-mode') === this.pendingModalMode);
    });
    if (this.apiKeyInput) {
      this.apiKeyInput.value = this.settings.apiKey;
      this.apiKeyInput.type = 'password';
    }
    if (this.modelSelect) {
      if (!Array.from(this.modelSelect.options).some((opt) => opt.value === this.settings.model)) {
        const customOpt = document.createElement('option');
        customOpt.value = this.settings.model;
        customOpt.textContent = this.settings.model;
        this.modelSelect.prepend(customOpt);
      }
      this.modelSelect.value = this.settings.model;
    }
    if (this.settings.apiKey) {
      this.setTestStatus(`Ключ збережено локально. Обрана модель: ${this.settings.model}.`, 'ok');
    } else {
      this.setTestStatus('Ключ ще не додано — зараз працює автономний локальний інтелект Ріна.', '');
    }
    this.settingsModal.classList.add('active');
    this.settingsModal.setAttribute('aria-hidden', 'false');
  }

  closeSettingsModal() {
    if (!this.settingsModal) return;
    this.settingsModal.classList.remove('active');
    this.settingsModal.setAttribute('aria-hidden', 'true');
  }

  setTestStatus(msg, state) {
    if (!this.testStatus) return;
    this.testStatus.textContent = msg;
    this.testStatus.classList.remove('is-ok', 'is-error');
    if (state === 'ok') this.testStatus.classList.add('is-ok');
    if (state === 'error') this.testStatus.classList.add('is-error');
  }

  buildGeminiGenConfig(modelName, maxOutputTokens, asJson = false) {
    const cfg = { maxOutputTokens };
    if (asJson) {
      cfg.responseMimeType = 'application/json';
    }
    const isGemini3 = /^gemini-3/i.test(modelName);
    if (!isGemini3) {
      cfg.temperature = 0.85;
    } else {
      cfg.thinkingConfig = { thinkingLevel: 'LOW' };
    }
    return cfg;
  }

  sortGeminiModels(models) {
    const score = (n) => {
      if (n === 'gemini-3.8-flash') return 0;
      if (/flash/.test(n) && /3\./.test(n) && !/lite/.test(n)) return 1;
      if (/flash/.test(n) && /3\./.test(n)) return 2;
      if (/flash/.test(n) && !/lite/.test(n) && !/exp|preview/.test(n)) return 3;
      if (/flash/.test(n)) return 4;
      if (/pro/.test(n) && /3\./.test(n)) return 5;
      if (/pro/.test(n)) return 6;
      if (/(hydrogen|helium|lithium|exp|preview)/i.test(n)) return 8;
      return 7;
    };
    return [...models].sort((a, b) => score(a) - score(b));
  }

  async fetchAvailableGeminiModels(key) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${encodeURIComponent(key)}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json().catch(() => ({}));
    const list = Array.isArray(data?.models) ? data.models : [];
    const sorted = this.sortGeminiModels(
      list
        .filter((m) =>
          Array.isArray(m.supportedGenerationMethods) &&
          m.supportedGenerationMethods.includes('generateContent') &&
          /^models\/gemini-/i.test(m.name) &&
          !/(embedding|tts|image|audio|aqa|robotics|computer-use|hydrogen|helium|lithium|bison|gecko|learnlm)/i.test(m.name)
        )
        .map((m) => m.name.replace(/^models\//, ''))
    );
    this.cachedGeminiModels = sorted;
    return sorted;
  }

  populateModelSelect(models, preferredModel) {
    if (!this.modelSelect || !Array.isArray(models) || models.length === 0) return;
    const sorted = this.sortGeminiModels(models);
    this.modelSelect.innerHTML = sorted
      .map((id) => `<option value="${this.escapeHtml(id)}">${this.escapeHtml(id)}</option>`)
      .join('');
    this.modelSelect.value = sorted.includes(preferredModel) ? preferredModel : sorted[0];
  }

  /**
   * Returns true for temporary Google load spikes, rate limits, or deprecated model IDs
   * where retrying briefly or failing over to another Gemini text model can recover.
   */
  isRetryableGeminiFailure(status, message) {
    if (/API key not valid|API_KEY_INVALID|prepayment credits|billing/i.test(message)) {
      return false;
    }
    return (
      [404, 429, 500, 502, 503, 504].includes(status) ||
      /high demand|unavailable|overloaded|try again|no longer available|not found|not supported/i.test(message)
    );
  }

  async requestGeminiGenerateContent(key, model, payload) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(key)}`;
    return fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  }

  async callGeminiWithFailover(key, primaryModel, buildPayload, maxAlternates = 3, validateResponse = null) {
    let lastError = null;

    const tryModel = async (candidateModel) => {
      try {
        const res = await this.requestGeminiGenerateContent(key, candidateModel, buildPayload(candidateModel));
        if (res.ok) {
          if (typeof validateResponse === 'function') {
            try {
              const payload = await validateResponse(res, candidateModel);
              return { ok: true, res, payload, usedModel: candidateModel };
            } catch (valErr) {
              return {
                ok: false,
                res,
                usedModel: candidateModel,
                message: valErr?.message || 'Некоректна або порожня відповідь моделі',
                retryable: true
              };
            }
          }
          return { ok: true, res, usedModel: candidateModel };
        }
        const errJson = await res.clone().json().catch(() => ({}));
        const message = errJson?.error?.message || `HTTP ${res.status}`;
        return {
          ok: false,
          res,
          usedModel: candidateModel,
          message,
          retryable: this.isRetryableGeminiFailure(res.status, message)
        };
      } catch (err) {
        return {
          ok: false,
          res: null,
          usedModel: candidateModel,
          message: err?.message || 'Мережева помилка',
          retryable: true
        };
      }
    };

    const primaryAttempt = await tryModel(primaryModel);
    if (primaryAttempt.ok || !primaryAttempt.retryable) {
      return primaryAttempt;
    }
    lastError = primaryAttempt;

    await this.delay(650);
    if (this.cachedGeminiModels.length === 0) {
      await this.fetchAvailableGeminiModels(key).catch(() => []);
    }

    const alternates = this.cachedGeminiModels
      .filter((m) => m !== primaryModel)
      .slice(0, maxAlternates);
    const retryQueue = alternates.length > 0 ? [...alternates, primaryModel] : [primaryModel];

    for (const candidate of retryQueue) {
      const attempt = await tryModel(candidate);
      if (attempt.ok || !attempt.retryable) {
        return attempt;
      }
      lastError = attempt;
      await this.delay(450);
    }

    return lastError;
  }

  async testGeminiConnection() {
    const key = (this.apiKeyInput?.value || '').trim();
    let model = this.modelSelect?.value || 'gemini-3.8-flash';
    if (!key) {
      this.setTestStatus('Спочатку встав Gemini API ключ у поле вище.', 'error');
      return;
    }

    if (this.testKeyBtn) this.testKeyBtn.disabled = true;
    this.setTestStatus(`Перевіряю доступні моделі та зв’язок із ${model}...`, '');

    try {
      const available = await this.fetchAvailableGeminiModels(key).catch(() => []);
      if (available.length > 0) {
        if (!available.includes(model)) {
          model = available[0];
        }
        this.populateModelSelect(available, model);
        model = this.modelSelect?.value || model;
      }

      const result = await this.callGeminiWithFailover(
        key,
        model,
        (candidate) => ({
          contents: [{ role: 'user', parts: [{ text: 'Відповідай одним словом: готовий.' }] }],
          generationConfig: this.buildGeminiGenConfig(candidate, 160, false)
        }),
        3
      );

      if (!result.ok) {
        this.setTestStatus(`Помилка API: ${result.message}`, 'error');
        return;
      }

      model = result.usedModel;
      if (this.modelSelect && [...this.modelSelect.options].some((o) => o.value === model)) {
        this.modelSelect.value = model;
      }

      this.settings.apiKey = key;
      this.settings.model = model;
      this.persistSettings();
      this.syncModeUI();
      this.setTestStatus(`З’єднання успішне! Активна модель ${model} готова до дзвінка.`, 'ok');
      this.sfx.playCallConnect();
    } catch (err) {
      this.setTestStatus(`Мережева помилка перевірки: ${err?.message || 'невідомо'}`, 'error');
    } finally {
      if (this.testKeyBtn) this.testKeyBtn.disabled = false;
    }
  }

  openHistoryModal() {
    if (!this.historyModal || !this.historyList) return;
    if (this.history.length === 0) {
      this.historyList.innerHTML = '<div class="history-entry"><p class="history-entry-text">Історія дзвінка ще порожня.</p></div>';
    } else {
      this.historyList.innerHTML = this.history.map((item) => {
        const isRin = item.speaker === 'rin';
        const emMeta = this.escapeHtml(RIN_CALL_EMOTIONS[item.emotion]?.label || '');
        const safeMeta = isRin
          ? `${emMeta} · ${this.escapeHtml(item.source || '')}`
          : this.escapeHtml(item.time || '');
        return `
          <div class="history-entry ${isRin ? 'is-rin' : 'is-user'}">
            <div class="history-entry-meta">
              <span>${isRin ? 'ІТОШІ РІН' : 'ТИ'}</span>
              <span>${safeMeta}</span>
            </div>
            <div class="history-entry-text">${this.escapeHtml(item.text)}</div>
          </div>
        `;
      }).join('');
    }
    this.historyModal.classList.add('active');
    this.historyModal.setAttribute('aria-hidden', 'false');
  }

  closeHistoryModal() {
    if (!this.historyModal) return;
    this.historyModal.classList.remove('active');
    this.historyModal.setAttribute('aria-hidden', 'true');
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  recordMessage(speaker, text, emotion = 'neutral', source = '') {
    const mins = String(Math.floor(this.callSeconds / 60)).padStart(2, '0');
    const secs = String(this.callSeconds % 60).padStart(2, '0');
    this.history.push({
      speaker,
      text,
      emotion,
      source,
      time: `${mins}:${secs}`
    });
    if (this.history.length > 40) {
      this.history.shift();
    }
  }

  setEmotion(emotionKey, pulse = true) {
    const safeKey = RIN_CALL_EMOTIONS[emotionKey] ? emotionKey : 'neutral';
    const meta = RIN_CALL_EMOTIONS[safeKey];
    const changed = safeKey !== this.currentEmotion;
    this.currentEmotion = safeKey;

    if (this.section) this.section.setAttribute('data-emotion', safeKey);
    if (this.stage) this.stage.setAttribute('data-emotion', safeKey);
    if (this.emotionLabel) this.emotionLabel.textContent = meta.label;

    if (this.layerA && this.layerB) {
      const incoming = this.activeLayer === 'A' ? this.layerB : this.layerA;
      const outgoing = this.activeLayer === 'A' ? this.layerA : this.layerB;

      if (incoming.getAttribute('src') !== meta.src) {
        incoming.src = meta.src;
      }
      incoming.classList.add('is-visible');
      outgoing.classList.remove('is-visible');
      this.activeLayer = this.activeLayer === 'A' ? 'B' : 'A';
    }

    if (pulse && changed && this.stage) {
      this.stage.classList.remove('is-emotion-pulse');
      void this.stage.offsetWidth;
      this.stage.classList.add('is-emotion-pulse');
      if (safeKey === 'flow') {
        this.sfx.playFlowAwaken();
      }
    }

    this.syncFlowGlobalTheme();
  }

  syncFlowGlobalTheme() {
    if (!this.section) return;
    if (this.section.classList.contains('active') && this.onThemeChange) {
      this.onThemeChange('callSection');
    }
  }

  isFlowMoodActive() {
    return this.currentEmotion === 'flow' || this.currentEmotion === 'angry';
  }

  updateRespectUI(delta = 0) {
    this.respect = Math.max(0, Math.min(100, this.respect + delta));
    if (this.respectBar) {
      this.respectBar.style.width = `${this.respect}%`;
    }
    if (this.respectRank) {
      let rank = 'НУДНА ТІНЬ';
      if (this.respect >= 80) rank = 'РІВНИЙ СУПЕРНИК';
      else if (this.respect >= 60) rank = 'ХОЛОДНИЙ ІНТЕРЕС';
      else if (this.respect >= 35) rank = 'ЗНЕВАГА';
      else if (this.respect >= 15) rank = 'ТЕПЛА ВОДА';
      this.respectRank.textContent = rank;
    }
  }

  setPendingState(isPending) {
    this.isRequestPending = isPending;
    if (this.sendBtn) this.sendBtn.disabled = isPending;
    if (this.userInput) this.userInput.disabled = isPending;
    if (this.typingIndicator) {
      this.typingIndicator.textContent = isPending ? 'ІТОШІ РІН ОЦІНЮЄ СЛОВА...' : 'АНАЛІЗ ВІДПОВІДІ...';
      this.typingIndicator.classList.toggle('is-visible', isPending);
    }
    if (this.waveform) {
      this.waveform.classList.toggle('is-speaking', isPending);
    }
  }

  async handleUserMessage(rawText) {
    const text = this.sanitizeUserInput(rawText);
    if (!text) return;

    if (this.isRateLimited()) {
      this.finishTypingImmediately();
      this.presentRinResponse({
        emotion: 'annoyed',
        respectDelta: -2,
        sourceLabel: 'АНТИ-СПАМ ЩИТ',
        reply: 'Припини спамити в канал. Ти тиснеш кнопки швидше, ніж думаєш — заспокойся і формулюй по одному реченню. 😒'
      });
      return;
    }

    this.turnCount += 1;
    this.finishTypingImmediately();
    this.recordMessage('user', text);
    this.setPendingState(true);

    const mode = this.apiUiHidden ? 'local' : this.settings.mode;
    const hasKey = Boolean(this.settings.apiKey);

    try {
      if (mode === 'local') {
        await this.delay(240);
        const localRes = this.resolveLocalReply(text);
        localRes.sourceLabel = 'ЛОКАЛЬНИЙ ІНТЕЛЕКТ';
        this.recordMessage('rin', localRes.reply, localRes.emotion, localRes.sourceLabel);
        this.presentRinResponse(localRes);
        return;
      }

      if (mode === 'gemini' && !hasKey) {
        const noKeyRes = {
          emotion: 'annoyed',
          respectDelta: -2,
          sourceLabel: 'НЕМАЄ КЛЮЧА API',
          reply: 'Ти увімкнув режим Gemini AI, але навіть не вставив API-ключ у налаштуваннях. Натисни «API / РЕЖИМ» зверху і підключи зв’язок — не витрачай мій час даремно.'
        };
        this.recordMessage('rin', noKeyRes.reply, noKeyRes.emotion, noKeyRes.sourceLabel);
        this.presentRinResponse(noKeyRes);
        return;
      }

      if ((mode === 'hybrid' && hasKey) || (mode === 'gemini' && hasKey)) {
        try {
          const aiRes = await this.fetchGeminiReply(text);
          this.recordMessage('rin', aiRes.reply, aiRes.emotion, aiRes.sourceLabel);
          this.presentRinResponse(aiRes);
          return;
        } catch (err) {
          if (mode === 'gemini') {
            const errRes = {
              emotion: 'disgust',
              respectDelta: -3,
              sourceLabel: 'ПОМИЛКА GEMINI',
              reply: `Сигнал через Gemini API зірвався — ${err?.message || 'перевір ключ або квоту в налаштуваннях'}. Відкрий «API / РЕЖИМ» або перемкнися на локальний режим.`
            };
            this.recordMessage('rin', errRes.reply, errRes.emotion, errRes.sourceLabel);
            this.presentRinResponse(errRes);
            return;
          }
          // Hybrid graceful fallback
          const fallbackRes = this.resolveLocalReply(text);
          fallbackRes.sourceLabel = 'ГІБРИД · ЛОКАЛЬНИЙ РЕЗЕРВ';
          this.recordMessage('rin', fallbackRes.reply, fallbackRes.emotion, fallbackRes.sourceLabel);
          this.presentRinResponse(fallbackRes);
          return;
        }
      }

      // Default hybrid without key -> local intelligent engine
      await this.delay(220);
      const localRes = this.resolveLocalReply(text);
      localRes.sourceLabel = 'ГІБРИД · ЛОКАЛЬНИЙ';
      this.recordMessage('rin', localRes.reply, localRes.emotion, localRes.sourceLabel);
      this.presentRinResponse(localRes);
    } finally {
      this.setPendingState(false);
      if (this.userInput) this.userInput.focus();
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Builds valid alternating user/model Gemini contents starting with role "user"
   * and excluding internal UI error notices so multi-turn calls stay clean.
   */
  buildGeminiContents(latestUserText) {
    const ignoredSources = new Set(['ПОМИЛКА GEMINI', 'НЕМАЄ КЛЮЧА API']);
    const recentTurns = this.history
      .slice(-11, -1)
      .filter((entry) => !ignoredSources.has(entry.source) && typeof entry.text === 'string' && entry.text.trim());

    const contents = [];
    for (const entry of recentTurns) {
      const role = entry.speaker === 'user' ? 'user' : 'model';
      const last = contents[contents.length - 1];
      if (last && last.role === role) {
        last.parts[0].text += `\n${entry.text}`;
      } else {
        contents.push({ role, parts: [{ text: entry.text }] });
      }
    }

    if (contents.length > 0 && contents[0].role === 'model') {
      contents.unshift({
        role: 'user',
        parts: [{ text: 'Почати закритий відеодзвінок з Ітоші Ріном.' }]
      });
    }

    const last = contents[contents.length - 1];
    if (last && last.role === 'user') {
      last.parts[0].text += `\n${latestUserText}`;
    } else {
      contents.push({ role: 'user', parts: [{ text: latestUserText }] });
    }
    return contents;
  }

  async fetchGeminiReply(latestUserText) {
    const { apiKey, model } = this.settings;
    const contents = this.buildGeminiContents(latestUserText);

    const systemPrompt = [
      'Ти — Ітоші Рін з аніме та манги Blue Lock, № 10, зірка PXG і головний претендент на трон найкращого нападника.',
      'Зараз користувач спілкується з тобою через прямий зашифрований відеодзвінок на твоєму архів-терміналі.',
      'Жорстко тримай характер Ітоші Ріна: холодний, прямий, безжальний до лінощів і фальші ("тепла вода" / "nurui"), але здатний на тактичну повагу до сильного егоїзму або спалах демонічного Flow Руйнівника при згадці Ітоші Сае чи Ісагі Йоічі.',
      'ЗАВЖДИ відповідай українською мовою. Пиши лаконічно і влучно — 2-4 речення, без рольових зірочок *дія*, без текстових кодів на кшталт :smirk: і без виходу з образу AI-моделлю. За бажанням можеш зрідка додати максимум 1 влучний стандартний емодзі на кшталт ❄️, ⚡, 🔥, 🎯 або 😒.',
      `Поточний рівень поваги до співрозмовника: ${this.respect}/100.`,
      'Поверни відповідь ВИКЛЮЧНО у форматі валідного JSON з трьома полями:',
      '- "emotion": одне з точних значень ["neutral", "annoyed", "disgust", "focused", "intrigued", "smirk", "shocked", "angry", "flow"]',
      '- "respectDelta": ціле число від -10 до 12 залежно від сили, гостроти або тупості репліки користувача',
      '- "reply": текст твоєї репліки українською мовою.'
    ].join('\n');

    const safetySettings = [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_ONLY_HIGH' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_ONLY_HIGH' }
    ];

    const result = await this.callGeminiWithFailover(
      apiKey,
      model,
      (candidateModel) => ({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents,
        safetySettings,
        generationConfig: this.buildGeminiGenConfig(candidateModel, 2048, true)
      }),
      3,
      async (res) => {
        const data = await res.json();
        const candidate = data?.candidates?.[0];
        const parts = Array.isArray(candidate?.content?.parts) ? candidate.content.parts : [];
        const rawText = parts
          .filter((p) => !p?.thought && typeof p?.text === 'string')
          .map((p) => p.text)
          .join('\n')
          .trim();
        if (!rawText) {
          const reason = candidate?.finishReason ? ` (${candidate.finishReason})` : '';
          throw new Error(`Порожня відповідь моделі${reason}`);
        }
        return this.parseGeminiJson(rawText);
      }
    );

    if (!result?.ok || !result.payload) {
      throw new Error(result?.message || 'Не вдалося отримати відповідь від Gemini API');
    }

    const usedModel = result.usedModel || model;
    const parsed = result.payload;
    const validEmotion = RIN_CALL_EMOTIONS[parsed.emotion] ? parsed.emotion : 'neutral';
    const delta = Number.isFinite(parsed.respectDelta)
      ? Math.max(-12, Math.min(15, Math.round(parsed.respectDelta)))
      : 0;

    return {
      emotion: validEmotion,
      respectDelta: delta,
      reply: parsed.reply,
      sourceLabel: `GEMINI · ${usedModel.replace('gemini-', '').toUpperCase()}`
    };
  }

  parseGeminiJson(raw) {
    const cleaned = raw.replace(/^```(?:json)?\s*/i, '').replace(/```$/i, '').trim();
    try {
      const obj = JSON.parse(cleaned);
      if (obj && typeof obj.reply === 'string' && obj.reply.trim()) {
        return obj;
      }
    } catch {
      const match = cleaned.match(/\{[\s\S]*\}/);
      if (match) {
        try {
          const inner = JSON.parse(match[0]);
          if (inner && typeof inner.reply === 'string' && inner.reply.trim()) {
            return inner;
          }
        } catch {
          // Try partial field extraction below for truncated responses
        }
      }
    }

    // Recover fields cleanly if the model truncated JSON before the closing brace
    const emotionMatch = cleaned.match(/"emotion"\s*:\s*"([a-z_]+)"/i);
    const deltaMatch = cleaned.match(/"respectDelta"\s*:\s*(-?\d+)/i);
    const replyMatch = cleaned.match(/"reply"\s*:\s*"((?:[^"\\]|\\.)*)(?:"|$)/);
    if (replyMatch && replyMatch[1].trim()) {
      const unescapedReply = replyMatch[1]
        .replace(/\\n/g, ' ')
        .replace(/\\"/g, '"')
        .replace(/\\\\/g, '\\')
        .replace(/\\+$/, '')
        .trim();
      return {
        emotion: emotionMatch ? emotionMatch[1] : 'neutral',
        respectDelta: deltaMatch ? Number(deltaMatch[1]) : 0,
        reply: unescapedReply
      };
    }

    if (/^\s*\{/.test(cleaned) && /"(?:emotion|respectDelta|reply)"/i.test(cleaned)) {
      throw new Error('Модель повернула неповний JSON без тексту репліки');
    }

    return {
      emotion: 'neutral',
      respectDelta: 0,
      reply: cleaned.replace(/^"|"$/g, '')
    };
  }

  pickFromPool(poolKey, items) {
    if (!this.usedLocalPools[poolKey]) {
      this.usedLocalPools[poolKey] = [];
    }
    const used = this.usedLocalPools[poolKey];
    let availableIdx = items.map((_, i) => i).filter((i) => !used.includes(i));
    if (availableIdx.length === 0) {
      this.usedLocalPools[poolKey] = [];
      availableIdx = items.map((_, i) => i);
    }
    const chosenIndex = availableIdx[Math.floor(Math.random() * availableIdx.length)];
    this.usedLocalPools[poolKey].push(chosenIndex);
    return items[chosenIndex];
  }

  resolveLocalReply(rawText) {
    const q = rawText.toLowerCase().replace(/[’ʼ`]/g, "'").trim();

    // 0. Follow-up continuation on the previous topic
    if (
      this.lastLocalTopic &&
      /^(?:а\s+|і\s+|ну\s+)?(?:ще|далі|що\s+далі|детальніш[а-яіїєґ]*|поясн[а-яіїєґ]*|чому\s+так|розкажи\s+більш[а-яіїєґ]*|продовж[а-яіїєґ]*|про\s+це|як\s+же)(?=$|[^а-яіїєґa-z0-9])/i.test(q)
    ) {
      const prevEntry = RIN_LOCAL_KB.find((item) => item.id === this.lastLocalTopic);
      if (prevEntry && prevEntry.replies.length > 0) {
        return this.pickFromPool(prevEntry.id, prevEntry.replies);
      }
    }

    // 1. Score all matching knowledge entries (characters, moments, weapons, modern life)
    const scored = [];
    for (const entry of RIN_LOCAL_KB) {
      let score = 0;
      for (const rx of entry.patterns) {
        const matches = q.match(new RegExp(rx.source, 'gi'));
        if (matches) {
          score += entry.weight + Math.min(3, matches.length - 1);
        }
      }
      if (score > 0) {
        scored.push({ entry, score });
      }
    }
    scored.sort((a, b) => b.score - a.score);

    // 2. Dual-character or head-to-head comparison (e.g., "Ісагі чи Кайзер", "Сае vs Шідо")
    const matchedChars = scored.filter((s) => s.entry.kind === 'character' && s.entry.compareLine);
    if (
      matchedChars.length >= 2 &&
      (/(?:\s+чи\s+|\bvs\b|\bпроти\b|кращ|сильніш|порівня|разом|між\s+|хто кого|перемож)/i.test(q) ||
        Math.abs(matchedChars[0].score - matchedChars[1].score) <= 2)
    ) {
      const first = matchedChars[0].entry;
      const second = matchedChars[1].entry;
      this.lastLocalTopic = first.id;
      return {
        emotion: 'focused',
        respectDelta: 4,
        reply: `${first.compareLine} Щодо другого — ${second.compareLine} Але змушувати мене міряти їх лінійкою марно: під моїм тиском обидва змушені ламатись. ❄️`
      };
    }

    // 3. Best structured topic match
    if (scored.length > 0) {
      const winner = scored[0].entry;
      this.lastLocalTopic = winner.id;
      return this.pickFromPool(winner.id, winner.replies);
    }

    // 4. Provocation / 1v1 challenge / Insult
    if (/(1 на 1|1v1|дуел|слаб|боїш|лох|туп|дур|ідіот|переможу|кращий за теб|нуб|гірш)/.test(q)) {
      return this.pickFromPool('challenge', [
        {
          emotion: 'disgust',
          respectDelta: -9,
          reply: 'Твій тон фальшивий наскрізь, а ти лізеш у дуель 1 на 1? «Nurui» — огидна тепла вода. Спробуй спершу не зламатись від мого погляду. 😒'
        },
        {
          emotion: 'angry',
          respectDelta: -6,
          reply: 'Добре, ти привернув мою увагу. Виходь на поле — і я розмажу твоє самолюбство по газону раніше, ніж ти встигнеш торкнутися м’яча вдруге. 💢'
        },
        {
          emotion: 'smirk',
          respectDelta: 3,
          reply: 'Голосиш гучно. Побачимо, чи лишиться в тебе бодай грам сміливості, коли мій підкручений удар просвистить повз твоє вухо в дев’ятку.'
        }
      ]);
    }

    // 5. Evaluate user / Respect level
    if (/(оціни|як я|який у мене|хто я|тепла вода|nurui|поважа)/.test(q)) {
      if (this.respect >= 65) {
        return {
          emotion: 'smirk',
          respectDelta: 2,
          reply: 'Не чекай похвали. У тебе принаймні вистачає мозку не верзти дурниць і тримати удар. Для спарингу ще зарано, але на відміну від решти ти не схожий на дешеву маріонетку.'
        };
      }
      if (this.respect < 25) {
        return {
          emotion: 'disgust',
          respectDelta: -4,
          reply: 'Моя оцінка? Нуль ваги, самі балачки й тепла вода. Якщо це твій максимум — ти навіть на лавку запасних у моїй тіні не заслуговуєш. 😒'
        };
      }
      return {
        emotion: 'focused',
        respectDelta: 1,
        reply: 'Поки що ти ніщо — сіра межа між посередністю і тим, хто хоча б намагається дихати в темпі Blue Lock. Хочеш іншої оцінки — доведи ділом, а не випрошуй вердикт.'
      };
    }

    // 6. Compliments / Praise
    if (/(крут|найкращ|легенд|геній|топ|красен|поваг|любл|респект|ідеал|крас)/.test(q)) {
      return this.pickFromPool('praise', [
        {
          emotion: 'annoyed',
          respectDelta: 0,
          reply: 'Забери свої лестощі. Оплески натовпу ніколи не забивали голів — це просто фоновий шум для слабаків. 😒'
        },
        {
          emotion: 'neutral',
          respectDelta: 2,
          reply: 'Звичайно, я кращий. Мені не потрібне чуже підтвердження факту, який я і так доводжу на кожному полі. ❄️'
        },
        {
          emotion: 'disgust',
          respectDelta: -1,
          reply: 'Якщо шукаєш кумира для постерів — помилився номером. Я не граю для твого задоволення.'
        }
      ]);
    }

    // 7. Deep philosophical / personal motivation
    if (/(сенс|чому ти|мрі|фінал|боїшся|смерт|правд|секрет|бог|душа)/.test(q)) {
      return this.pickFromPool('shock', [
        {
          emotion: 'flow',
          respectDelta: 6,
          reply: 'Сенс? Мій сенс не в трофеях і не в дешевому захопленні. Я живу лише заради миті, коли втискаю найкращого гравця світу обличчям у його ж безсилля. 🩸'
        },
        {
          emotion: 'focused',
          respectDelta: 4,
          reply: 'Футбол для мене — не спорт і не мрія. Це поле бою, де або ти ламаєш інших своїм его, або тебе перетворюють на пил.'
        }
      ]);
    }

    // 8. Greetings
    if (/^(?:привіт|хай|здоров|добрий|алло|салют|йо|hello|hi)(?=$|[^а-яіїєґa-z0-9])/.test(q)) {
      if (this.respect >= 55) {
        return {
          emotion: 'neutral',
          respectDelta: 1,
          reply: 'Знову ти. Принаймні не дратуєш із першої секунди. Говори, що там у тебе. ❄️'
        };
      }
      return this.pickFromPool('greet', [
        {
          emotion: 'annoyed',
          respectDelta: 0,
          reply: 'Чого? Якщо подзвонив просто привітатись — одразу поклади слухавку.'
        },
        {
          emotion: 'neutral',
          respectDelta: 0,
          reply: 'Тридцять секунд до вечірнього стретчингу. Не тягни гуму — кажи, навіщо дзвониш.'
        }
      ]);
    }

    // 9. Farewell
    if (/(бувай|пока|папа|до зустрічі|відбій|кінець|виходжу)/.test(q)) {
      return {
        emotion: 'neutral',
        respectDelta: 0,
        reply: 'Йди. І не повертайся, поки не станеш хоч трохи небезпечнішим за самого себе вчорашнього. Відбій. ❄️'
      };
    }

    // 10. Conversational advice / life / dynamic fallback
    return this.buildDynamicLocalFallback(rawText);
  }

  buildDynamicLocalFallback(rawText) {
    const q = rawText.toLowerCase();

    if (/(?:чи варто|порад|що робити|як мені|як краще|як стати|допомож)/.test(q)) {
      return this.pickFromPool('adviceFallback', [
        {
          emotion: 'annoyed',
          respectDelta: -1,
          reply: 'Ти дзвониш мені по інструкцію до життя? Я тобі не нянька. Відсічи все слабке, прийми удар на себе і роби справу. Якщо шукаєш гарантій — ти вже програв.'
        },
        {
          emotion: 'focused',
          respectDelta: 2,
          reply: 'Коли сумніваєшся, чи варто ризикувати — відповідь завжди одна: посередність обирає безпеку. А потім гине в натовпі. Обирай найжорсткіший шлях або сиди мовчки.'
        }
      ]);
    }

    if (rawText.includes('!')) {
      return this.pickFromPool('exclaim', [
        {
          emotion: 'angry',
          respectDelta: -2,
          reply: 'Стули рота і прибери істерику. Крик без точності — ознака того, що ти втрачаєш контроль. 💢'
        },
        {
          emotion: 'annoyed',
          respectDelta: -1,
          reply: 'Порожні крики звучать жалюгідно. Або говори холодно, або вимикай мікрофон. 😒'
        }
      ]);
    }

    if (rawText.includes('?') || /^(?:хто|що|де|коли|чому|як|навіщо|скільки)(?=$|[^а-яіїєґa-z0-9])/i.test(q)) {
      return this.pickFromPool('questionFallback', [
        {
          emotion: 'annoyed',
          respectDelta: 0,
          reply: 'Розмитий набір слів. Назви конкретно — Сае, Ісагі, матч, момент або свою проблему. Я не збираюся вгадувати, що в тебе в голові.'
        },
        {
          emotion: 'focused',
          respectDelta: 1,
          reply: 'Не розтягуй. Кидай точну ціль — ім’я, епізод або питання по суті. Все інше — просто шум.'
        }
      ]);
    }

    return this.pickFromPool('generic', [
      {
        emotion: 'disgust',
        respectDelta: -2,
        reply: 'Тепла вода. Твої слова не несуть жодної гостроти. Якщо не маєш що сказати про себе, Blue Lock або реальну боротьбу — не витрачай мій ресурс. 😒'
      },
      {
        emotion: 'annoyed',
        respectDelta: -1,
        reply: 'Фоновий шум. Скажи прямо, хто чи що тебе цікавить, і перестань ходити колами.'
      },
      {
        emotion: 'neutral',
        respectDelta: 0,
        reply: 'Я не слухаю порожні репліки. Дай конкретну тему — будь-кого з гравців, ключовий момент чи реальний виклик — тоді поговоримо. ❄️'
      }
    ]);
  }

  presentRinResponse({ emotion, reply, sourceLabel, respectDelta }) {
    this.setEmotion(emotion, true);
    this.updateRespectUI(respectDelta);
    if (this.sourceTag) this.sourceTag.textContent = sourceLabel || 'СИСТЕМА';
    this.typeText(reply);
  }

  typeText(text) {
    this.finishTypingImmediately();
    this.fullCurrentText = text;
    if (!this.dialogueText) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      this.dialogueText.textContent = text;
      return;
    }

    this.dialogueText.textContent = '';
    this.dialogueText.classList.add('is-typing');
    if (this.skipTypingBtn) this.skipTypingBtn.hidden = false;
    if (this.waveform) this.waveform.classList.add('is-speaking');

    const chars = Array.from(text);
    let idx = 0;
    const isFlow = this.currentEmotion === 'flow' || this.currentEmotion === 'angry';

    this.typingTimer = setInterval(() => {
      idx += 1;
      this.dialogueText.textContent = chars.slice(0, idx).join('');
      if (idx % 4 === 1) {
        this.sfx.playCallTick(isFlow);
      }
      if (idx >= chars.length) {
        this.finishTypingImmediately();
      }
    }, 18);
  }

  finishTypingImmediately() {
    if (this.typingTimer) {
      clearInterval(this.typingTimer);
      this.typingTimer = null;
    }
    if (this.dialogueText && this.fullCurrentText) {
      this.dialogueText.textContent = this.fullCurrentText;
      this.dialogueText.classList.remove('is-typing');
    }
    if (this.skipTypingBtn) this.skipTypingBtn.hidden = true;
    if (this.waveform && !this.isRequestPending) this.waveform.classList.remove('is-speaking');
  }
}

// SITE PORTAL CONTROLLER
// -------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  const sfx = new SoundManager();

  // Navigation Links
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.content-section');
  let callCtrl = null;

  function syncFlowThemeState(activeSectionId) {
    const activeWeaponId = document.querySelector('.weapon-card.active-weapon')?.getAttribute('data-weapon-id');
    const weaponsFlow = activeSectionId === 'weaponsSection' && activeWeaponId === 'flow';
    const gameFlow = activeSectionId === 'gameSection' && window.gameSim && window.gameSim.flowActive;
    const callFlow = activeSectionId === 'callSection' && callCtrl && callCtrl.isFlowMoodActive();
    document.body.classList.toggle('flow-mode-active', Boolean(weaponsFlow || gameFlow || callFlow));
  }

  callCtrl = new RinCallController(sfx, syncFlowThemeState);

  function switchSection(targetId) {
    sections.forEach(sec => {
      sec.classList.remove('active');
      if (sec.id === targetId) sec.classList.add('active');
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-target') === targetId) link.classList.add('active');
    });

    syncFlowThemeState(targetId);
    if (targetId === 'gameSection' && window.gameSim) {
      window.gameSim.handleResize();
    }
    if (callCtrl) {
      if (targetId === 'callSection') callCtrl.onSectionEnter();
      else callCtrl.onSectionLeave();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    sfx.playClick();
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const target = link.getAttribute('data-target');
      switchSection(target);
    });
  });

  // Jump CTA Buttons
  document.querySelectorAll('[data-jump]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-jump');
      switchSection(target);
    });
  });

  // Sound Toggle
  const soundBtn = document.getElementById('soundToggleBtn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      const isNowOn = sfx.toggle();
      const label = soundBtn.querySelector('.sound-label');
      const icon = soundBtn.querySelector('.sound-icon');
      if (isNowOn) {
        label.textContent = 'SFX: ON';
        icon.textContent = '🔊';
        sfx.playClick();
      } else {
        label.textContent = 'SFX: OFF';
        icon.textContent = '🔇';
      }
    });
  }

  // Timeline Category Filtering
  const timelineFilters = document.querySelectorAll('.t-filter-btn');
  const timelineItems = document.querySelectorAll('.timeline-item');

  timelineFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      sfx.playClick();
      const filter = btn.getAttribute('data-filter');

      timelineFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      timelineItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // -------------------------------------------------------------
  // GALLERY INTERACTIVE MOMENTS MODAL CONTROLLER
  // -------------------------------------------------------------
  const galleryModal = document.getElementById('galleryModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalImg = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalCanonTag = document.getElementById('modalCanonTag');
  const modalEgoBadge = document.getElementById('modalEgoBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalQuoteText = document.getElementById('modalQuoteText');
  const modalQuoteContext = document.getElementById('modalQuoteContext');
  const modalEventNarrative = document.getElementById('modalEventNarrative');
  const modalTacticalImpact = document.getElementById('modalTacticalImpact');
  const modalChipEgo = document.getElementById('modalChipEgo');
  const modalChipRival = document.getElementById('modalChipRival');
  const prevMomentBtn = document.getElementById('prevMomentBtn');
  const nextMomentBtn = document.getElementById('nextMomentBtn');
  const momentCounterText = document.getElementById('momentCounterText');

  let activeMomentIndex = 0;

  function renderMoment(idx) {
    if (idx < 0) idx = GALLERY_MOMENTS.length - 1;
    if (idx >= GALLERY_MOMENTS.length) idx = 0;
    activeMomentIndex = idx;

    const data = GALLERY_MOMENTS[idx];
    if (!data) return;

    if (modalImg) {
      modalImg.classList.remove('moment-switch-anim');
      void modalImg.offsetWidth;
      modalImg.src = data.img;
      modalImg.alt = data.title;
      modalImg.classList.add('moment-switch-anim');
    }
    if (modalBadge) modalBadge.textContent = data.badge;
    if (modalCanonTag) modalCanonTag.textContent = data.canon;
    if (modalEgoBadge) modalEgoBadge.textContent = data.egoBadge || "CANON LORE";
    if (modalTitle) modalTitle.textContent = data.title;
    if (modalQuoteText) modalQuoteText.textContent = data.quote;
    if (modalQuoteContext) modalQuoteContext.textContent = data.context;
    if (modalEventNarrative) modalEventNarrative.textContent = data.narrative;
    if (modalTacticalImpact) modalTacticalImpact.textContent = data.tactical;
    if (modalChipEgo) modalChipEgo.textContent = data.egoStatus;
    if (modalChipRival) modalChipRival.textContent = data.rival;
    if (momentCounterText) {
      momentCounterText.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(GALLERY_MOMENTS.length).padStart(2, '0')}`;
    }
  }

  function openMomentModal(idx) {
    renderMoment(idx);
    if (galleryModal) {
      galleryModal.classList.add('active');
      galleryModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
    sfx.playClick();
  }

  function closeMomentModal() {
    if (galleryModal) {
      galleryModal.classList.remove('active');
      galleryModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    sfx.playClick();
  }

  // Click on gallery cards
  const momentCards = document.querySelectorAll('.interactive-moment');
  momentCards.forEach((card, idx) => {
    card.addEventListener('click', () => {
      const cardIdx = card.getAttribute('data-moment-index');
      const targetIdx = cardIdx !== null ? parseInt(cardIdx, 10) : idx;
      openMomentModal(targetIdx);
    });
  });

  // Modal navigation controls
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeMomentModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeMomentModal);
  if (prevMomentBtn) {
    prevMomentBtn.addEventListener('click', () => {
      renderMoment(activeMomentIndex - 1);
      sfx.playClick();
    });
  }
  if (nextMomentBtn) {
    nextMomentBtn.addEventListener('click', () => {
      renderMoment(activeMomentIndex + 1);
      sfx.playClick();
    });
  }

  // Keyboard controls (Esc, ArrowLeft, ArrowRight)
  window.addEventListener('keydown', (e) => {
    if (!galleryModal || !galleryModal.classList.contains('active')) return;
    if (e.key === 'Escape') {
      closeMomentModal();
    } else if (e.key === 'ArrowLeft') {
      renderMoment(activeMomentIndex - 1);
      sfx.playClick();
    } else if (e.key === 'ArrowRight') {
      renderMoment(activeMomentIndex + 1);
      sfx.playClick();
    }
  });

  // Initialize Ambient Rin FX
  const ambientCanvas = document.getElementById('rinAmbientCanvas');
  if (ambientCanvas) {
    window.rinAmbientFX = new RinAmbientFX(ambientCanvas);
  }

  // Initialize Canvas Game Simulator
  const canvas = document.getElementById('gameCanvas');
  if (canvas) {
    window.gameSim = new RaylibCanvasSimulator(canvas, sfx);
  }

  // Initialize Embedded Quiz
  window.embeddedQuiz = new EmbeddedQuizApp(sfx);


  // -------------------------------------------------------------
  // INTERACTIVE WEAPON DETAIL & CANONICAL MOMENTS CONTROLLER
  // -------------------------------------------------------------
  const weaponCards = document.querySelectorAll('.weapon-card');
  const weaponDetailPanel = document.getElementById('weaponDetailPanel');

  function renderWeaponDetail(weaponId) {
    if (!weaponDetailPanel) return;
    const data = WEAPONS_DATA[weaponId] || WEAPONS_DATA.curve;

    // Toggle flow-theme styling
    if (data.isFlow) {
      weaponDetailPanel.classList.add('flow-theme');
    } else {
      weaponDetailPanel.classList.remove('flow-theme');
    }
    const activeSec = document.querySelector('.content-section.active')?.id;
    syncFlowThemeState(activeSec);

    // Trigger smooth fade animation
    weaponDetailPanel.style.animation = 'none';
    void weaponDetailPanel.offsetWidth;
    weaponDetailPanel.style.animation = 'weaponDetailReveal 0.48s cubic-bezier(0.16, 1, 0.3, 1) forwards';

    const statsHtml = data.stats.map(st => `
      <div class="stat-bar-group">
        <div class="stat-bar-header">
          <span class="stat-bar-name">${st.name}</span>
          <span class="stat-bar-val">${st.val}</span>
        </div>
        <div class="stat-bar-track">
          <div class="stat-bar-fill" style="width: ${st.fill}%;"></div>
        </div>
      </div>
    `).join('');

    const mechanicsHtml = data.mechanics.map(m => `
      <div class="mech-item">
        <div class="mech-title">// ${m.title}</div>
        <div class="mech-desc">${m.desc}</div>
      </div>
    `).join('');

    const momentsHtml = data.moments.map(mom => `
      <div class="weapon-moment-card" data-gallery-idx="${mom.galleryIndex}">
        <div class="weapon-moment-img-wrap">
          <img src="${mom.img}" alt="${mom.title}" class="weapon-moment-img" decoding="async">
          <span class="weapon-moment-ch-tag">${mom.canon}</span>
        </div>
        <div class="weapon-moment-body">
          <div class="weapon-moment-name">${mom.title}</div>
          <div class="weapon-moment-narrative">${mom.narrative}</div>
          <div class="weapon-moment-quote">${mom.quote}</div>
          <button class="open-moment-in-gallery-btn" data-gallery-idx="${mom.galleryIndex}">
            <span>🔍 РОЗГОРНУТИ В ГАЛЕРЕЇ</span>
          </button>
        </div>
      </div>
    `).join('');

    weaponDetailPanel.innerHTML = `
      <div class="weapon-detail-header">
        <div class="weapon-detail-meta-bar">
          <span class="weapon-detail-hud-badge">${data.hudBadge}</span>
          <span class="weapon-active-pill">АКТИВНИЙ АНАЛІЗ</span>
        </div>
        <h3 class="weapon-detail-title">${data.name}</h3>
        <p class="weapon-detail-sub">${data.sub}</p>
        <div class="weapon-detail-quote">${data.quote}</div>
      </div>

      <div class="weapon-tactical-grid">
        <div class="weapon-mech-box">
          ${mechanicsHtml}
        </div>
        <div class="weapon-stats-box">
          ${statsHtml}
        </div>
      </div>

      <div class="weapon-moments-section">
        <h4 class="weapon-moments-title">КАНОНІЧНІ МОМЕНТИ ВИКОРИСТАННЯ В АНІМЕ ТА МАНЗІ</h4>
        <div class="weapon-moments-grid">
          ${momentsHtml}
        </div>
      </div>
    `;
  }

  // Single delegated click handler so card + inner button don't double-open the modal
  if (weaponDetailPanel) {
    weaponDetailPanel.addEventListener('click', (e) => {
      const target = e.target.closest('[data-gallery-idx]');
      if (!target) return;
      const idx = parseInt(target.getAttribute('data-gallery-idx'), 10);
      if (!isNaN(idx)) {
        openMomentModal(idx);
      }
    });
  }

  // Weapon card selection
  weaponCards.forEach(card => {
    card.addEventListener('click', () => {
      const weaponId = card.getAttribute('data-weapon-id');
      weaponCards.forEach(c => c.classList.remove('active-weapon'));
      card.classList.add('active-weapon');
      renderWeaponDetail(weaponId);
      sfx.playClick();
    });

    // Keyboard navigation (Enter / Space)
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Initial render of first weapon
  if (weaponDetailPanel) {
    renderWeaponDetail('curve');
  }

});
