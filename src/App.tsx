import React from 'react';
import './App.css'
import { Box } from '@chakra-ui/react'
import { IssuesBoard } from './components/IssuesBoard';
import { Header } from './components/Header';
import { createStandaloneToast } from '@chakra-ui/react'

const { ToastContainer } = createStandaloneToast()

export const App = () => {
  return (
    <Box p="16" w="800px">
      <Header />
      <IssuesBoard />
      <ToastContainer />
    </Box>
  )
}

export default App;