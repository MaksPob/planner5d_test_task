import { Scene, WebGLRenderer } from 'three';


export abstract class ThreeBaseComponent {
    scene: Scene;
    renderer: WebGLRenderer;

    constructor() {
        this.renderer = new WebGLRenderer();
        this.scene = new Scene();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    abstract render(args: Record<string, any>): void;
}