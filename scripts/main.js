// scripts/main.js
const App = {
  // Все модули приложения
  modules: {
      // Критические (загружаются сразу)
      critical: [
          { name: 'modal', path: './modal.js' },
          { name: 'fullScroll', path: './full-scroll.js' },
          { name: 'header', path: './header.js' },
          { name: 'phoneInput', path: './phone-input.js' },
          { name: 'errorHandler', path: './error-handler.js' },
          { name: 'tgSendNumber', path: './tg_send_number.js' }
      ],
      // Ленивые (загружаются при необходимости)
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

  // Внешние зависимости
  externals: [
      'https://cdn.jsdelivr.net/npm/sweetalert2@11',
      'https://dikidi.ru/assets/js/widget_record/widget2.min.js'
  ],

  // Инициализация Яндекс.Метрики
  initYandexMetrika: function() {
      if (window.ym) return;

      (function(m,e,t,r,i,k,a){
          m[i] = m[i] || function(){(m[i].a = m[i].a||[]).push(arguments)};
          m[i].l = 1*new Date();
          k = e.createElement(t), a = e.getElementsByTagName(t)[0], k.async = 1, k.src = r, a.parentNode.insertBefore(k,a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(100953767, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
      });
  },

  // Настройка Cookie Consent
  initCookieConsent: function() {
      try {
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
                  href: "policy/privat-policy.html"
              },
              onStatusChange: (status) => {
                  if (status === 'allow' || status === 'dismiss') {
                      this.initYandexMetrika();
                  }
              }
          });

          // Проверяем согласие при загрузке
          if (['allow', 'dismiss'].includes(localStorage.getItem('cookieconsent_status'))) {
              this.initYandexMetrika();
          }
      } catch (e) {
          console.error('CookieConsent error:', e);
      }
  },

  // Загрузка скрипта
  loadScript: function(src) {
      return new Promise((resolve, reject) => {
          if (document.querySelector(`script[src="${src}"]`)) return resolve();

          const script = document.createElement('script');
          script.src = src;
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
      });
  },

  // Инициализация модуля
  initModule: function(module) {
      return import(module.path)
          .then(m => {
              if (typeof m.init === 'function') {
                  return m.init();
              }
              console.warn(`Module ${module.name} has no init()`);
          })
          .catch(err => console.error(`Error loading ${module.name}:`, err));
  },

  // Загрузка всех критических модулей
  loadCriticalModules: function() {
      return Promise.all([
          // Основные модули
          ...this.modules.critical.map(module => this.initModule(module)),
          // Внешние скрипты
          ...this.externals.map(script => this.loadScript(script))
      ]);
  },

  // Загрузка ленивых модулей
  loadLazyModules: function() {
      this.modules.lazy.forEach(module => {
          const observer = new IntersectionObserver((entries) => {
              if (entries[0].isIntersecting) {
                  observer.disconnect();
                  
                  // Загружаем зависимости
                  const deps = module.deps 
                      ? Promise.all(module.deps.map(dep => this.loadScript(dep)))
                      : Promise.resolve();
                  
                  // Инициализируем модуль
                  deps.then(() => this.initModule(module));
              }
          });
          
          const element = document.querySelector(module.trigger);
          if (element) observer.observe(element);
      });
  },

  // Основная инициализация
  init: function() {
      // 1. Cookie Consent и метрика
      this.initCookieConsent();

      // 2. Критические модули
      this.loadCriticalModules()
          .then(() => {
              console.log('Critical modules loaded');
              // 3. Ленивые модули
              this.loadLazyModules();
          })
          .catch(err => {
              console.error('Initialization error:', err);
              if (window.Swal) {
                  Swal.fire('Ошибка', 'Не удалось загрузить некоторые компоненты', 'error');
              }
          });
  }
};

// Запуск приложения
if (document.readyState === 'complete') {
  App.init();
} else {
  document.addEventListener('DOMContentLoaded', () => App.init());
}