// login.js (FINAL - مع حساب أدمن ديمو فقط)
document.addEventListener("DOMContentLoaded", () => {
  const LANG_KEY = "locateiq_lang";

  // Elements
  const langBtn  = document.getElementById("langBtn");
  const langText = document.getElementById("langText");

  const welcomeText = document.getElementById("welcomeText");
  const subtitle = document.getElementById("subtitle");
  const emailLabel = document.getElementById("emailLabel");
  const passLabel  = document.getElementById("passLabel");
  const emailInput = document.getElementById("email");
  const passInput  = document.getElementById("password");
  const loginBtn   = document.getElementById("loginBtn");
  const noAccount  = document.getElementById("noAccount");
  const signupLink = document.getElementById("signupLink");
  const navHome = document.getElementById("navHome");
  const footerRights = document.getElementById("footerRights");

  const I18N = {
    ar: {
      lang_btn: "English",
      nav_home: "الرئيسية",
      welcome: "مرحباً بك في",
      subtitle: "حيث تبدأ الاستثمارات الذكية",
      email_label: "البريد الإلكتروني",
      pass_label: "كلمة المرور",
      email_ph: "أدخل بريدك الإلكتروني",
      pass_ph: "أدخل كلمة المرور",
      login_btn: "تسجيل الدخول ←",
      no_account: "ليس لديك حساب؟",
      signup: "إنشاء حساب",
      footer_rights: "جميع الحقوق محفوظة",
      invalid_credentials: "❌ البريد الإلكتروني أو كلمة المرور غير صحيحة",
      welcome_admin: "مرحباً أيها الأدمن"
    },
    en: {
      lang_btn: "العربية",
      nav_home: "Home",
      welcome: "Welcome to",
      subtitle: "Where smart investments begin",
      email_label: "Email",
      pass_label: "Password",
      email_ph: "Enter your email",
      pass_ph: "Enter your password",
      login_btn: "Sign In →",
      no_account: "Don't have an account?",
      signup: "Sign Up",
      footer_rights: "All rights reserved",
      invalid_credentials: "❌ Invalid email or password",
      welcome_admin: "Welcome Admin"
    }
  };

  const getSavedLang = () => localStorage.getItem(LANG_KEY) || "ar";
  const setSavedLang = (lang) => localStorage.setItem(LANG_KEY, lang);

  function applyLang(lang) {
    const isEnglish = lang === "en";
    document.documentElement.lang = isEnglish ? "en" : "ar";
    document.documentElement.dir  = isEnglish ? "ltr" : "rtl";

    if (langText) langText.textContent = I18N[lang].lang_btn;
    if (navHome) navHome.textContent = I18N[lang].nav_home;
    if (welcomeText) welcomeText.textContent = I18N[lang].welcome;
    if (subtitle) subtitle.textContent = I18N[lang].subtitle;
    if (emailLabel) emailLabel.textContent = I18N[lang].email_label;
    if (passLabel) passLabel.textContent = I18N[lang].pass_label;
    if (emailInput) emailInput.placeholder = I18N[lang].email_ph;
    if (passInput)  passInput.placeholder  = I18N[lang].pass_ph;
    if (loginBtn) loginBtn.textContent = I18N[lang].login_btn;
    if (noAccount) noAccount.textContent = I18N[lang].no_account;
    if (signupLink) signupLink.textContent = I18N[lang].signup;
    if (footerRights) footerRights.textContent = I18N[lang].footer_rights;
  }

  // تطبيق اللغة المحفوظة
  applyLang(getSavedLang());

  // تبديل اللغة
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const next = getSavedLang() === "en" ? "ar" : "en";
      setSavedLang(next);
      applyLang(next);
    });
  }

  // التحقق من تسجيل الدخول
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passInput.value.trim();
      const lang = getSavedLang();

      // حساب الأدمن التجريبي
      if (email === "admin@locateiq.com" && password === "Admin@123") {
        // أدمن
        localStorage.setItem("is_logged_in", "true");
        localStorage.setItem("user_role", "admin");
        localStorage.setItem("user_email", email);
        localStorage.setItem("user_name", "Admin");
        
        // رسالة ترحيب (اختياري)
        console.log(lang === "ar" ? "مرحباً أيها الأدمن" : "Welcome Admin");
        
        window.location.href = "admin.html";
      } else {
        // المستخدمين العاديين (سيتم التحقق من قاعدة البيانات مستقبلاً)
        // حالياً نسمح بأي بريد عادي للتجربة
        if (email.includes("@") && password.length >= 6) {
          localStorage.setItem("is_logged_in", "true");
          localStorage.setItem("user_role", "user");
          localStorage.setItem("user_email", email);
          localStorage.setItem("user_name", email.split('@')[0]);
          
          window.location.href = "dashboard.html";
        } else {
          alert(I18N[lang].invalid_credentials);
        }
      }
    });
  }
});