# Kanban Board
This project aims to implement a GitHub repository issues viewer as a kanban board, allowing users to manage issues efficiently. Users can input a GitHub repository URL, load the repository's issues, and then organize them into columns representing different stages of completion.

## Requirements
1. User should enter repo URL in the input on top of the page and press "Load". For example: `https://github.com/facebook/react`.
2. App loads issues for the repo using Github API.
3. App contains 3 columns:
- ToDo (all new issues)
- In Progress (opened issues with assignee)
- Done (closed issues)

4. User should be able to drag-n-drop between the columns and change the order of issues.
5. Current issue position (column and order) should be stored between search and browser sessions. When the user loads issues for Repo1 -> Repo2 -> Repo1 he should see all changes he did for Repo1.
6. User should be able to visit the profile of the owner of the repo and visit the repo as well by links under the input.

## Technologies
React 18 with hooks, no classes
Typescript
UI library (on your choice): Chakra UI
State manager (on your choice): Redux-Toolkit
Testing (on your choice): Cypress


## Usage
To run this client app, follow these steps:
1. Clone this repository to your local machine.
2. Open the project folder.
3. Install NPM.
4. Start the project by "npm run dev".
3. Open the project using a development server.

You can see the working project at the link [d-tysh.github.io/kanban-board](https://d-tysh.github.io/kanban-board/).