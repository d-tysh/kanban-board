import React from "react";
import { Box, Heading, List } from "@chakra-ui/react";
import { IssuesBoardItem } from  "./IssuesBoardItem";
import { IDragEvent, IIssuesBoardListProps } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { selectCurrBoard } from "../redux/issues/selectors";
import { useAppDispatch } from "../hooks";
import { setCurrBoard } from "../redux/issues/actions";

export const IssuesBoardList = ({issues, title, listId}: IIssuesBoardListProps) => {
    const currBoard = useSelector(selectCurrBoard);
    const dispatch = useAppDispatch();

    const handleDragOver = (e: IDragEvent) => {
        dispatch(setCurrBoard(listId));
        e.currentTarget.style.background = '#718096';
    }

    const handleLeaveAndDrop = (e: IDragEvent) => {
        e.currentTarget.style.background = '#E2E8F0';
    }

    return (
        <Box width={250}>
            <Heading as='h2' textAlign='center' mb={0}>{title} ({issues.length})</Heading>
            <List 
                data-cy='issues-list'
                p={10} m={0} border='2px solid gray' minH={500} textAlign='center' 
                color='#213547' bgColor='#E2E8F0' fontSize={12} 
                onDragOver={handleDragOver} onDragLeave={handleLeaveAndDrop} onDrop={handleLeaveAndDrop}
            >
                {
                    !issues.length ? <>No issues with status "{title}"...</> 
                    : issues.map(item => <IssuesBoardItem item={item} key={item.id} currBoard={currBoard}/>)
                }
            </List>
        </Box>
    )
}
