import React from "react";
import { Heading, ListItem } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks";
import { setIssueStatus } from "../redux/issues/actions";
import { IIssue } from "../interfaces/interfaces";
import { useSelector } from "react-redux";
import { selectCurrBoard } from "../redux/issues/selectors";

export const IssuesBoardItem = ({item}: {item: IIssue, currBoard: string}) => {
    const [date, setDate] = useState('');
    const dispatch = useAppDispatch();
    const currBoard = useSelector(selectCurrBoard);

    useEffect(() => {
        const now = new Date();
        const createdAt = new Date(item.created_at);
        const result = ((now.getTime() - createdAt.getTime())/(1000 * 60 * 60));
        result <= 24 ? setDate(`${Math.floor(result)} hours ago`) : setDate(`${Math.floor(result / 24)} days ago`);
    }, [item.created_at])

    const setStatus = (id: number, status: string) => {
        dispatch(setIssueStatus({id, status}));
    }

    const handleDragEnd = () => {
        setStatus(item.id, currBoard);
    }

    return (
        <ListItem
            data-cy='issues-list-item'
            draggable={true}
            onDragEnd={handleDragEnd}
            className="list-item"
            border='4px solid'
            borderRadius={20}
            p={8}
            mb={12}
            wordBreak="break-word"
            bgColor='#F7FAFC'
            _hover={{ cursor: 'grab', bgColor: '#EDF2F7' }}
        >
            <Heading as='h3' m={0} maxWidth="100%">{item.title}</Heading>
            <p>#{item.number} created {date}</p>
            <p>
                <a href={item.user.html_url} target="_blank">{item.user.login}</a> | Comments: {item.comments}
            </p>
        </ListItem>
    )
}