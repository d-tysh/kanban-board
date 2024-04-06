export interface IIssue {
    id: number,
    number: number,
    state: string,
    title: string,
    user: {
        login: string,
        html_url: string
    },
    comments: number,
    created_at: string
}

export interface IIssuesState {
    issues: IIssuesInitState,
}

export interface IIssuesInitState {
    issuesList: IIssue[],
    loading: boolean,
    error: null | true,
    currBoard: string,
    currRepoUrl: string,
    repoDetails: null | {
        html_url: string,
        name: string,
        stargazers_count: number,
        owner: {
            login: string,
            html_url: string
        }
    },
    cachedData: {
        [key: string]: IIssue[]
    }
}

export interface IState {
    issues: IIssuesInitState
}

export interface IDragEvent {
    currentTarget: { 
        style: { 
            background: string; 
        }; 
    };
}

export interface IIssuesBoardListProps {
    issues: IIssue[], 
    title: 'ToDo' | 'In Progress' | 'Done',
    listId: string
}

export interface IReduceIssues {
    issuesToDo: Array<IIssue>, 
    issuesInProgress: Array<IIssue>, 
    issuesDone: Array<IIssue>
}