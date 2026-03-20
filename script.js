gsap.registerPlugin(CustomEase);
CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");
CustomEase.create("back", "M0,0 C0.34,1.4 0.64,1 1,1");

// ===== CUSTOM CURSOR =====
const cursorDot  = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    gsap.to(cursorDot,  { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
    gsap.to(cursorRing, { x: mouseX, y: mouseY, duration: 0.22, ease: 'power2.out' });
});

document.querySelectorAll('a, button, .side-dot, .tool-tag, .tool-tag-cyan, .social-btn, .social-btn-cyan').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ===== SECTION COUNTER =====
const sectionNum = document.getElementById('sectionNum');
function updateCounter(i) {
    if (!sectionNum) return;
    gsap.to(sectionNum, { y: -10, opacity: 0, duration: 0.2, ease: 'power2.in',
        onComplete: () => {
            sectionNum.textContent = String(i + 1).padStart(2, '0');
            gsap.fromTo(sectionNum, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' });
        }
    });
}

// ===== STATE =====
const wrapper  = document.getElementById('scrollWrapper');
const sections = document.querySelectorAll('.snap-section');
const sideDots = document.querySelectorAll('.side-dot');
const navLinks = document.querySelectorAll('.nav-link');
const navbar   = document.getElementById('navbar');
let current = 0;
let busy = false;

// ===== TYPEWRITER =====
function typewrite(el, text, speed = 60, cb) {
    el.textContent = '';
    let i = 0;
    const iv = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) { clearInterval(iv); if (cb) cb(); }
    }, speed);
    return iv;
}

// ===== TEXT SCRAMBLE =====
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';
function scramble(el, finalText, duration = 1200) {
    const frames = Math.floor(duration / 40);
    let frame = 0;
    const iv = setInterval(() => {
        const progress = frame / frames;
        let result = '';
        for (let i = 0; i < finalText.length; i++) {
            if (i < Math.floor(progress * finalText.length)) {
                result += finalText[i];
            } else {
                result += finalText[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
            }
        }
        el.textContent = result;
        frame++;
        if (frame > frames) { el.textContent = finalText; clearInterval(iv); }
    }, 40);
}

// ===== TOOL TAG + SOCIAL GLOW (GSAP — fires on section enter) =====
function glowSequence(selector, colorObj) {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
        const delay = 0.9 + i * 0.18;
        gsap.to(el, {
            keyframes: [
                { duration: 0,    ...colorObj.base },
                { duration: 0.55, ...colorObj.peak, ease: 'power2.out', delay },
                { duration: 0.55, ...colorObj.base, ease: 'power2.in' }
            ]
        });
    });
}

const purpleBase = { backgroundColor:'rgba(108,99,255,0.06)', borderColor:'rgba(108,99,255,0.3)',  color:'#6c63ff', y:0,  boxShadow:'none' };
const purplePeak = { backgroundColor:'rgba(108,99,255,0.22)', borderColor:'rgba(108,99,255,0.9)',  color:'#fff',    y:-5, boxShadow:'0 10px 28px rgba(108,99,255,0.45)' };
const cyanBase   = { backgroundColor:'rgba(0,212,255,0.06)',  borderColor:'rgba(0,212,255,0.3)',   color:'#00d4ff', y:0,  boxShadow:'none' };
const cyanPeak   = { backgroundColor:'rgba(0,212,255,0.25)',  borderColor:'rgba(0,212,255,0.9)',   color:'#fff',    y:-5, boxShadow:'0 10px 28px rgba(0,212,255,0.45)' };

const socialPurpleBase = { backgroundColor:'rgba(108,99,255,0.05)', borderColor:'rgba(108,99,255,0.25)', color:'rgba(255,255,255,0.35)', y:0,  boxShadow:'none' };
const socialPurplePeak = { backgroundColor:'rgba(108,99,255,0.2)',  borderColor:'rgba(108,99,255,0.8)',  color:'#fff',                  y:-7, boxShadow:'0 12px 30px rgba(108,99,255,0.5)' };
const socialCyanBase   = { backgroundColor:'rgba(0,212,255,0.05)',  borderColor:'rgba(0,212,255,0.25)',  color:'rgba(255,255,255,0.35)', y:0,  boxShadow:'none' };
const socialCyanPeak   = { backgroundColor:'rgba(0,212,255,0.2)',   borderColor:'rgba(0,212,255,0.8)',   color:'#fff',                  y:-7, boxShadow:'0 12px 30px rgba(0,212,255,0.5)' };

function fireGlowM1() {
    glowSequence('#m1Tools .tool-auto',   { base: purpleBase, peak: purplePeak });
    glowSequence('#m1Links .social-btn',  { base: socialPurpleBase, peak: socialPurplePeak });
}
function fireGlowM2() {
    glowSequence('#m2Tools .tool-auto-cyan',  { base: cyanBase, peak: cyanPeak });
    glowSequence('#m2Links .social-btn-cyan', { base: socialCyanBase, peak: socialCyanPeak });
}
function splitChars(el) {
    const text = el.textContent;
    el.innerHTML = '';
    return [...text].map(ch => {
        const s = document.createElement('span');
        s.className = 'char';
        s.textContent = ch === ' ' ? '\u00A0' : ch;
        el.appendChild(s);
        return s;
    });
}

// ===== CONSTELLATION / DOT NETWORK (Hero background) =====
let constellationAnim = null;
function spawnConstellation() {
    const container = document.getElementById('heroFloatWords');
    if (!container) return;
    container.innerHTML = '';

    const W = window.innerWidth, H = window.innerHeight;
    const COUNT = 60;
    const dots = [];

    // Create SVG canvas
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.cssText = 'position:absolute;inset:0;pointer-events:none;';
    container.appendChild(svg);

    // Create dot elements + data
    for (let i = 0; i < COUNT; i++) {
        const x = Math.random() * W;
        const y = Math.random() * H;
        const vx = (Math.random() - 0.5) * 0.4;
        const vy = (Math.random() - 0.5) * 0.4;
        const r = Math.random() * 1.5 + 0.5;
        const isPurple = Math.random() > 0.5;

        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', r);
        circle.setAttribute('fill', isPurple ? 'rgba(108,99,255,0.7)' : 'rgba(0,212,255,0.5)');
        svg.appendChild(circle);

        dots.push({ x, y, vx, vy, el: circle });
    }

    // Create line pool
    const MAX_LINES = 80;
    const lines = [];
    for (let i = 0; i < MAX_LINES; i++) {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('stroke', 'rgba(108,99,255,0.12)');
        line.setAttribute('stroke-width', '0.8');
        svg.insertBefore(line, svg.firstChild);
        lines.push(line);
    }

    const CONNECT_DIST = 130;
    let lineIdx = 0;

    function tick() {
        lineIdx = 0;
        // hide all lines first
        lines.forEach(l => l.setAttribute('stroke-opacity', '0'));

        for (let i = 0; i < COUNT; i++) {
            const d = dots[i];
            d.x += d.vx;
            d.y += d.vy;
            if (d.x < 0) d.x = W;
            if (d.x > W) d.x = 0;
            if (d.y < 0) d.y = H;
            if (d.y > H) d.y = 0;
            d.el.setAttribute('cx', d.x);
            d.el.setAttribute('cy', d.y);

            for (let j = i + 1; j < COUNT; j++) {
                if (lineIdx >= MAX_LINES) break;
                const dx = dots[j].x - d.x;
                const dy = dots[j].y - d.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < CONNECT_DIST) {
                    const alpha = (1 - dist / CONNECT_DIST) * 0.18;
                    const l = lines[lineIdx++];
                    l.setAttribute('x1', d.x); l.setAttribute('y1', d.y);
                    l.setAttribute('x2', dots[j].x); l.setAttribute('y2', dots[j].y);
                    l.setAttribute('stroke', 'rgba(108,99,255,1)');
                    l.setAttribute('stroke-opacity', alpha);
                }
            }
        }
        constellationAnim = requestAnimationFrame(tick);
    }
    tick();
}

// ===== FLOATING PARTICLES =====
function spawnParticles(container, count, color) {
    container.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 3 + 1;
        p.className = 'particle';
        p.style.cssText = `
            width:${size}px; height:${size}px;
            background:${color};
            left:${Math.random()*100}%;
            top:${Math.random()*100}%;
            opacity:${Math.random()*0.4+0.1};
        `;
        container.appendChild(p);
        gsap.to(p, {
            y: -(Math.random()*120+40),
            x: (Math.random()-0.5)*60,
            opacity: 0,
            duration: Math.random()*6+4,
            ease: 'none',
            repeat: -1,
            delay: Math.random()*4,
            repeatDelay: Math.random()*2
        });
    }
}

// ===== IMAGE AUTO-FLOAT =====
function startFloat(el, amplitude = 12) {
    gsap.killTweensOf(el);
    gsap.to(el, {
        y: -amplitude,
        duration: 3 + Math.random(),
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}

// ===== IMAGE AUTO COLOR SHIFT =====
function startImgColorShift(selector, accent) {
    const el = document.querySelector(selector);
    if (!el) return;
    const isPurple = accent === 'purple';
    // oscillate between slight grayscale and full color with a tint
    gsap.to(el, {
        filter: isPurple
            ? 'grayscale(0%) contrast(1.12) brightness(1.08) saturate(1.2)'
            : 'grayscale(0%) contrast(1.12) brightness(1.08) saturate(1.3)',
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        repeatDelay: 0.5
    });
}

// ===== MOUSE PARALLAX =====
document.addEventListener('mousemove', (e) => {
    if (current !== 2 && current !== 3) return;
    const id = current === 2 ? 'm1Img' : 'm2Img';
    const el = document.getElementById(id);
    if (!el) return;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    gsap.to(el, {
        rotateY: dx * 6,
        rotateX: -dy * 4,
        duration: 1,
        ease: 'power2.out',
        transformPerspective: 900,
        overwrite: 'auto'
    });
});

// ===== UPDATE NAV / DOTS =====
function updateUI(i) {
    sideDots.forEach((d, idx) => {
        const active = idx === i;
        d.classList.toggle('active', active);
        gsap.to(d, { height: active ? 32 : 12, duration: 0.4, ease: 'expo' });
        d.style.background = active ? '#6c63ff' : 'rgba(255,255,255,0.2)';
    });
    navLinks.forEach((l, idx) => l.classList.toggle('active', idx === i));
    navbar.classList.toggle('solid', i > 0);
    updateCounter(i);
}

// ===== SECTION ANIMATIONS =====
function animateIn(index) {

    // ---- HERO ----
    if (index === 0) {
        spawnParticles(document.getElementById('heroParticles'), 50, 'rgba(108,99,255,0.7)');
        spawnConstellation();

        // TEAM label
        gsap.fromTo('#heroTeamLabel',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'expo', delay: 0.3 }
        );
        gsap.fromTo('#heroTitle',
            { y: '110%', opacity: 0 },
            { y: '0%', opacity: 1, duration: 1.2, ease: 'expo', delay: 0.5 }
        );
        setTimeout(() => {
            typewrite(document.getElementById('heroType'), 'Front End Web Developers', 55);
        }, 1000);
        gsap.fromTo('#heroHint', { opacity: 0 }, { opacity: 1, duration: 1, delay: 2.5 });

        // aurora orbs float
        gsap.to('#orb1', { x: 60, y: -40, duration: 9, ease: 'sine.inOut', yoyo: true, repeat: -1 });
        gsap.to('#orb2', { x: -50, y: 60, duration: 11, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 2 });
        gsap.to('#orb3', { x: 30, y: -50, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1 });

        // cursor blink
        gsap.to('.type-cursor', { opacity: 0, duration: 0.5, ease: 'none', yoyo: true, repeat: -1 });
    }

    // ---- ABOUT ----
    if (index === 1) {
        // accent lines
        gsap.fromTo('#aboutLineTop', { width: '0%' }, { width: '60%', duration: 1.4, ease: 'expo', delay: 0.1 });
        gsap.fromTo('#aboutLineBot', { width: '0%' }, { width: '40%', duration: 1.4, ease: 'expo', delay: 0.3 });

        // bg word
        gsap.fromTo('#aboutBgWord',
            { opacity: 0, scale: 1.15 },
            { opacity: 1, scale: 1, duration: 1.8, ease: 'expo', delay: 0.1 }
        );
        // label
        gsap.fromTo('#aboutLabel',
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'expo', delay: 0.25 }
        );
        // title — scale + blur dramatic reveal
        gsap.fromTo('#aboutTitle',
            { y: '80%', opacity: 0, scale: 1.15, filter: 'blur(12px)' },
            { y: '0%', opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo', delay: 0.4 }
        );
        // code block
        gsap.fromTo('#aboutCode',
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'expo', delay: 0.65,
              onComplete: () => {
                  // typewriter inside code block
                  const el = document.getElementById('aboutTypeCode');
                  if (el) typewrite(el, 'building the web...', 60);
              }
            }
        );
        // desc
        gsap.fromTo('#aboutDesc',
            { x: 30, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, ease: 'expo', delay: 0.55 }
        );
        // stat cards stagger
        gsap.fromTo(['#aboutStat1','#aboutStat2','#aboutStat3'],
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'back', stagger: 0.12, delay: 0.75,
              onComplete: () => {
                  // count up numbers
                  document.querySelectorAll('.about-stat-num').forEach(el => {
                      const target = +el.dataset.target;
                      let n = 0;
                      const step = Math.ceil(target / 20);
                      const iv = setInterval(() => {
                          n = Math.min(n + step, target);
                          el.textContent = String(n).padStart(2, '0');
                          if (n >= target) clearInterval(iv);
                      }, 50);
                  });
              }
            }
        );
        // marquee fade in
        gsap.fromTo('#aboutMarquee',
            { opacity: 0 },
            { opacity: 1, duration: 0.8, delay: 1.1 }
        );
    }

    // ---- MEMBER 1 ----
    if (index === 2) {
        gsap.fromTo('#m1BgText',
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.8, ease: 'expo' }
        );
        gsap.set('#m1Img', { opacity: 1 });
        gsap.fromTo('#m1Img',
            { clipPath: 'inset(0 100% 0 0)', scale: 1.08 },
            { clipPath: 'inset(0 0% 0 0)', scale: 1, duration: 1.1, ease: 'expo', delay: 0.15,
              onComplete: () => {
                  startFloat(document.getElementById('m1Img'));
                  startImgColorShift('#m1Img img', 'purple');
              }
            }
        );
        gsap.fromTo('#m1Info',
            { x: window.innerWidth < 769 ? 0 : 60, y: window.innerWidth < 769 ? 30 : 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'expo', delay: 0.3 }
        );
        // split-char stagger for name
        const m1NameChars = splitChars(document.getElementById('m1Name'));
        gsap.fromTo(m1NameChars,
            { y: 80, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: 'expo', stagger: 0.04, delay: 0.5,
              transformOrigin: 'bottom center' }
        );
        const m1LastChars = splitChars(document.getElementById('m1Last'));
        gsap.fromTo(m1LastChars,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo', stagger: 0.05, delay: 0.75 }
        );
        gsap.fromTo('#m1Tools .tool-tag',
            { y: 20, opacity: 0, scale: 0.88 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back', stagger: 0.06, delay: 0.85 }
        );
        gsap.fromTo('#m1Links .social-btn',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'back', stagger: 0.1, delay: 1.35 }
        );
        setTimeout(fireGlowM1, 1200);
    }

    // ---- MEMBER 2 ----
    if (index === 3) {
        gsap.fromTo('#m2BgText',
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.8, ease: 'expo' }
        );
        gsap.set('#m2Img', { opacity: 1 });
        gsap.fromTo('#m2Img',
            { clipPath: 'inset(0 0 0 100%)', scale: 1.08 },
            { clipPath: 'inset(0 0 0 0%)', scale: 1, duration: 1.1, ease: 'expo', delay: 0.15,
              onComplete: () => {
                  startFloat(document.getElementById('m2Img'));
                  startImgColorShift('#m2Img img', 'cyan');
              }
            }
        );
        gsap.fromTo('#m2Info',
            { x: window.innerWidth < 769 ? 0 : -60, y: window.innerWidth < 769 ? 30 : 0, opacity: 0 },
            { x: 0, y: 0, opacity: 1, duration: 0.9, ease: 'expo', delay: 0.3 }
        );
        // split-char stagger for name
        const m2NameChars = splitChars(document.getElementById('m2Name'));
        gsap.fromTo(m2NameChars,
            { y: 80, opacity: 0, rotateX: -45 },
            { y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: 'expo', stagger: 0.06, delay: 0.5,
              transformOrigin: 'bottom center' }
        );
        const m2LastChars = splitChars(document.getElementById('m2Last'));
        gsap.fromTo(m2LastChars,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'expo', stagger: 0.06, delay: 0.75 }
        );
        gsap.fromTo('#m2Tools .tool-tag-cyan',
            { y: 20, opacity: 0, scale: 0.88 },
            { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: 'back', stagger: 0.06, delay: 0.85 }
        );
        gsap.fromTo('#m2Links .social-btn-cyan',
            { y: 18, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: 'back', stagger: 0.1, delay: 1.35 }
        );
        setTimeout(fireGlowM2, 1200);
    }

    // ---- TEAM ----
    if (index === 4) {
        gsap.fromTo('#teamBgWord',
            { opacity: 0, scale: 1.12 },
            { opacity: 1, scale: 1, duration: 1.8, ease: 'expo', delay: 0.1 }
        );
        gsap.fromTo('#teamLabel',
            { y: 16, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'expo', delay: 0.2 }
        );
        // cards slide in from sides
        gsap.fromTo('#tCard1',
            { x: -60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'expo', delay: 0.4 }
        );
        gsap.fromTo('#tCard2',
            { x: 60, opacity: 0 },
            { x: 0, opacity: 1, duration: 1, ease: 'expo', delay: 0.4 }
        );
        // center badge pops in
        gsap.fromTo('#teamCenter',
            { opacity: 0, scale: 0.5, rotation: -15 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.9, ease: 'back', delay: 0.65 }
        );
        // names clip up
        gsap.fromTo('#tName1', { y: '100%' }, { y: '0%', duration: 0.8, ease: 'expo', delay: 0.75 });
        gsap.fromTo('#tName2', { y: '100%' }, { y: '0%', duration: 0.8, ease: 'expo', delay: 0.8 });
        // roles fade
        gsap.fromTo(['#tRole1','#tRole2'], { opacity: 0 }, { opacity: 1, duration: 0.5, stagger: 0.1, delay: 1 });
        // skill bars animate
        gsap.fromTo(['#tBars1','#tBars2'],
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 1.1,
              onComplete: () => {
                  document.querySelectorAll('.skill-bar').forEach((bar, i) => {
                      gsap.to(bar, { width: bar.dataset.w, duration: 1, ease: 'power2.out', delay: i * 0.08 });
                  });
              }
            }
        );
        gsap.fromTo('#teamFooter', { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.7, delay: 1.4 });
    }
}

// ===== RESET =====
function resetSection(i) {
    gsap.killTweensOf([
        '#m1Img','#m2Img','#m1BgText','#m2BgText',
        '#m1Info','#m2Info','#aboutCode','#aboutText',
        '#heroTitle','#heroHint'
    ]);

    if (i === 0) {
        gsap.set('#heroTitle', { y: '110%', opacity: 0 });
        gsap.set('#heroTeamLabel', { y: 20, opacity: 0 });
        gsap.set('#heroHint', { opacity: 0 });
        document.getElementById('heroType').textContent = '';
        const fw = document.getElementById('heroFloatWords');
        if (fw) fw.innerHTML = '';
        if (constellationAnim) { cancelAnimationFrame(constellationAnim); constellationAnim = null; }
    }
    if (i === 1) {
        gsap.set('#aboutBgWord', { opacity: 0, scale: 1.15 });
        gsap.set('#aboutLabel', { y: 20, opacity: 0 });
        gsap.set('#aboutTitle', { y: '80%', opacity: 0, scale: 1.15, filter: 'blur(12px)' });
        gsap.set('#aboutCode', { y: 24, opacity: 0 });
        gsap.set('#aboutDesc', { x: 30, opacity: 0 });
        gsap.set(['#aboutStat1','#aboutStat2','#aboutStat3'], { y: 30, opacity: 0 });
        gsap.set('#aboutMarquee', { opacity: 0 });
        gsap.set('#aboutLineTop', { width: '0%' });
        gsap.set('#aboutLineBot', { width: '0%' });
        // reset counters
        document.querySelectorAll('.about-stat-num').forEach(el => { el.textContent = '0'; });
        const tc = document.getElementById('aboutTypeCode');
        if (tc) tc.textContent = '';
    }
    if (i === 2) {
        gsap.set('#m1BgText', { x: 100, opacity: 0 });
        gsap.set('#m1Img', { clipPath: 'inset(0 100% 0 0)', scale: 1.08, opacity: 1 });
        gsap.set('#m1Info', { x: window.innerWidth < 769 ? 0 : 60, y: window.innerWidth < 769 ? 30 : 0, opacity: 0 });
        // restore plain text so splitChars works fresh
        const n1 = document.getElementById('m1Name');
        const l1 = document.getElementById('m1Last');
        if (n1) { n1.textContent = 'Abdelrhman'; gsap.set(n1, { opacity: 1 }); }
        if (l1) { l1.textContent = 'Sherif'; gsap.set(l1, { opacity: 1 }); }
        gsap.set('#m1Tools .tool-tag', { y: 20, opacity: 0, scale: 0.88 });
        gsap.set('#m1Links .social-btn', { y: 18, opacity: 0 });
    }
    if (i === 3) {
        gsap.set('#m2BgText', { x: -100, opacity: 0 });
        gsap.set('#m2Img', { clipPath: 'inset(0 0 0 100%)', scale: 1.08, opacity: 1 });
        gsap.set('#m2Info', { x: window.innerWidth < 769 ? 0 : -60, y: window.innerWidth < 769 ? 30 : 0, opacity: 0 });
        // restore plain text so splitChars works fresh
        const n2 = document.getElementById('m2Name');
        const l2 = document.getElementById('m2Last');
        if (n2) { n2.textContent = 'Seif'; gsap.set(n2, { opacity: 1 }); }
        if (l2) { l2.textContent = 'El-sayed'; gsap.set(l2, { opacity: 1 }); }
        gsap.set('#m2Tools .tool-tag-cyan', { y: 20, opacity: 0, scale: 0.88 });
        gsap.set('#m2Links .social-btn-cyan', { y: 18, opacity: 0 });
    }
    if (i === 4) {
        gsap.set('#teamBgWord', { opacity: 0, scale: 1.12 });
        gsap.set('#teamLabel', { y: 16, opacity: 0 });
        gsap.set('#tCard1', { x: -60, opacity: 0 });
        gsap.set('#tCard2', { x: 60, opacity: 0 });
        gsap.set('#teamCenter', { opacity: 0, scale: 0.5, rotation: -15 });
        gsap.set(['#tName1','#tName2'], { y: '100%' });
        gsap.set(['#tRole1','#tRole2'], { opacity: 0 });
        gsap.set(['#tBars1','#tBars2'], { opacity: 0, y: 10 });
        gsap.set('#teamFooter', { opacity: 0, y: 12 });
        document.querySelectorAll('.skill-bar').forEach(b => gsap.set(b, { width: '0%' }));
    }
}

// ===== NAVIGATE =====
const transOverlay = document.getElementById('transOverlay');

function playTransition(cb) {
    if (!transOverlay) { cb(); return; }
    // Phase 1: expand from center to full screen
    gsap.set(transOverlay, { opacity: 1, clipPath: 'inset(50% 0 50% 0)' });
    gsap.to(transOverlay, {
        clipPath: 'inset(0% 0 0% 0)',
        duration: 0.45,
        ease: 'power3.inOut',
        onComplete: () => {
            cb();
            // Phase 2: collapse back to center and disappear
            gsap.to(transOverlay, {
                clipPath: 'inset(50% 0 50% 0)',
                duration: 0.45,
                ease: 'power3.inOut',
                delay: 0.05,
                onComplete: () => gsap.set(transOverlay, { opacity: 0 })
            });
        }
    });
}

function goTo(index) {
    if (busy || index === current || index < 0 || index >= sections.length) return;
    busy = true;
    pauseAuto();
    playTransition(() => {
        resetSection(index);
        sections[index].scrollIntoView({ behavior: 'instant' });
        current = index;
        updateUI(index);
        setTimeout(() => {
            animateIn(index);
            busy = false;
            startAutoBar();
        }, 100);
    });
}

// ===== INTERSECTION OBSERVER =====
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            const i = Array.from(sections).indexOf(e.target);
            if (i !== current) {
                current = i; updateUI(i); animateIn(i);
                startAutoBar();
            }
        }
    });
}, { root: wrapper, threshold: 0.55 });
sections.forEach(s => io.observe(s));

// ===== DOTS & NAV =====
sideDots.forEach(d => d.addEventListener('click', () => goTo(+d.dataset.i)));
navLinks.forEach(l => l.addEventListener('click', e => { e.preventDefault(); goTo(+l.dataset.index); }));

// ===== KEYBOARD =====
document.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); goTo(current + 1); }
    if (e.key === 'ArrowUp'   || e.key === 'PageUp')   { e.preventDefault(); goTo(current - 1); }
});

// ===== AUTO-ADVANCE (5s per section) =====
const AUTO_DELAY = 5000;
const autoBar = document.getElementById('autoBar');
let autoTimer = null;
let autoBarAnim = null;
let autoPaused = false;

function startAutoBar() {
    if (!autoBar) return;
    // reset bar instantly
    gsap.killTweensOf(autoBar);
    gsap.set(autoBar, { width: '0%' });
    // animate to 100% over AUTO_DELAY ms
    autoBarAnim = gsap.to(autoBar, {
        width: '100%',
        duration: AUTO_DELAY / 1000,
        ease: 'none',
        onComplete: () => {
            const next = (current + 1) % sections.length;
            goTo(next);
        }
    });
}

function pauseAuto() {
    if (autoBarAnim) autoBarAnim.pause();
    if (autoTimer) clearTimeout(autoTimer);
}

function resumeAuto() {
    if (autoBarAnim) autoBarAnim.resume();
}

function resetAuto() {
    pauseAuto();
    startAutoBar();
}

// pause on any user interaction
wrapper.addEventListener('wheel',      () => { resetAuto(); }, { passive: true });
wrapper.addEventListener('touchstart', () => { resetAuto(); }, { passive: true });
document.addEventListener('keydown',   () => { resetAuto(); });
sideDots.forEach(d => d.addEventListener('click', () => { resetAuto(); }));
navLinks.forEach(l => l.addEventListener('click', () => { resetAuto(); }));

// pause on hover over the page
document.addEventListener('mouseenter', () => { if (!autoPaused) resumeAuto(); });
document.addEventListener('mouseleave', () => { if (!autoPaused) pauseAuto(); });

// ===== INIT =====
window.addEventListener('load', () => {
    updateUI(0);
    animateIn(0);
    // start auto-advance after initial animation settles
    setTimeout(startAutoBar, 2800);
});
