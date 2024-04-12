import { IIssue, IReduceIssues } from "../interfaces/interfaces";

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

export const getCreatedAt = (item: IIssue, setDate: (date: string) => void) => {
    const now = new Date();
        const createdAt = new Date(item.created_at);
        const result = ((now.getTime() - createdAt.getTime())/(1000 * 60 * 60));
        return result <= 24 ? setDate(`${Math.floor(result)} hours ago`) : setDate(`${Math.floor(result / 24)} days ago`);
}

export const getFilteredIssues = (issues: IIssue[]) => {
    return issues.reduce((acc: IReduceIssues, current: IIssue) => {
        if (current.state === 'open') acc.issuesToDo.push(current);
        if (current.state === 'inProgress') acc.issuesInProgress.push(current);
        if (current.state === 'done') acc.issuesDone.push(current);
        return acc;
    }, { issuesToDo: [], issuesInProgress: [], issuesDone: [] })
}