import * as THREE from 'three';
import {
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    PlaneGeometry,
    Shape,
    ShapeBufferGeometry,
    SpotLight,
    TextureLoader,
    Vector3
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ProjectEntities, ProjectItem } from '../../../core/projects/projects';
import { ThreeBaseComponent } from './three';


interface Room {
    x: number;
    y: number;
    wallsPoints: Vector3[];
}


export class ProjectViewComponent extends ThreeBaseComponent {
    createRoomsPoints(items: ProjectItem[]): Room[] {
        const roomsPoints: Room[] = [];
    
        items.forEach((item: ProjectItem) => {
            if (item.className === ProjectEntities.Room) {
                const room: Room = {
                    x: item.x,
                    y: item.y,
                    wallsPoints: this.createWallPoints(item.items, [])
                };
                
                roomsPoints.push(room);
            }
        });
    
        return roomsPoints;
    }

    render(args: {rooms: Room[], texturePath: string} ) {
        const { rooms , texturePath } = args;

        this.createGround(texturePath);
        this.createShape(rooms);

        const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
        camera.up.set(0, 0, 1);
        camera.position.z = 3000;

        const controls = new OrbitControls(camera, this.renderer.domElement);

        const spotLight = new SpotLight(0xffffff);
        spotLight.position.set(10000, 10000, 10000);
        this.scene.add(spotLight);
    
        this.renderer.render(this.scene, camera);

        this.animate(controls, camera);
    }

    private animate(controls: OrbitControls, camera: PerspectiveCamera): void {
        requestAnimationFrame(() =>{
            this.animate(controls, camera);
        });

        controls.update();
        this.renderer.render(this.scene, camera);
    };

    private findMaxPoint(rooms: Room[], key: string): number {
        let maxPoint = 0;
    
        rooms.forEach((room: any) => {
            if (maxPoint < room[key]) {
                maxPoint = room[key];
            }
        });
    
        return maxPoint;
    };

    private createGround(texturePath: string): void {
        const loader = new TextureLoader();

        loader.load(`https://static.planner5d.com/textures/${texturePath}`, texture => {
            texture.repeat.set(30, 30);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;

            const grid = new Mesh(
                new PlaneGeometry(10000, 10000),
                new MeshBasicMaterial({ map: texture })
            );
    
            grid.position.z = 0;

            this.scene.add(grid);
        });
    }

    private createShape(rooms: Room[]): void {
        // const colors - for example
        const colors = [ 'green', 'white', 'yellow', 'red', 'brown', 'blue', 'orange', 'purple', 'pink'];
        const maxPointX = this.findMaxPoint(rooms, 'x');
        const maxPointY = this.findMaxPoint(rooms, 'y');

        rooms.forEach((room: any, i: number) => {
            const geomShape = new ShapeBufferGeometry(new Shape(room.wallsPoints));
            const matShape = new MeshBasicMaterial({color: colors[i]});
            const shape = new Mesh(geomShape, matShape);
            shape.position.x = -maxPointX + room.x;
            shape.position.y = -maxPointY + room.y;
            shape.position.z = 1;
    
            this.scene.add(shape);
        });
    }

    private createWallPoints(items: ProjectItem[], points: Vector3[] = []): Vector3[] {
        items.forEach((item: any) => {
            if (item.className === ProjectEntities.Wall) {
                this.createWallPoints(item.items, points);
            }
    
            if (item.className === ProjectEntities.Point) {
                points.push(new Vector3(item.x, item.y, 0));
            }
        });
    
        return points;
    }
}