import React, { ReactNode } from "react";
import styles from "./Navbar.module.scss";
import {  Search } from "../../components";
import { useEffect, useState } from "react";
import CoreLab from "../../images/CoreLab.png";
import SearchIcon from "../../images/search.svg";

interface INavbar {
  title: string;
  children: ReactNode;
}

const Navbar = (props: INavbar) => {
  const [search, setSearch] = useState<string>("");
  return (
    <div className={styles.Navbar}>
      <div className={styles.header}> 
        <div className={styles.threeElements}>
          <img src={CoreLab} alt="CoreNote" className={styles.image} />
          <h4>{props.title}</h4>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Pesquisar notas"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>  
          </div>
        </div>
        <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.delete} // Unique class for the second new SVG
          >
            <path
              d="M13.6146 2.29924L12.2909 0.975616L7.04337 6.22319L1.7958 0.975616L0.472168 2.29924L5.71974 7.54682L0.472168 12.7944L1.7958 14.118L7.04337 8.87045L12.2909 14.118L13.6146 12.7944L8.367 7.54682L13.6146 2.29924Z"
              fill="#51646E"
            />
          </svg>
        
      </div>

      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Navbar;
