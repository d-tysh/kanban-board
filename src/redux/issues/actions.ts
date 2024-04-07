import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IIssuesState } from "../../interfaces/interfaces";
import axios from "axios";
// import { Octokit } from "octokit";

// const token = '';
// const octokit = new Octokit({
//     auth: token
// })

const baseURL = 'https://server-kanban-board.vercel.app';

export const fetchIssues = createAsyncThunk(
    'issues/fetchIssues',
    async ({owner, repo, repoURL}: {owner: string, repo: string, repoURL: string}, thunkAPI) => {

        const { issues } = thunkAPI.getState() as IIssuesState;

        const cachedData = issues.cachedData[repoURL];
        if (cachedData) {
            return cachedData;
        }

        // try {
        //     const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
        //         owner,
        //         repo,
        //         headers: {
        //             'X-GitHub-Api-Version': '2022-11-28'
        //         }
        //     })
        //     return response.data;
        // } catch (e) {
        //     return thunkAPI.rejectWithValue((e as Error).message);
        // }

        try {
            const response = await axios.get(`${baseURL}/repos/${owner}/${repo}/issues`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)

export const fetchRepoDetails = createAsyncThunk(
    'issues/fetchRepoDetails',
    async ({owner, repo}: {owner: string, repo: string}, thunkAPI) => {

        // try {
        //     const response = await octokit.request('GET /repos/{owner}/{repo}', {
        //         owner,
        //         repo,
        //         headers: {
        //             'X-GitHub-Api-Version': '2022-11-28'
        //         }
        //     })
        //     return response.data;
        // } catch (e) {
        //     return thunkAPI.rejectWithValue((e as Error).message);
        // }

        try {
            const response = await axios.get(`${baseURL}/repos/${owner}/${repo}`, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)

export const setIssueStatus = createAction<{id: number, status: string}>('issues/setIssueStatus');

export const setCurrBoard = createAction<string>('issues/setCurrBoard');

export const setCurrRepoUrl = createAction<string>('issues/setCurrRepoUrl');