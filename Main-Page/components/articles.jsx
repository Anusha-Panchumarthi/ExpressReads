 import ArticleItem from "./articleItem";
import articleList from "./articleList";
import React from "react";


 export default function Articles(props){
     var myArticles
    if(props.method === "location"){
        var res = articleList.filter((ar)=>ar.location==="mumbai")
        myArticles = res.map((ar)=><ArticleItem key={ar.index} title={ar.title} date={ar.date} content={ar.content}/>)
    }
    else if(props.method === "date"){
        var newArticles = [...articleList]
        newArticles.sort(function(a,b){
            return new Date(b.date) - new Date(a.date);
          });
        myArticles = newArticles.map((ar)=><ArticleItem key={ar.index} title={ar.title} date={ar.date} content={ar.content}/>)
    }
    else if(props.method === "none"){
        myArticles = articleList.map((ar)=><ArticleItem key={ar.index} title={ar.title} date={ar.date} content={ar.content}/>)
    }
    else{
        myArticles = []
    }


     return(
         <>
         {myArticles}
         </>
        
     )  
}
  