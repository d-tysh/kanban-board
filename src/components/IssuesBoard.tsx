import React from "react";
import { Flex, HStack, Link, Text } from "@chakra-ui/react";
import { IssuesBoardList } from "./IssuesBoardList";
import { useSelector } from "react-redux";
import { selectIsError, selectIsLoading, selectIssues, selectRepoDetails } from "../redux/issues/selectors";
import { IIssue, IReduceIssues } from "../interfaces/interfaces";
import { Loader } from "./Loader";
import { cutString } from "../utils/utils";

export const IssuesBoard = () => {
    const issues = useSelector(selectIssues);
    const repoDetails = useSelector(selectRepoDetails);
    const isLoading = useSelector(selectIsLoading);
    const isError = useSelector(selectIsError);

    const { issuesToDo, issuesInProgress, issuesDone } = issues.reduce((acc: IReduceIssues, current: IIssue) => {
        if (current.state === 'open') acc.issuesToDo.push(current);
        if (current.state === 'inProgress') acc.issuesInProgress.push(current);
        if (current.state === 'done') acc.issuesDone.push(current);
        return acc;
    }, { issuesToDo: [], issuesInProgress: [], issuesDone: [] })

    return (
        <>
            {isLoading && <Loader />}
            {
                !isLoading && !isError && repoDetails &&
                <Flex gap={20}>
                    <Text>
                        <Link data-cy='link-owner' href={repoDetails.owner.html_url} target="_blank" >
                            {repoDetails.owner.login}
                        </Link>
                        &nbsp;&#62;&nbsp;
                        <Link data-cy='link-repo' href={repoDetails.html_url} target="_blank" >
                            {repoDetails.name}
                        </Link>
                    </Text>
                    <Text data-cy='rating-repo'>&#11088; {cutString(repoDetails.stargazers_count)}</Text> 
                </Flex>
            }
            {
                !isLoading && !isError && issues.length ?
                    <HStack spacing={24} alignItems='start' justifyContent='space-between'>
                        <IssuesBoardList listId='open' issues={issuesToDo} title='ToDo' />
                        <IssuesBoardList listId='inProgress' issues={issuesInProgress} title='In Progress' />
                        <IssuesBoardList listId='done' issues={issuesDone} title='Done' />
                    </HStack>
                    : null
            }
            {isError && <Text>No data for this query.</Text>}
        </>
    )
}
