import React from "react";
import styles from './styles/articleStyle.module.css'
import { Text, Box } from "@chakra-ui/react";
export default function ArticleItem(props){
    return(
        <div className={styles.mainDiv}>
            <Box className={styles.myBox} p="2rem">
                {/* <Text fontSize='2xl'>{props.title}</Text>
                <br/>
                <Text fontSize='md'>{props.date}</Text> */}
                <Text fontSize='lg'>{props.content}</Text>
            </Box>
        </div>
    )
}