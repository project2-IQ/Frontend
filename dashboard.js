/* =============================
   LocateIQ - Dashboard Script (FINAL with Backend)
   ============================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "locateiq_lang";
const getSavedLang = () => localStorage.getItem(LANG_KEY) || "ar";
const setSavedLang = (lang) => localStorage.setItem(LANG_KEY, lang);

// ============================================
// إعدادات الباك إند
// ============================================
const API_BASE_URL = "http://192.168.8.69:8000";

// ============================================
// دالة جلب user_id من localStorage
// ============================================
function getUserId() {
  return localStorage.getItem("user_id");
}

// ============================================
// دالة التحقق من تسجيل الدخول
// ============================================
function checkAuth() {
  const userId = getUserId();
  if (!userId) {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

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
    analyzing: "جاري التحليل...",
    error_msg: "حدث خطأ أثناء التحليل. تأكد من تشغيل الخادم.",
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
    analyzing: "Analyzing...",
    error_msg: "Error during analysis. Make sure the server is running.",
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
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = t(lang, key);
    if (val != null) el.textContent = val;
  });
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    const val = t(lang, key);
    if (val != null) el.setAttribute("placeholder", val);
  });
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

// ===== SIDE MENU =====
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

// ============================================
// دالة تحليل المشروع (ربط مع الباك إند)
// ============================================
async function analyzeProject(projectText) {
  const lang = getSavedLang();
  const userId = getUserId();

  if (!userId) {
    addMessage("bot", lang === "ar" ? "يرجى تسجيل الدخول أولاً" : "Please login first");
    window.location.href = "login.html";
    return;
  }

  addMessage("bot", t(lang, "analyzing") || "Analyzing...");

  try {
    let projectType = "عام";
    let location = "عسير";

    if (projectText.includes("مقهى") || projectText.includes("cafe")) projectType = "مقهى";
    else if (projectText.includes("مطعم") || projectText.includes("restaurant")) projectType = "مطعم";
    else if (projectText.includes("متجر") || projectText.includes("shop")) projectType = "متجر";

    if (projectText.includes("أبها") || projectText.includes("Abha")) location = "أبها";
    else if (projectText.includes("خميس") || projectText.includes("Khamis")) location = "خميس مشيط";

    const response = await fetch(`${API_BASE_URL}/investor/analyze?userID=${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: projectText,
        project_type: projectType,
        location: location
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    let resultText = "";
    if (lang === "ar") {
      resultText = `📊 **نتيجة التحليل**\n\n📍 الموقع: ${location}\n🏷️ نوع المشروع: ${projectType}\n🎯 المجموعة: ${data.cluster}\n📈 درجة الملاءمة: ${data.suitability}\n⭐ النسبة: ${data.score}%\n\n🗺️ تم تحديث الخريطة حسب النتيجة.`;
    } else {
      resultText = `📊 **Analysis Result**\n\n📍 Location: ${location}\n🏷️ Project Type: ${projectType}\n🎯 Cluster: ${data.cluster}\n📈 Suitability: ${data.suitability}\n⭐ Score: ${data.score}%\n\n🗺️ Map updated based on result.`;
    }

    addMessage("bot", resultText);
    updateMapWithResult(data, location);

  } catch (error) {
    console.error("Analysis error:", error);
    addMessage("bot", t(lang, "error_msg") || "حدث خطأ أثناء التحليل. تأكد من تشغيل الخادم.");
  }
}

// ============================================
// تحديث الخريطة حسب نتيجة التحليل
// ============================================
function updateMapWithResult(data, location) {
  const map = window.locateiqMap;
  if (!map) return;
  let color = "#ef4444";
  if (data.suitability === "مناسب جداً" || data.suitability === "Highly Suitable") color = "#22c55e";
  else if (data.suitability === "مناسب متوسط" || data.suitability === "Moderate") color = "#facc15";
  let lat = 18.2164, lng = 42.5053;
  if (location === "خميس مشيط") { lat = 18.3000; lng = 42.7333; }
  else if (location === "أحد رفيدة") { lat = 18.2000; lng = 42.9500; }
  const lang = getSavedLang();
  const label = `${data.suitability} (${data.score}%)`;
  L.circleMarker([lat, lng], {
    radius: 12,
    color: color,
    fillColor: color,
    fillOpacity: 0.9,
    weight: 2
  }).addTo(map).bindPopup(`<b>${location}</b><br>${label}`);
  map.setView([lat, lng], 10);
}

// ============================================
// تهيئة الخريطة (Leaflet)
// ============================================
function initMap() {
  const mapElement = document.getElementById("asirMap");
  if (!mapElement || typeof L === "undefined") return;
  const map = L.map("asirMap").setView([18.2164, 42.5053], 9);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  window.locateiqMap = map;
  const cities = [
    { name: "أبها", nameEn: "Abha", lat: 18.2164, lng: 42.5053 },
    { name: "خميس مشيط", nameEn: "Khamis Mushait", lat: 18.3000, lng: 42.7333 },
    { name: "أحد رفيدة", nameEn: "Ahad Rufaidah", lat: 18.2000, lng: 42.9500 }
  ];
  const lang = getSavedLang();
  cities.forEach(city => {
    const cityName = lang === "ar" ? city.name : city.nameEn;
    L.marker([city.lat, city.lng]).addTo(map).bindPopup(`<b>${cityName}</b>`);
  });
  setTimeout(() => map.invalidateSize(), 300);
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  if (!checkAuth()) return;
  applyLang(getSavedLang());
  initMap();

  const langBtn = $("#langBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = getSavedLang() === "en" ? "ar" : "en";
      setSavedLang(next);
      applyLang(next);
      if (window.locateiqMap) window.locateiqMap.remove();
      initMap();
    });
  }

  if (menuFab) menuFab.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideMenu?.classList.contains("open")) closeMenu();
  });

  const logoutBtn = $("#logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("user_role");
      localStorage.removeItem("user_email");
      localStorage.removeItem("user_name");
      window.location.href = "login.html";
    });
  }

  const attachBtn = $("#attachBtn");
  if (attachBtn) {
    attachBtn.addEventListener("click", () => {
      alert(getSavedLang() === "ar" ? "سيتم إضافة خاصية رفع الصور قريبًا" : "Image upload feature coming soon");
    });
  }

  const chatForm = $("#chatForm");
  const chatInput = $("#chatText");
  const mapOverlay = $("#mapOverlay");
  if (chatForm) {
    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const txt = (chatInput?.value || "").trim();
      if (!txt) return;
      addMessage("user", txt);
      if (chatInput) chatInput.value = "";
      if (mapOverlay) mapOverlay.style.display = "none";
      await analyzeProject(txt);
    });
  }
});