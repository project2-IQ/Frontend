/* =============================
   LocateIQ - Past Results Script (FINAL - No Mock Data)
   ============================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "locateiq_lang";
const getSavedLang = () => localStorage.getItem(LANG_KEY) || "ar";
const setSavedLang = (lang) => localStorage.setItem(LANG_KEY, lang);

const I18N = {
  ar: {
    past_title: "النتائج السابقة",
    past_sub: "آخر 10 تحليلات قمت بها",
    nav_home: "الرئيسية",
    
    menu_title: "القائمة",
    menu_profile: "الملف الشخصي",
    menu_chat: "الشات",
    menu_past: "النتائج السابقة",
    menu_logout: "تسجيل الخروج",
    
    filter_all: "الكل",
    filter_high: "مناسب جداً",
    filter_medium: "مناسب متوسط",
    filter_low: "غير موصى به",
    
    search_placeholder: "بحث بالاسم...",
    
    location_label: "الموقع",
    date_label: "التاريخ",
    
    view_details: "عرض التفاصيل",
    view_map: "عرض على الخريطة",
    
    no_results: "لا توجد نتائج سابقة بعد. قم بتحليل مشروعك الأول!",
    welcome_title: "مرحباً بك في عالم التحليلات!",
    start_analysis: "🚀 ابدأ التحليل الآن",
    
    footer_rights: "جميع الحقوق محفوظة"
  },
  
  en: {
    past_title: "Past Results",
    past_sub: "Last 10 analyses you performed",
    nav_home: "Home",
    
    menu_title: "Menu",
    menu_profile: "Profile",
    menu_chat: "Chat",
    menu_past: "Past Results",
    menu_logout: "Logout",
    
    filter_all: "All",
    filter_high: "Highly Suitable",
    filter_medium: "Moderate",
    filter_low: "Not Recommended",
    
    search_placeholder: "Search by name...",
    
    location_label: "Location",
    date_label: "Date",
    
    view_details: "View Details",
    view_map: "View on Map",
    
    no_results: "No past results yet. Start by analyzing your first project!",
    welcome_title: "Welcome to the world of analytics!",
    start_analysis: "🚀 Start Analyzing Now",
    
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
  renderEmptyState(); // رسم الحالة الفارغة
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

// ===== RENDER EMPTY STATE (مؤقتًا - بدون نتائج وهمية) =====
function renderEmptyState() {
  const grid = $("#resultsGrid");
  if (!grid) return;

  const lang = getSavedLang();
  const isAr = lang === "ar";

  const message = t(lang, "no_results");
  const welcome = t(lang, "welcome_title");
  const startBtn = t(lang, "start_analysis");

  grid.innerHTML = `
    <div class="no-results">
      <div style="font-size: 4rem; margin-bottom: 20px;">📊</div>
      <div style="font-size: 1.5rem; font-weight: 900; margin-bottom: 10px; color: var(--orange);">
        ${welcome}
      </div>
      <div style="font-size: 1.1rem; color: var(--muted); line-height: 1.8; margin-bottom: 20px;">
        ${message}
      </div>
      <a href="dashboard.html" class="btn btn-primary" style="display: inline-flex; text-decoration: none;">
        <span>${startBtn}</span>
      </a>
    </div>
  `;
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

  // الفلاتر (مخفية مؤقتًا)
  $$(".filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      // لا تفعل شيء الآن
    });
  });

  // رسم الحالة الفارغة
  renderEmptyState();
});