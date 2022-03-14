import { FormControl, FormLabel, Input, Text, Button, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import React, { Component, useState } from "react";
import styles from './styles/mainstyle.module.css'
import Articles from './articles'
import ArticleItem from "./articleItem";

const axios = require('axios');

export default function MainPg(){

    const [myText, setText] = useState('')
     const [myUrl,  setUrl] = useState('')
    const [myRes, setRes] = useState('')
    
     async function handleSubmitUrl(evt){
        let payload = {url: `${myUrl}`};
        let res = await axios.post('http://127.0.0.1:8000/open_ai_summarise_url/', payload);
        let data = res.data;
        console.log(data.summary_from_url);
        setRes(data.summary_from_url)
    }

    var handleChangeUrl = (e)=>{
        setUrl(e.target.value)
    }
    
    return(
        <>
        <div className={styles.container}>
        <div  className={styles.form} >
        
        <FormControl>
            <FormLabel htmlFor="url">Enter URL: </FormLabel>
            <Input id="url" placeholder="www.example.com"type="text" size='md' mb='0.5rem' onChange={handleChangeUrl}/>

            OR
            <FormLabel htmlFor="mytxt"  mt='0.5rem'>Enter your text: </FormLabel>
            <Input id="mytxt" type="text" size='lg' />
            
            <Button colorScheme='pink' variant='outline' m='4' size='lg' onClick={handleSubmitUrl} >
                Submit
            </Button>
          

            <a href="https://garvit-g.github.io/sih/" target="_blank">View full site</a>

        </FormControl>
        </div>
    </div>
            
    {/* <Articles method="none"/> */}

    <ArticleItem content={myRes}/>
   
    </>
    )
}
