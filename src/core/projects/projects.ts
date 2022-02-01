interface AmountEntitiy {
    name: string;
    value: number;
}

interface ProjectItem {
    className: string;
    x: number;
    y: number;
    z: number;
    items: ProjectItem[];
    ground?: {texture: string, color: string};
}

interface Project {
    projectTilte: string;
    amountEntities: AmountEntitiy[];
    project: ProjectItem;
}

enum ProjectEntities {
    Floor = 'Floor',
    Room = 'Room',
    Wall = 'Wall',
    Point = 'Point'
}

export { Project, ProjectItem, ProjectEntities };