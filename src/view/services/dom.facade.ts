class DomFacade {
    createElement(tagName: keyof HTMLElementTagNameMap): HTMLElement {
        return document.createElement(tagName);
    }

    removeElement(className: string): void {
        const element: HTMLElement = this.getElementByClass(className);

        element?.remove();
    }

    getElementByClass(className: string): HTMLElement {
        return document.querySelector(className);
    }

    appendChild(parentElement: HTMLElement, childElement: HTMLElement): void {
        parentElement?.appendChild(childElement)
    }

    appendElements(parentElement: HTMLElement, childElements: HTMLElement[]): void {
        parentElement?.append(...childElements);
    }
    
    setTextToElement(element: HTMLElement, text: string): void {
        element.textContent = text;
    }

    addClass(element: HTMLElement, className: string): void {
        element?.classList.add(className);
    }

    removeClass(element: HTMLElement, className: string): void {
        element?.classList.remove(className);
    }

    hasClass(element: HTMLElement, className: string): boolean {
        return element?.classList.contains(className);
    }

    addEventListener<K extends keyof HTMLElementEventMap>(eventType: K, element: HTMLElement, func: (a: HTMLElementEventMap[K]) => void) {
        return element?.addEventListener(eventType, func);
    }

    removeEventListener<K extends keyof HTMLElementEventMap>(eventType: K, element: HTMLElement, func: (a: HTMLElementEventMap[K]) => void) {
        return element?.removeEventListener(eventType, func);
    }

    setAttribute(element: HTMLElement, attributeName: string, value: string): void {
        element?.setAttribute(attributeName, value);
    }

    getValueByAttribute(element: HTMLElement, attributeName: string): string {
        return element?.getAttribute(attributeName);
    }
}

export const domFacade = new DomFacade();