import { IState } from "../../interfaces/interfaces";

export const selectIssues = (state: IState) => state.issues.issuesList;
export const selectIsLoading = (state: IState) => state.issues.loading;
export const selectIsError = (state: IState) => state.issues.error;
export const selectCurrBoard = (state: IState) => state.issues.currBoard;
export const selectRepoDetails = (state: IState) => state.issues.repoDetails;