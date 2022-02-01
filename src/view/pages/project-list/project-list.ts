import './style.css';
import { createBaseComponent } from '../../services/component.builder';
import { domFacade } from '../../services/dom.facade';
import { Component } from '../../types/component';


interface Project {
    title: string;
    hash: string;
}


export class ProjectListPageComponent implements Component {
    constructor() {
        this.onInit();
    }

    onInit() {
        const projectList = [
            {
                title: 'furniture store',
                hash: 'aad284d9b647e68cfd2f030b24e12039'
            },
            {
                title: 'Smells like Christmas! : Design battle contest',
                hash: 'e514e79a76618b3fac8489108fbd14a2'
            },
            {
                title: 'Tuscany Style',
                hash: '639d9358393987eb720c7588c7f2dd5d'
            },
            {
                title: 'Halloween : Design battle contest',
                hash: '045d9056cd3ff7b63be32578e80f40a9'
            },
            {
                title: 'Waiting for Christmas',
                hash: '007ef1ccc41f5debd441597232f7b4c9'
            }
        ];

        this.createMain(projectList);
    }

    render(mainComponent: HTMLElement) {
        domFacade.appendChild(document.body, mainComponent);
    }


    private createMain(projectList: Project[]): void {
        const mainComponent = createBaseComponent('div', 'main');
        const projectListComponent = this.createProjectListComponent(projectList);
      
        domFacade.appendChild(mainComponent, projectListComponent);

        this.render(mainComponent);
    }

    private createProjectListComponent(projectList: Project[]): HTMLElement {
        const listComponent = createBaseComponent('ul', 'project-list');
        const itemsComponent = projectList.map((project: Project) => {
            const itemComponent = createBaseComponent('li', 'project-list__item');
            const linkComponent = createBaseComponent('a', 'project-list__item-link', `${project.hash} ${project.title}`, 'href', `#project/${project.hash}`);
            itemComponent.appendChild(linkComponent);

            return itemComponent;
        });

        domFacade.appendElements(listComponent, itemsComponent);

        return listComponent;
    }
}