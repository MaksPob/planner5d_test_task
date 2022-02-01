import { Project, ProjectEntities, ProjectItem } from '../../core/projects/projects';


export class ProjectMapper {
    static fromJson(dto: any): Project {
        const projectTilte = dto?.items?.[0].name;
        const countedAmountEntities = this.countAmountEntities(dto?.items?.[0]?.data?.items);
        const amountEntities = [
            {
                name: 'Amount Floors',
                value: countedAmountEntities.amountFloors
            },
            {
                name: 'Amount Rooms',
                value: countedAmountEntities.amountRooms
            },
            {
                name: 'Amount Other Items',
                value: countedAmountEntities.amountOtherItems
            }
        ];

        return {
            projectTilte,
            amountEntities,
            project: dto?.items?.[0]?.data
        };
    }

    protected static countAmountEntities(
        items: ProjectItem[],
        projectInfo: Record<string, number> = {
            amountFloors: 0,
            amountRooms: 0,
            amountOtherItems: 0
        }
    ) {
        items.forEach((item: ProjectItem) => {
            if (item.className === ProjectEntities.Floor) {
                projectInfo.amountFloors += 1;
            }

            if (item.className === ProjectEntities.Room) {
                projectInfo.amountRooms += 1;
            }

            if (item.className !== ProjectEntities.Floor && item.className !== ProjectEntities.Room) {
                projectInfo.amountOtherItems += 1;
            }

            if (item.items) {
                this.countAmountEntities(item.items, projectInfo);
            }
        });

        return projectInfo;
    }
}