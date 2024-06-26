import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IIssuesState } from "../../interfaces/interfaces";
import axios from "axios";

const baseURL = 'https://server-kanban-board.vercel.app';

export const fetchIssues = createAsyncThunk(
    'issues/fetchIssues',
    async ({owner, repo, repoURL}: {owner: string, repo: string, repoURL: string}, thunkAPI) => {

        const { issues } = thunkAPI.getState() as IIssuesState;

        const cachedData = issues.cachedData[repoURL];
        if (cachedData) {
            return cachedData;
        }

        try {
            const response = await axios.get(`${baseURL}/repos/${owner}/${repo}/issues`);
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
            const response = await axios.get(`${baseURL}/repos/${owner}/${repo}`);
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue((e as Error).message);
        }
    }
)

export const setIssueStatus = createAction<{id: number, status: string}>('issues/setIssueStatus');

export const setCurrBoard = createAction<string>('issues/setCurrBoard');

export const setCurrRepoUrl = createAction<string>('issues/setCurrRepoUrl');