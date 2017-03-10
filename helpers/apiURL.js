export function replaceParams(url, params) {
    return url.replace(/{([0-9]+)}/g, (wholematch, firstmatch) =>
        params[(+firstmatch)]
    );
}
