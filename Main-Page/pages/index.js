import Head from 'next/head'
import Image from 'next/image'

import MainPg from '../components/mainpg'
import { ChakraProvider } from '@chakra-ui/react'
import ArticleItem from '../components/articleItem'
import Articles from '../components/articles'
import Navbar from '../components/navbar'

export default function Home() {
  return (
    <ChakraProvider>
       <div>
         <Navbar/>
          <MainPg />
       </div>
    </ChakraProvider>
   
  )
}
