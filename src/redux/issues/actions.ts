import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Octokit } from "octokit";
import { IIssuesState } from "../../interfaces/interfaces";

const token = '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';

const octokit = new Octokit({
    auth: token
})

export const fetchIssues = createAsyncThunk(
    'issues/fetchIssues',
    async ({owner, repo, repoURL}: {owner: string, repo: string, repoURL: string}, thunkAPI) => {

        const { issues } = thunkAPI.getState() as IIssuesState;

        const cachedData = issues.cachedData[repoURL];
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
                owner,
                repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)

export const fetchRepoDetails = createAsyncThunk(
    'issues/fetchRepoDetails',
    async ({owner, repo}: {owner: string, repo: string}, thunkAPI) => {

        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}', {
                owner,
                repo,
                headers: {
                    'X-GitHub-Api-Version': '2022-11-28'
                }
            })
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)

export const setIssueStatus = createAction<{id: number, status: string}>('issues/setIssueStatus');

export const setCurrBoard = createAction<string>('issues/setCurrBoard');

export const setCurrRepoUrl = createAction<string>('issues/setCurrRepoUrl');