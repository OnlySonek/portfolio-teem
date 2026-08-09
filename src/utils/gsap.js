import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export function setupEases() {
  CustomEase.create("expo", "M0,0 C0.16,1 0.3,1 1,1");
  CustomEase.create("back", "M0,0 C0.34,1.4 0.64,1 1,1");
}

export function typewrite(el, text, speed = 60, cb) {
  if (!el) return null;
  el.textContent = "";
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(iv);
      if (cb) cb();
    }
  }, speed);
  return iv;
}

export function splitChars(el) {
  if (!el) return [];
  const text = el.textContent;
  el.textContent = "";
  return [...text].map((ch) => {
    const s = document.createElement("span");
    s.className = "char";
    s.textContent = ch === " " ? "\u00A0" : ch;
    el.appendChild(s);
    return s;
  });
}
