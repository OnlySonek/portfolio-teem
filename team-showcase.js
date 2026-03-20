// ===== DATA: الشخصيات =====
const characters = [
    {
        name: "ABDELRHMAN",
        img: "member1.jpg",
        bg: "#111418",
        glow: "rgba(180, 160, 120, 0.35)",
        accent: "#c8a96e",
        label: "Front End Dev",
    },
    {
        name: "SEIF",
        img: "member2.jpg",
        bg: "#1a0f0f",
        glow: "rgba(200, 80, 80, 0.35)",
        accent: "#e05555",
        label: "Front End Dev",
    },
];

let current = 0;
let isAnimating = false;

// ===== GSAP SETUP =====
gsap.registerPlugin(CustomEase);
CustomEase.create("bounce-out", "M0,0 C0.14,0 0.242,0.438 0.272,0.561 0.313,0.728 0.354,0.963 0.362,1 0.37,0.985 0.414,0.873 0.455,0.811 0.51,0.726 0.573,0.753 0.586,0.762 0.662,0.812 0.719,0.981 0.726,0.998 0.788,0.914 0.84,0.936 0.859,0.95 0.878,0.964 0.897,0.985 0.911,0.998 0.922,0.994 0.939,0.984 0.954,0.984 0.969,0.984 1,1 1,1");

// ===== ELEMENTS =====
const heroSection   = document.getElementById('heroSection');
const heroBg        = document.getElementById('heroBg');
const bigText       = document.getElementById('bigText').querySelector('span');
const charImg       = document.getElementById('charImg');
const character     = document.getElementById('character');
const cardThumb     = document.getElementById('cardThumb');
const cardName      = document.getElementById('cardName');
const cardLabel     = document.getElementById('cardLabel');
const cardDot       = document.getElementById('cardDot');
const counterEl     = document.getElementById('counterCurrent');
const flashOverlay  = document.getElementById('flashOverlay');
const navAmp        = document.getElementById('nav-amp');
const dotInds       = document.querySelectorAll('.dot-ind');
const designerFlash = document.getElementById('designerFlash');
const developerFlash= document.getElementById('developerFlash');
const startBtn      = document.getElementById('startBtn');
const progressBar   = document.getElementById('progressBar');
const particlesEl   = document.getElementById('particles');

// ===== INIT =====
function init() {
    const c = characters[current];
    heroSection.style.backgroundColor = c.bg;
    heroBg.style.background = `radial-gradient(ellipse at 60% 50%, ${c.glow} 0%, transparent 70%)`;
    bigText.textContent = c.name;
    charImg.src = c.img;
    cardThumb.src = c.img;
    cardName.textContent = c.name;
    cardDot.style.background = c.accent;
    navAmp.style.color = c.accent;
    updateDots();
    startProgress();
    // Entrance animation
    gsap.fromTo(character,
        { y: 120, scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: "bounce-out", delay: 0.3 }
    );
    gsap.fromTo(bigText,
        { opacity: 0, scale: 1.3 },
        { opacity: 0.12, scale: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    heroSection.style.setProperty('--accent-color', c.accent);
    startProgress();
}

// ===== SWITCH CHARACTER =====
function switchCharacter(dir = 1) {
    if (isAnimating) return;
    isAnimating = true;

    current = (current + dir + characters.length) % characters.length;
    const c = characters[current];

    // 1. Flash
    gsap.to(flashOverlay, {
        opacity: 0.6, duration: 0.05,
        onComplete: () => gsap.to(flashOverlay, { opacity: 0, duration: 0.25 })
    });

    // 2. Camera shake on hero
    heroSection.classList.add('shake');
    setTimeout(() => heroSection.classList.remove('shake'), 400);

    // 3. Old character EXIT
    gsap.to(character, {
        scale: 1.4,
        y: -60,
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
    });

    // 4. Big text EXIT
    gsap.to(bigText, {
        opacity: 0,
        x: dir > 0 ? -80 : 80,
        duration: 0.2,
        ease: "power2.in",
    });

    // 5. BG color change
    setTimeout(() => {
        heroSection.style.backgroundColor = c.bg;
        heroBg.style.background = `radial-gradient(ellipse at 60% 50%, ${c.glow} 0%, transparent 70%)`;
        navAmp.style.color = c.accent;
        cardDot.style.background = c.accent;
    }, 150);

    // 6. New character ENTER
    setTimeout(() => {
        charImg.src = c.img;
        bigText.textContent = c.name;
        cardThumb.src = c.img;
        cardName.textContent = c.name;
        cardLabel.textContent = c.label;

        // Counter animation
        gsap.fromTo(counterEl,
            { y: -20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }
        );
        counterEl.textContent = String(current + 1).padStart(2, '0');

        // Character EXPLODE in
        gsap.fromTo(character,
            { scale: 0.5, y: 100, opacity: 0, rotation: dir > 0 ? -5 : 5 },
            { scale: 1, y: 0, opacity: 1, rotation: 0, duration: 0.7, ease: "bounce-out" }
        );

        // Big text ENTER
        gsap.fromTo(bigText,
            { opacity: 0, x: dir > 0 ? 80 : -80, scale: 1.1 },
            { opacity: 0.12, x: 0, scale: 1, duration: 0.6, ease: "power3.out" }
        );

        // Card pop
        gsap.fromTo('#infoCard',
            { scale: 0.85, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2)" }
        );

        // Particles burst
        spawnParticles(c.accent);

        // Update CSS accent var for progress bar
        heroSection.style.setProperty('--accent-color', c.accent);

        updateDots();
        startProgress();
        isAnimating = false;
    }, 280);
}

// ===== UPDATE DOTS =====
function updateDots() {
    dotInds.forEach((d, i) => {
        if (i === current) {
            d.classList.add('active');
            d.style.height = '24px';
            d.style.background = 'white';
            d.style.opacity = '1';
        } else {
            d.classList.remove('active');
            d.style.height = '8px';
            d.style.background = 'rgba(255,255,255,0.3)';
        }
    });
}

// ===== HERO CLICK =====
heroSection.addEventListener('click', () => switchCharacter(1));

// ===== KEYBOARD =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') switchCharacter(1);
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   switchCharacter(-1);
});

// ===== BOTTOM PANELS: Dramatic click =====
function panelDramatic(flashEl) {
    gsap.to(flashEl, {
        opacity: 0.5, duration: 0.06,
        onComplete: () => gsap.to(flashEl, { opacity: 0, duration: 0.3 })
    });
    heroSection.classList.add('shake');
    setTimeout(() => heroSection.classList.remove('shake'), 400);
    switchCharacter(1);
}

document.getElementById('designerPanel').addEventListener('click', () => {
    panelDramatic(designerFlash);
});

document.getElementById('developerPanel').addEventListener('click', () => {
    panelDramatic(developerFlash);
});

// ===== START BTN =====
startBtn.addEventListener('click', () => {
    gsap.to(startBtn, {
        scale: 0.92, duration: 0.1,
        onComplete: () => gsap.to(startBtn, { scale: 1, duration: 0.3, ease: "back.out(3)" })
    });
    switchCharacter(1);
});

// ===== IDLE FLOAT ANIMATION =====
gsap.to(character, {
    y: -12,
    duration: 2.5,
    ease: "sine.inOut",
    yoyo: true,
    repeat: -1,
    delay: 1.5
});

// ===== AUTO SWITCH every 4s =====
const AUTO_INTERVAL = 4000;
let autoTimer = setInterval(() => {
    if (!isAnimating) switchCharacter(1);
}, AUTO_INTERVAL);

// Reset timer on manual click
heroSection.addEventListener('click', () => {
    clearInterval(autoTimer);
    startProgress();
    autoTimer = setInterval(() => {
        if (!isAnimating) switchCharacter(1);
    }, AUTO_INTERVAL);
});

// ===== PROGRESS BAR =====
let progressTween = null;
function startProgress() {
    if (progressTween) progressTween.kill();
    gsap.set(progressBar, { width: '0%' });
    progressTween = gsap.to(progressBar, {
        width: '100%',
        duration: AUTO_INTERVAL / 1000,
        ease: 'none',
    });
}

// ===== PARTICLE BURST =====
function spawnParticles(color) {
    const count = 18;
    for (let i = 0; i < count; i++) {
        const p = document.createElement('div');
        const size = Math.random() * 8 + 4;
        p.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
            background: ${color};
            left: 50%; top: 60%;
            pointer-events: none;
            opacity: 1;
        `;
        particlesEl.appendChild(p);

        const angle = (i / count) * 360;
        const rad = angle * (Math.PI / 180);
        const dist = Math.random() * 200 + 80;
        const tx = Math.cos(rad) * dist;
        const ty = Math.sin(rad) * dist;

        gsap.to(p, {
            x: tx, y: ty,
            opacity: 0,
            scale: 0,
            duration: 0.8 + Math.random() * 0.4,
            ease: 'power2.out',
            onComplete: () => p.remove(),
        });
    }
}

// ===== INIT =====
init();
