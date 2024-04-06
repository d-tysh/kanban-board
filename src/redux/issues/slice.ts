import { createSlice } from "@reduxjs/toolkit";
import { fetchIssues, fetchRepoDetails } from "./actions";
import { IIssue, IIssuesInitState } from "../../interfaces/interfaces";

const issuesInitState: IIssuesInitState = {
    issuesList: [],
    loading: false,
    error: null,
    currBoard: '',
    repoDetails: null,
    currRepoUrl: '',
    cachedData: {}
}

const handlePending = (state: IIssuesInitState) => {
    state.issuesList = [];
    state.repoDetails = null;
    state.loading = true;
    state.error = null;
}

const handleRejected = (state: IIssuesInitState) => {
    state.loading = false;
    state.error = true;
}

const issuesSlice = createSlice({
    name: 'issues',
    initialState: issuesInitState,
    reducers: {
        setIssueStatus: (state, action) => {
            state.issuesList.forEach((issue: {id: number, state: string}) => {
                if (issue.id === action.payload.id) {
                    issue.state = action.payload.status;
                }
            });
            state.cachedData[state.currRepoUrl] = state.issuesList;
        },
        setCurrBoard: (state, action) => {
            state.currBoard = action.payload;
        },
        setCurrRepoUrl: (state, action) => {
            state.currRepoUrl = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchIssues.pending, handlePending)
            .addCase(fetchIssues.fulfilled, (state, action) => {
                state.issuesList = action.payload as IIssue[];
                state.cachedData[state.currRepoUrl] = action.payload as IIssue[];
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchIssues.rejected, handleRejected)

            .addCase(fetchRepoDetails.pending, handlePending)
            .addCase(fetchRepoDetails.fulfilled, (state, action) => {
                state.repoDetails = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchRepoDetails.rejected, handleRejected)
    }
})

export const issuesReducer = issuesSlice.reducer;