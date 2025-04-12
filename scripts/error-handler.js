export function init() {
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    if (window.ym) {
      ym(100953767, 'reachGoal', 'JS_ERROR');
    }
  });

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled rejection:', event.reason);
  });

  console.log('ErrorHandler module initialized');
}