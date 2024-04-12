import React from "react";
import { Heading, ListItem } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setIssueStatus } from "../redux/issues/actions";
import { IIssue } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { selectCurrBoard } from "../redux/issues/selectors";
import { getCreatedAt } from "../utils/utils";

export const IssuesBoardItem = ({item}: {item: IIssue, currBoard: string}) => {
    const [date, setDate] = useState('');
    const dispatch = useAppDispatch();
    const currBoard = useSelector(selectCurrBoard);

    useEffect(() => {
        getCreatedAt(item, setDate);
    }, [item])

    const setStatus = (id: number, status: string) => {
        dispatch(setIssueStatus({id, status}));
    }

    const handleDragEnd = () => {
        setStatus(item.id, currBoard);
    }

    return (
        <ListItem
            data-cy='issues-list-item'
            draggable={true} onDragEnd={handleDragEnd} 
            p={8} mb={12} wordBreak="break-word" bgColor='#F7FAFC' border='4px solid' borderRadius={20} 
            _hover={{ cursor: 'grab', bgColor: '#CBD5E0' }}
        >
            <Heading as='h3' m={0} maxWidth="100%">{item.title}</Heading>
            <p>#{item.number} created {date}</p>
            <p>
                <a href={item.user.html_url} target="_blank">{item.user.login}</a> | Comments: {item.comments}
            </p>
        </ListItem>
    )
}