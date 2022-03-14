import React from "react";
import styles from './styles/navbarStyle.module.css'
export default function Navbar(){
    return(
        <header>        
          <ul className={styles.navbar2}>
            <li>
              <a className={styles.navbar2_a} href="#">
                <h1 className={styles.logoText}><span style={{color: "#F687B3"}}>P</span>ress<span  style={{color: "#F687B3"}}>R</span>eads</h1>
              </a>
            </li>
            
            <div className={styles.navbar2_links}>
            <li>
              <a className={styles.navbar2_a} href="#">
                Home
              </a>
            </li>
            <li>
              <a className={styles.navbar2_a} href="#">
                Ministries
              </a> 
            </li>
            <li>
              <a className={styles.navbar2_a} href="#">
                Upload
              </a>
            </li>
            </div> 
        </ul> 
    </header>
    )
}