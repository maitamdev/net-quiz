/* ========================================
   NetQuiz - Simple SPA Hash Router
   ======================================== */

export class Router {
  constructor(app) {
    this.app = app;
    this.routes = {};
    this.currentPage = null;

    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  addRoute(path, handler) {
    this.routes[path] = handler;
    return this;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const hash = window.location.hash.slice(1) || '/';
    const path = hash.split('?')[0];

    // Parse query params
    const params = {};
    const queryString = hash.split('?')[1];
    if (queryString) {
      queryString.split('&').forEach(pair => {
        const [key, value] = pair.split('=');
        params[key] = decodeURIComponent(value || '');
      });
    }

    // Find matching route
    let handler = this.routes[path];

    // Try dynamic route matching
    if (!handler) {
      for (const [routePath, routeHandler] of Object.entries(this.routes)) {
        const routeParts = routePath.split('/');
        const pathParts = path.split('/');

        if (routeParts.length === pathParts.length) {
          const dynamicParams = {};
          let match = true;

          for (let i = 0; i < routeParts.length; i++) {
            if (routeParts[i].startsWith(':')) {
              dynamicParams[routeParts[i].slice(1)] = pathParts[i];
            } else if (routeParts[i] !== pathParts[i]) {
              match = false;
              break;
            }
          }

          if (match) {
            handler = routeHandler;
            Object.assign(params, dynamicParams);
            break;
          }
        }
      }
    }

    if (handler) {
      // Update active nav link
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const linkPage = link.dataset.page;
        if (
          (linkPage === 'landing' && path === '/') ||
          (linkPage && path.startsWith('/' + linkPage))
        ) {
          link.classList.add('active');
        }
      });

      // Close mobile menu
      document.getElementById('nav-links')?.classList.remove('open');
      document.getElementById('hamburger')?.classList.remove('active');

      // Remove exam mode class
      document.body.classList.remove('exam-mode');

      // Remove any exam timer bar
      document.querySelector('.exam-timer-bar')?.remove();

      // Render page
      this.app.innerHTML = '';
      const pageDiv = document.createElement('div');
      pageDiv.className = 'page-enter';
      this.app.appendChild(pageDiv);

      handler(pageDiv, params);
      this.currentPage = path;

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.navigate('/');
    }
  }
}
