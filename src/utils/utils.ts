export const getFullUrl = (url: string) => {
    try {
        const repoUrl = new URL(url);
        return repoUrl.href;
    } catch(e) {
        return 'https://' + url;
    }
}

export const getHostName = (url: string) => {
    const repoUrl = new URL(getFullUrl(url));
    return repoUrl.hostname;
}

export const getOwnerAndRepo = (url: string) => {
    const repoURL = getFullUrl(url);
    const { pathname } = new URL(repoURL);
    const pathParts = pathname.split('/')
    if (pathParts[0] === '') {
        pathParts.shift();
    }
    const [owner, repo] = pathParts;
    return {owner, repo, repoURL};
}

export const cutString = (num: number) => {
    let str = num.toString();
    if (str.length > 3) {
        str = str.substring(0, str.length - 3);
        return str + ' K';
    }
    return str;
}