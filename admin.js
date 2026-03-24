/* =============================
   LocateIQ - Admin Panel (FINAL - COMPLETE)
   ============================= */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

const LANG_KEY = "locateiq_lang";
const getSavedLang = () => localStorage.getItem(LANG_KEY) || "ar";
const setSavedLang = (lang) => localStorage.setItem(LANG_KEY, lang);

// الترجمة الكاملة لجميع الصفحات
const I18N = {
  ar: {
    // العناوين الرئيسية
    admin_title: "LocateIQ | لوحة تحكم الأدمن",
    users_title: "LocateIQ | إدارة المستخدمين",
    data_title: "LocateIQ | إدارة البيانات",
    settings_title: "LocateIQ | إعدادات النظام",
    
    // القائمة الجانبية
    home: "الرئيسية",
    users: "المستخدمين",
    data: "البيانات",
    settings: "الإعدادات",
    user_dashboard: "واجهة المستخدم",
    customize_theme: "تخصيص المظهر",
    logout: "تسجيل الخروج",
    admin_role: "مدير النظام",
    
    // رأس الصفحات
    admin_dashboard_title: "لوحة تحكم الأدمن",
    admin_dashboard_sub: "مرحباً بك في لوحة التحكم، يمكنك إدارة النظام والإشراف على المستخدمين",
    
    users_sub: "عرض وإدارة جميع مستخدمي المنصة",
    data_sub: "إضافة وتعديل المناطق، المؤشرات، والبيانات الجغرافية",
    settings_sub: "تخصيص إعدادات المنصة والتحكم بالمعايير",
    
    // إحصائيات
    total_users: "إجمالي المستخدمين",
    total_analyses: "إجمالي التحليلات",
    active_now: "نشط الآن",
    
    // جداول المستخدمين
    id: "#",
    name: "الاسم",
    email: "البريد",
    role: "الدور",
    reg_date: "تاريخ التسجيل",
    status: "الحالة",
    actions: "إجراءات",
    user_role: "مستخدم",
    admin_role_table: "أدمن",
    active: "نشط",
    inactive: "غير نشط",
    edit: "تعديل",
    delete: "حذف",
    view: "عرض",
    
    // بحث وإضافة
    search_users: "بحث عن مستخدم...",
    add_user: "إضافة مستخدم",
    
    // جداول البيانات
    region_name: "اسم المنطقة",
    city: "المدينة",
    area: "المساحة",
    population: "الكثافة السكانية",
    indicators_count: "عدد المؤشرات",
    add_region: "إضافة منطقة",
    search_region: "بحث عن منطقة...",
    
    indicator_name: "اسم المؤشر",
    type: "النوع",
    value: "القيمة",
    region: "المنطقة",
    last_updated: "آخر تحديث",
    add_indicator: "إضافة مؤشر",
    search_indicator: "بحث عن مؤشر...",
    
    // نقاط الاهتمام
    point_name: "اسم النقطة",
    coordinates: "الإحداثيات",
    add_point: "إضافة نقطة",
    search_points: "بحث عن نقاط...",
    
    // أنواع المؤشرات والنقاط
    demographic: "ديموغرافي",
    economic: "اقتصادي",
    health: "صحي",
    educational: "تعليمي",
    hospital: "مستشفى",
    school: "مدرسة",
    
    // أسماء المؤشرات
    population_indicator: "الكثافة السكانية",
    competitors_indicator: "عدد المنافسين",
    
    // أسماء المدن والمناطق
    abha: "أبها",
    khamis_mushait: "خميس مشيط",
    ahad_rufaidah: "أحد رفيدة",
    al_namis: "النميص",
    al_khalidiyah: "الخالدية",
    al_dabab: "الضباب",
    plan_6: "المخطط 6",
    
    // تبويبات البيانات
    regions: "المناطق",
    indicators: "المؤشرات",
    points: "نقاط الاهتمام",
    import: "استيراد",
    
    // معاينة الخريطة
    map_preview: "معاينة الخريطة",
    map_click_hint: "انقر على منطقة لعرض التفاصيل",
    
    // استيراد
    import_data: "استيراد البيانات",
    drag_drop: "اسحب وأفلت الملف هنا أو",
    browse: "استعرض",
    import_hint: "يدعم: CSV, JSON, GeoJSON",
    
    // إعدادات
    general_settings: "الإعدادات العامة",
    analysis_settings: "إعدادات التحليل",
    data_settings: "إعدادات البيانات",
    map_settings: "إعدادات الخريطة",
    site_name: "اسم الموقع",
    site_url: "رابط الموقع",
    admin_email: "بريد الأدمن",
    maintenance_mode: "وضع الصيانة",
    on: "مفعل",
    off: "معطل",
    ml_model: "نموذج الذكاء الاصطناعي",
    clusters: "عدد المجموعات",
    confidence: "حد الثقة",
    data_source: "مصدر البيانات",
    update_frequency: "تحديث البيانات",
    daily: "يوميًا",
    weekly: "أسبوعيًا",
    monthly: "شهريًا",
    map_style: "نمط الخريطة",
    streets: "شوارع",
    satellite: "قمر صناعي",
    terrain: "تضاريس",
    default_zoom: "التكبير الافتراضي",
    show_clusters: "عرض المجموعات",
    save_settings: "حفظ الإعدادات",
    
    // نماذج AI
    kmeans: "K-Means",
    dbscan: "DBSCAN",
    hierarchical: "Hierarchical",
    
    // مصادر البيانات
    local: "محلي",
    api: "API",
    database: "قاعدة بيانات",
    
    // الفوتر
    footer_rights: "جميع الحقوق محفوظة",
    
    // رسائل
    vs_code_opening: "جاري فتح المشروع في VS Code...",
    vs_code_error: "تعذر فتح VS Code. تأكدي من تثبيته والمسار الصحيح.",
    
    // التوب بار
    nav_home: "الرئيسية"
  },
  
  en: {
    // Main Titles
    admin_title: "LocateIQ | Admin Dashboard",
    users_title: "LocateIQ | Users Management",
    data_title: "LocateIQ | Data Management",
    settings_title: "LocateIQ | System Settings",
    
    // Sidebar
    home: "Home",
    users: "Users",
    data: "Data",
    settings: "Settings",
    user_dashboard: "User Dashboard",
    customize_theme: "Customize Theme",
    logout: "Logout",
    admin_role: "System Admin",
    
    // Page Headers
    admin_dashboard_title: "Admin Dashboard",
    admin_dashboard_sub: "Welcome to the admin panel, you can manage the system and oversee users",
    
    users_sub: "View and manage all platform users",
    data_sub: "Add and edit regions, indicators, and geographic data",
    settings_sub: "Customize platform settings and control parameters",
    
    // Stats
    total_users: "Total Users",
    total_analyses: "Total Analyses",
    active_now: "Active Now",
    
    // Users Table
    id: "#",
    name: "Name",
    email: "Email",
    role: "Role",
    reg_date: "Reg. Date",
    status: "Status",
    actions: "Actions",
    user_role: "User",
    admin_role_table: "Admin",
    active: "Active",
    inactive: "Inactive",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    
    // Search and Add
    search_users: "Search users...",
    add_user: "Add User",
    
    // Data Tables
    region_name: "Region Name",
    city: "City",
    area: "Area",
    population: "Population Density",
    indicators_count: "Indicators Count",
    add_region: "Add Region",
    search_region: "Search region...",
    
    indicator_name: "Indicator Name",
    type: "Type",
    value: "Value",
    region: "Region",
    last_updated: "Last Updated",
    add_indicator: "Add Indicator",
    search_indicator: "Search indicator...",
    
    // Points of Interest
    point_name: "Point Name",
    coordinates: "Coordinates",
    add_point: "Add Point",
    search_points: "Search points...",
    
    // Indicator and Point Types
    demographic: "Demographic",
    economic: "Economic",
    health: "Health",
    educational: "Educational",
    hospital: "Hospital",
    school: "School",
    
    // Indicator Names
    population_indicator: "Population Density",
    competitors_indicator: "Competitors Count",
    
    // City and Region Names
    abha: "Abha",
    khamis_mushait: "Khamis Mushait",
    ahad_rufaidah: "Ahad Rufaidah",
    al_namis: "Al Namis",
    al_khalidiyah: "Al Khalidiyah",
    al_dabab: "Al Dabab",
    plan_6: "Plan 6",
    
    // Data Tabs
    regions: "Regions",
    indicators: "Indicators",
    points: "Points of Interest",
    import: "Import",
    
    // Map Preview
    map_preview: "Map Preview",
    map_click_hint: "Click on a region to view details",
    
    // Import
    import_data: "Import Data",
    drag_drop: "Drag and drop file here or",
    browse: "Browse",
    import_hint: "Supports: CSV, JSON, GeoJSON",
    
    // Settings
    general_settings: "General Settings",
    analysis_settings: "Analysis Settings",
    data_settings: "Data Settings",
    map_settings: "Map Settings",
    site_name: "Site Name",
    site_url: "Site URL",
    admin_email: "Admin Email",
    maintenance_mode: "Maintenance Mode",
    on: "On",
    off: "Off",
    ml_model: "AI Model",
    clusters: "Number of Clusters",
    confidence: "Confidence Threshold",
    data_source: "Data Source",
    update_frequency: "Update Frequency",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    map_style: "Map Style",
    streets: "Streets",
    satellite: "Satellite",
    terrain: "Terrain",
    default_zoom: "Default Zoom",
    show_clusters: "Show Clusters",
    save_settings: "Save Settings",
    
    // AI Models
    kmeans: "K-Means",
    dbscan: "DBSCAN",
    hierarchical: "Hierarchical",
    
    // Data Sources
    local: "Local",
    api: "API",
    database: "Database",
    
    // Footer
    footer_rights: "All rights reserved",
    
    // Messages
    vs_code_opening: "Opening project in VS Code...",
    vs_code_error: "Could not open VS Code. Make sure it is installed and the path is correct.",
    
    // Topbar
    nav_home: "Home"
  }
};

// التحقق من صلاحية الأدمن
function checkAdminAccess() {
  const role = localStorage.getItem("user_role");
  const isLoggedIn = localStorage.getItem("is_logged_in");
  
  if (!isLoggedIn || role !== "admin") {
    window.location.href = "login.html";
    return false;
  }
  return true;
}

// تحديث اللغة في كل العناصر
function applyLanguage(lang) {
  const isAr = lang === "ar";
  
  document.documentElement.lang = isAr ? "ar" : "en";
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  
  // تحديث زر اللغة
  const langText = $("#langText");
  if (langText) langText.textContent = isAr ? "English" : "العربية";
  
  // تحديث كل العناصر اللي فيها data-i18n
  $$("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (I18N[lang][key]) {
      el.textContent = I18N[lang][key];
    }
  });
  
  // تحديث الـ placeholders
  $$("[data-i18n-placeholder]").forEach(el => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (I18N[lang][key]) {
      el.placeholder = I18N[lang][key];
    }
  });
  
  // تحديث عنوان الصفحة
  const titleKey = document.querySelector("title")?.getAttribute("data-i18n");
  if (titleKey && I18N[lang][titleKey]) {
    document.title = I18N[lang][titleKey];
  }
  
  // تحديث الـ options في الـ select
  $$("option[data-i18n]").forEach(option => {
    const key = option.getAttribute("data-i18n");
    if (I18N[lang][key]) {
      option.textContent = I18N[lang][key];
    }
  });
  
  // تحديث المحتوى الديناميكي (badges, roles, etc)
  updateDynamicContent(lang);
}

// تحديث المحتوى الديناميكي
function updateDynamicContent(lang) {
  const isAr = lang === "ar";
  
  $$(".role-badge.admin").forEach(badge => {
    badge.textContent = isAr ? "أدمن" : "Admin";
  });
  
  $$(".role-badge.user").forEach(badge => {
    badge.textContent = isAr ? "مستخدم" : "User";
  });
  
  $$(".status-badge.active").forEach(badge => {
    badge.textContent = isAr ? "نشط" : "Active";
  });
  
  $$(".status-badge.inactive").forEach(badge => {
    badge.textContent = isAr ? "غير نشط" : "Inactive";
  });
}

// تحديث الإحصائيات
function updateStats() {
  const totalUsers = $("#totalUsers");
  const totalAnalyses = $("#totalAnalyses");
  const activeNow = $("#activeNow");

  if (totalUsers) totalUsers.textContent = "0";
  if (totalAnalyses) totalAnalyses.textContent = "0";
  if (activeNow) activeNow.textContent = "0";
}

// ربط الأحداث
function bindEvents() {
  // زر تخصيص المظهر
  $("#themeCustomizer")?.addEventListener("click", (e) => {
    e.preventDefault();
    const lang = getSavedLang();
    
    try {
      const projectPath = "C:/Users/YourName/Projects/LocateIQ";
      window.location.href = `vscode://folder/${projectPath}`;
      alert(I18N[lang].vs_code_opening);
    } catch (error) {
      alert(I18N[lang].vs_code_error);
    }
  });

  // تسجيل الخروج
  $("#logoutBtn")?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("is_logged_in");
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_name");
    window.location.href = "login.html";
  });
}

// تهيئة الصفحة
document.addEventListener("DOMContentLoaded", () => {
  if (!checkAdminAccess()) return;

  const savedLang = getSavedLang();
  applyLanguage(savedLang);

  if (document.getElementById("totalUsers")) {
    updateStats();
  }

  bindEvents();

  $("#langBtn")?.addEventListener("click", () => {
    const next = getSavedLang() === "en" ? "ar" : "en";
    setSavedLang(next);
    applyLanguage(next);
  });
});     