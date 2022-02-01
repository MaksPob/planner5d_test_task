export const responseHandler = (res: Response) => {
    if (!res.ok) {
        document.body.innerHTML = `<div>Server error</div>`;
    }

    return res;
}
