import { projectsStore } from '../store/projects/projects';
import { ProjectListPageComponent } from '../view/pages/project-list/project-list';
import { ProjectViewPageComponent } from '../view/pages/project-view/project-view';


class Router {
    getPageByRoute() {
        const route = window.location.hash;
        projectsStore.unsubscribe();
      
        document.body.innerHTML = '';
      
        if (route === '') {
            return new ProjectListPageComponent();
        }
      
        if (route.split('/').includes('#project')) {
            return new ProjectViewPageComponent();
        }
    
        return document.body.innerHTML = `<div>Page not found</div>`;
    }

    getQueryParams(): string {
        const route = window.location.hash;
        const splitedRoute = route.split('/');

        return splitedRoute?.[splitedRoute.length - 1];
    }
}

export const router = new Router();