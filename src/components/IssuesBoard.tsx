import React from "react";
import { HStack, Text } from "@chakra-ui/react";
import { IssuesBoardList } from "./IssuesBoardList";
import { useSelector } from "react-redux";
import { selectIsError, selectIsLoading, selectIssues, selectRepoDetails } from "../redux/issues/selectors";
import { Loader } from "./Loader";
import { getFilteredIssues } from "../utils/utils";
import { RepoDetails } from "./RepoDatais";

export const IssuesBoard = () => {
    const issues = useSelector(selectIssues);
    const repoDetails = useSelector(selectRepoDetails);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    const { issuesToDo, issuesInProgress, issuesDone } = getFilteredIssues(issues);

    return (
        <>
            { isLoading && <Loader /> }
            { isError && <Text>No data for this query.</Text> }
            { !isLoading && !isError && repoDetails && <RepoDetails repoDetails={repoDetails} /> }
            {
                !isLoading && !isError && issues.length 
                ? <HStack spacing={24} alignItems='start' justifyContent='space-between'>
                    <IssuesBoardList listId='open' issues={issuesToDo} title='ToDo' />
                    <IssuesBoardList listId='inProgress' issues={issuesInProgress} title='In Progress' />
                    <IssuesBoardList listId='done' issues={issuesDone} title='Done' />
                </HStack>
                : null
            }
        </>
    )
}
