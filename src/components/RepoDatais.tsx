import React from "react"
import { Flex, Text, Link } from "@chakra-ui/react"
import { cutString } from "../utils/utils"

export const RepoDetails = ({repoDetails}) => {
    return (
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
            <Text data-cy='rating-repo'>
                &#11088; {cutString(repoDetails.stargazers_count)}
            </Text>
        </Flex>
    )
}