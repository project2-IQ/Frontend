/* =============================
   LocateIQ - Dashboard Script (FINAL)
   ============================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "locateiq_lang";
const getSavedLang = () => localStorage.getItem(LANG_KEY) || "ar";
const setSavedLang = (lang) => localStorage.setItem(LANG_KEY, lang);

const I18N = {
  ar: {
    dash_title: "LocateIQ | لوحة التحكم",
    nav_home: "الرئيسية",
    dash_h1: "محادثة تحليل الاستثمار",
    dash_sub: "اكتب متطلبات مشروعك، وستظهر النتائج المقترحة على الخريطة.",

    menu_title: "القائمة",
    menu_profile: "الملف الشخصي",
    menu_chat: "الشات",
    menu_past: "النتائج السابقة",
    menu_logout: "تسجيل الخروج",

    chat_title: "محادثة تحليل الاستثمار",
    chat_desc: "اكتب مميزات مشروعك وستظهر النتائج على الخريطة",
    chat_welcome: "أهلًا! اكتب مشروعك في عسير مثل: \"مقهى في أبها\" أو \"مطعم في خميس مشيط\".",
    chat_ph: "صف مشروعك...",
    bot_reply: "تم! هذه نتيجة أولية (تجريبية). لاحقًا بنربطها بالنموذج والخريطة الدقيقة.",

    map_title: "خريطة الاستثمار - عسير",
    map_hint: "الخريطة ستظهر بعد إدخال وصف المشروع",

    lg_high: "مناسب جدًا",
    lg_high_t: "فرصة نجاح عالية بناءً على المؤشرات.",
    lg_mid: "مناسب متوسط",
    lg_mid_t: "مناسب مع بعض عوامل المخاطرة.",
    lg_low: "غير مُوصى به",
    lg_low_t: "إمكانية أقل بسبب السوق/المنافسة.",

    footer_rights: "جميع الحقوق محفوظة"
  },

  en: {
    dash_title: "LocateIQ | Dashboard",
    nav_home: "Home",
    dash_h1: "Investment Analysis Chat",
    dash_sub: "Describe your project requirements and results will appear on the map.",

    menu_title: "Menu",
    menu_profile: "Profile",
    menu_chat: "Chat",
    menu_past: "Past Results",
    menu_logout: "Logout",

    chat_title: "Investment Analysis Chat",
    chat_desc: "Describe your project features and results will appear on the map",
    chat_welcome: "Hi! Describe your Asir project like: “Coffee shop in Abha” or “Restaurant in Khamis Mushait”.",
    chat_ph: "Describe your project...",
    bot_reply: "Done! This is a demo output. Next we’ll connect the ML model and the accurate Asir map.",

    map_title: "Asir Region Investment Map",
    map_hint: "The map will appear after you describe your project",

    lg_high: "Highly Suitable",
    lg_high_t: "High success probability based on indicators.",
    lg_mid: "Moderate Suitability",
    lg_mid_t: "Suitable with some risk factors.",
    lg_low: "Not Recommended",
    lg_low_t: "Lower potential due to market/competition.",

    footer_rights: "All rights reserved"
  }
};

const t = (lang, key) => I18N?.[lang]?.[key] ?? null;

function applyI18nToDom(lang) {
  // عناصر data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(lang, key);
    if (val != null) el.textContent = val;
  });

  // placeholders
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(lang, key);
    if (val != null) el.setAttribute("placeholder", val);
  });

  // title
  const titleEl = $("title[data-i18n-title]");
  if (titleEl) {
    const key = titleEl.getAttribute("data-i18n-title");
    const val = t(lang, key);
    if (val) document.title = val;
  }
}

function applyLang(lang) {
  const isEnglish = lang === "en";
  document.documentElement.lang = isEnglish ? "en" : "ar";
  document.documentElement.dir = isEnglish ? "ltr" : "rtl";

  const langText = $("#langText");
  if (langText) langText.textContent = isEnglish ? "العربية" : "English";

  applyI18nToDom(lang);
}

// ===== SIDE MENU مع تعتيم الخلفية =====
const menuFab = $("#menuFab");
const menuClose = $("#menuClose");
const sideMenu = $("#sideMenu");
const menuOverlay = $("#menuOverlay");

function openMenu() {
  if (!sideMenu || !menuOverlay) return;
  sideMenu.classList.add("open");
  menuOverlay.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeMenu() {
  if (!sideMenu || !menuOverlay) return;
  sideMenu.classList.remove("open");
  menuOverlay.classList.remove("active");
  document.body.classList.remove("menu-open");
}

// ===== CHAT =====
function addMessage(type, text) {
  const chatBody = $("#chatBody");
  if (!chatBody) return;

  const wrap = document.createElement("div");
  wrap.className = "msg " + (type === "user" ? "user" : "bot");

  const ic = document.createElement("div");
  ic.className = "msg-ic";
  ic.setAttribute("aria-hidden", "true");
  ic.textContent = type === "user" ? "🧑" : "🤖";

  const bubble = document.createElement("div");
  bubble.className = "msg-bubble";
  bubble.textContent = text;

  wrap.appendChild(ic);
  wrap.appendChild(bubble);
  chatBody.appendChild(wrap);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // اللغة
  applyLang(getSavedLang());

  // زر اللغة
  const langBtn = $("#langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = getSavedLang() === "en" ? "ar" : "en";
      setSavedLang(next);
      applyLang(next);
    });
  }

  // القائمة الجانبية
  if (menuFab) menuFab.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  // إغلاق القائمة عند الضغط على ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideMenu?.classList.contains("open")) {
      closeMenu();
    }
  });

  // تسجيل الخروج
  const logoutBtn = $("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // زر إرفاق الصور (تجريبي)
  const attachBtn = $("#attachBtn");
  if (attachBtn) {
    attachBtn.addEventListener("click", () => {
      alert(getSavedLang() === "ar" ? "سيتم إضافة خاصية رفع الصور قريبًا" : "Image upload feature coming soon");
    });
  }

  // الشات
  const chatForm = $("#chatForm");
  const chatInput = $("#chatText");
  const mapOverlay = $("#mapOverlay");

  if (chatForm) {
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const txt = (chatInput?.value || "").trim();
      if (!txt) return;

      addMessage("user", txt);
      if (chatInput) chatInput.value = "";

      if (mapOverlay) mapOverlay.style.display = "none";

      const lang = getSavedLang();
      setTimeout(() => addMessage("bot", t(lang, "bot_reply") || "Done."), 500);
    });
  }
});