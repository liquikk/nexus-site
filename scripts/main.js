const App = {
  config: {
    analytics: {
      google: 'G-3JL4FSX3SN',
      yandex: 101222628
    }
  },

  modules: {
    critical: [
      { name: 'modal', path: './modal.js' },
      { name: 'fullScroll', path: './full-scroll.js' },
      { name: 'header', path: './header.js' },
      { name: 'phoneInput', path: './phone-input.js' },
      { name: 'errorHandler', path: './error-handler.js' },
      { name: 'tgSendNumber', path: './tg_send_number.js' }
    ],
    lazy: [
      {
        name: 'map',
        path: './map.js',
        trigger: '#map',
        deps: ['https://maps.api.2gis.ru/2.0/loader.js?pkg=full']
      },
      {
        name: 'bannerAnimation',
        path: './banner_animation.js',
        trigger: '.banner'
      }
    ]
  },

  externals: [
    'https://cdn.jsdelivr.net/npm/sweetalert2@11.4.8',
    'https://dikidi.ru/assets/js/widget_record/widget2.min.js',
    'https://www.googletagmanager.com/gtag/js?id=G-3JL4FSX3SN'
  ],

  initGoogleAnalytics: function () {
    try {
      if (window.gtag) return;
      window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', this.config.analytics.google);
    } catch (e) {
      console.warn('Google Analytics initialization failed:', e);
    }
  },

  initYandexMetrika: function () {
    try {
      if (window.ym) return;
      (function (m, e, t, r, i, k, a) {
        m[i] = m[i] || function () { (m[i].a = m[i].a || []).push(arguments) };
        m[i].l = 1 * new Date();
        k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k, a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
      ym(this.config.analytics.yandex, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    } catch (e) {
      console.warn('Yandex Metrika initialization failed:', e);
    }
  },

  initAnalytics: function () {
    try {
      this.initYandexMetrika();
      this.initGoogleAnalytics();
    } catch (e) {
      console.warn('Analytics initialization failed:', e);
    }
  },

  initCookieConsent: function () {
    try {
      if (typeof window.cookieconsent === 'undefined') {
        console.warn('CookieConsent script was blocked or failed to load');
        // Если cookieconsent не загрузился, просто инициализируем аналитику
        this.initAnalytics();
        return;
      }
      
      window.cookieconsent.initialise({
        palette: {
          popup: { background: "#2E2C2D", text: "#FFFFFF" },
          button: { background: "#FFFFFF", text: "#111111" }
        },
        position: "bottom-right",
        content: {
          message: "Мы используем Cookies для улучшения работы сайта.",
          dismiss: "Принять",
          link: "Подробнее",
          href: "policy.html"
        },
        onStatusChange: (status) => {
          if (['allow', 'dismiss'].includes(status)) {
            this.initAnalytics();
          }
        }
      });
  
      if (["allow", "dismiss"].includes(localStorage.getItem("cookieconsent_status"))) {
        this.initAnalytics();
      }
    } catch (e) {
      console.warn('CookieConsent error:', e);
      // Если произошла ошибка, все равно попытаться инициализировать аналитику
      this.initAnalytics();
    }
  },

  loadScript: function (src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const script = document.createElement('script');
      script.src = src;
      script.onload = resolve;
      script.onerror = () => {
        console.warn(`Script blocked or failed to load: ${src}`);
        resolve(); // Все равно разрешаем промис, чтобы не блокировать загрузку других модулей
      };
      document.head.appendChild(script);
    });
  },

  initModule: function (module) {
    return import(module.path)
      .then(m => typeof m.init === 'function' ? m.init() : console.warn(`Module ${module.name} has no init()`))
      .catch(err => {
        console.error(`Error loading ${module.name}:`, err);
        return Promise.resolve(); // Продолжаем выполнение даже при ошибке
      });
  },

  loadCriticalModules: function () {
    return Promise.all([
      ...this.modules.critical.map(module => this.initModule(module)),
      ...this.externals.map(script => this.loadScript(script))
    ]);
  },

  loadLazyModules: function () {
    this.modules.lazy.forEach(module => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observer.disconnect();
          const deps = module.deps
            ? Promise.all(module.deps.map(dep => this.loadScript(dep)))
            : Promise.resolve();
          deps.then(() => this.initModule(module));
        }
      });

      const element = document.querySelector(module.trigger);
      if (element) observer.observe(element);
    });
  },

  init: function () {
    try {
      this.loadCriticalModules()
        .then(() => {
          console.log('Critical modules loaded');
          this.initCookieConsent();
          this.loadLazyModules();
        })
        .catch(err => {
          console.error('Initialization error:', err);
          // Даже при ошибке продолжаем работу
          this.initCookieConsent();
          this.loadLazyModules();
        });
    } catch (e) {
      console.error('Global initialization error:', e);
    }
  }
};

if (document.readyState === 'complete') {
  App.init();
} else {
  document.addEventListener('DOMContentLoaded', () => App.init());
}