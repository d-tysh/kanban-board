import React, { FormEvent } from "react";
import { Button, FormControl, Input, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react";
import { fetchIssues, fetchRepoDetails, setCurrRepoUrl } from "../redux/issues/actions";
import { useAppDispatch } from "../hooks";
import { getFullUrl, getHostName, getOwnerAndRepo } from "../utils/utils";
import axios from "axios";

export const Header = () => {
    const [repoUrl, setRepoUrl] = useState('');
    const urlRef = useRef<string>();
    const toast = useToast();
    
    const dispatch = useAppDispatch();

    const handleLoadRepo = (e: FormEvent) => {
        e.preventDefault();

        if (!repoUrl.length) {
            toast({title: 'Enter repo URL!', status: 'error', isClosable: true, duration: 3000});
            return;
        }

        if (urlRef.current === getFullUrl(repoUrl)) {
            toast({
                title: 'You have already got information from this repository.', 
                status: 'info', isClosable: true, duration: 3000 
            });
            return;
        }

        if (getHostName(repoUrl) !== 'github.com') {
            toast({title: 'You should enter URL from github.com!', status: 'warning', isClosable: true, duration: 3000});
            return;
        }

        urlRef.current = getFullUrl(repoUrl);
        getOwnerAndRepo(repoUrl);
        dispatch(setCurrRepoUrl(getFullUrl(repoUrl)));
        dispatch(fetchRepoDetails(getOwnerAndRepo(repoUrl)));
        dispatch(fetchIssues(getOwnerAndRepo(repoUrl)));
    };

    const btnClick = () => {
        axios.get('https://7eaa-178-54-169-15.ngrok-free.app/abc/api/movies', { 
            'headers': { 'ngrok-skip-browser-warning': 'Test' } 
        })
            .then(res => console.log(res))
            .catch(e => console.error(e));
    }

    return (
        <FormControl as='form' onSubmit={handleLoadRepo} display="flex" gap="8" justifyContent='center'>
            <Input
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder='Enter repo URL'
                width='100%'
                fontSize={16}
                padding={12}
                border="1px solid #CBD5E0"
                borderRadius={8}
                _hover={{ borderColor: "#718096" }}
                data-cy='input-search-repo'
            />
            <Button
                type="submit"
                bgColor="#CBD5E0"
                _hover={{ border: "1px solid #718096" }}
                data-cy='btn-search-repo'
            >
                Load issues
            </Button>
            <Button
                onClick={btnClick}
                bgColor="#CBD5E0"
                _hover={{ border: "1px solid #718096" }}
                data-cy='btn-search-repo'
            >
                Test
            </Button>
        </FormControl>
    )
}