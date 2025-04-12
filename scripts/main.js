// scripts/main.js
const App = {
    // Критические модули (загружаются сразу)
    criticalModules: [
      { name: 'modal', path: './modal.js' },
      { name: 'fullScroll', path: './full-scroll.js' },
      { name: 'header', path: './header.js' },
      { name: 'phoneInput', path: './phone-input.js' },
      { name: 'errorHandler', path: './error-handler.js' }
    ],
  
    // Ленивые модули (загружаются по необходимости)
    lazyModules: [
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
      },
      { 
        name: 'tgSendNumber', 
        path: './tg_send_number.js',
        trigger: '#phone-cta1' 
      }
    ],
  
    // Внешние зависимости
    externals: [
      { 
        name: 'sweetalert2', 
        url: 'https://cdn.jsdelivr.net/npm/sweetalert2@11',
        condition: () => typeof Swal === 'undefined' 
      },
      {
        name: 'dikidiWidget',
        url: 'https://dikidi.ru/assets/js/widget_record/widget2.min.js',
        condition: () => typeof DIKIDI === 'undefined'
      }
    ],
  
    // Загружает внешний скрипт
    loadScript: function(url) {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    },
  
    // Инициализирует модуль
    initModule: function(module) {
      return import(module.path)
        .then(m => {
          if (m.init) {
            return m.init();
          }
          return console.warn(`Модуль ${module.name} не экспортирует функцию init`);
        })
        .catch(err => console.error(`Ошибка в ${module.name}:`, err));
    },
  
    // Загружает все критические модули
    loadCritical: function() {
      return Promise.all([
        ...this.criticalModules.map(this.initModule.bind(this)),
        ...this.externals
          .filter(ext => ext.condition())
          .map(ext => this.loadScript(ext.url))
      ]);
    },
  
    // Загружает ленивые модули
    loadLazy: function() {
      this.lazyModules.forEach(module => {
        if (module.trigger && document.querySelector(module.trigger)) {
          const loadDeps = module.deps 
            ? Promise.all(module.deps.map(this.loadScript.bind(this)))
            : Promise.resolve();
  
          loadDeps.then(() => this.initModule(module));
        }
      });
    },
  
    // Инициализация Яндекс.Метрики
    initYandexMetrika: function() {
      if (window.ym) return;
      
      (function(m,e,t,r,i,k,a){
        m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
        m[i].l=1*new Date();
        for (var j = 0; j < document.scripts.length; j++) {
          if (document.scripts[j].src === r) { return; }
        }
        k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a);
      })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
  
      ym(100953767, "init", {
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true
      });
    },
  
    // Инициализация приложения
    init: function() {
      // 1. Инициализация Яндекс.Метрики
      this.initYandexMetrika();
  
      // 2. Загружаем критически важное
      this.loadCritical()
        .then(() => {
          console.log('Критические модули загружены');
          
          // 3. Загружаем ленивые модули
          this.loadLazy();
        })
        .catch(err => {
          console.error('Ошибка загрузки критических модулей:', err);
        });
    }
  };
  
  // Запуск приложения
  document.addEventListener('DOMContentLoaded', () => App.init());