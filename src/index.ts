import { router } from './shared/router.service';
import './style.css';


document.addEventListener('DOMContentLoaded', () => {
  router.getPageByRoute();
});

window.addEventListener('hashchange', () => {
  router.getPageByRoute();
});