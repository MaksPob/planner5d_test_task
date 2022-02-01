import './style.scss';

import { createBaseComponent } from '../../services/component.builder';
import { domFacade } from '../../services/dom.facade';
import { projectApiService } from '../../../data-access/api-services/project.api.service';
import { router } from '../../../shared/router.service';
import { projectsStore } from '../../../store/projects/projects';
import { Component } from '../../types/component';
import { Project } from '../../../core/projects/projects';
import { ProjectViewComponent } from '../../services/three/project-view.component';


export class ProjectViewPageComponent implements Component {
    projectInfo: Project;

    constructor() {
        this.onInit();

        projectsStore.subscribe((data: any) => {
            this.projectInfo = data;

            this.createMain();
        });
    }

    onInit() {
        const projectHash = router.getQueryParams();

        projectApiService
            .getProjectList(projectHash)
            .then((data) => projectsStore.emit(data))
    }

    render(mainComponent: HTMLElement) {
        domFacade.appendChild(document.body, mainComponent);
    }

    private createMain(): void {
        const mainComponent = createBaseComponent('div', 'main');
        const headerComponent = createBaseComponent('h3', 'project-title');
        const amountEntitiesComponent = this.createAmountEntitiesComponent();

        domFacade.setTextToElement(headerComponent, this.projectInfo.projectTilte);
        
        domFacade.appendChild(mainComponent, headerComponent);
        domFacade.appendChild(mainComponent, amountEntitiesComponent);

        this.render(mainComponent);

        this.drawProjectRoomPolygons();
    }

    private createAmountEntitiesComponent(): HTMLElement {
        const projectStatisticsComponent = createBaseComponent('div', 'project-statistics');
        const amountEntitiesComponents = this.projectInfo.amountEntities.map(({ name, value}) => {
            const wrapperComponent = createBaseComponent('dl', 'project-statistics__dl');
            const labelComponent = createBaseComponent('dt', 'project-statistics__dt', `${name}: `);
            const valueComponent = createBaseComponent('dd', 'project-statistics__dd', value.toString());

            domFacade.appendChild(wrapperComponent, labelComponent);
            domFacade.appendChild(wrapperComponent, valueComponent);

            return wrapperComponent;
        });

        domFacade.appendElements(projectStatisticsComponent, amountEntitiesComponents);

        return projectStatisticsComponent;
    }

    private drawProjectRoomPolygons() {
        const projectViewComponent = new ProjectViewComponent();
        const points = projectViewComponent.createRoomsPoints(this.projectInfo.project.items[0].items);
        const argsData = {
            rooms: points,
            texturePath: this.projectInfo.project.ground.texture || 'bg_1_fill.png'
        };

        projectViewComponent.render(argsData);
    }
}