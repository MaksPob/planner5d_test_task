export interface Component {
    onInit(): void;
    render(elements?: HTMLElement | HTMLElement[]): void;
}