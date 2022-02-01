import { domFacade } from './dom.facade';


export const createBaseComponent = (
    tagName: keyof HTMLElementTagNameMap,
    className?: string,
    innerText?: string,
    attrName?: string,
    attrValue?: string
): HTMLElement => {
    const component = domFacade.createElement(tagName);

    if (className) {
        domFacade.addClass(component, className);
    }

    if (innerText) {
        domFacade.setTextToElement(component, innerText);
    }

    if (attrName) {
        domFacade.setAttribute(component, attrName, attrValue);
    }

    return component;
};