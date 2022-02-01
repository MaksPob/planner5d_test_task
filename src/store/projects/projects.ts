import { StoreObserver } from '../services/store.base.observer';


class ProjectsStore extends StoreObserver {
    // Here may be any logic, for example: data enrichment and other
    // Data store must be immutable
}


export const projectsStore = new ProjectsStore();