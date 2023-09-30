import React, { ReactNode, useState } from "react";
import styles from "./CreationCard.module.scss";

interface ICreationCard {
  title: string;
  text: string;
  children: ReactNode;
}

const CreationCard = (props: ICreationCard) => {
  const [editedTitle, setEditedTitle] = useState(props.title);
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Step 1: State for edit mode
  const [editedText, setEditedText] = useState(props.text); // Step 1: State for edited text
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [isColorMenuVisible, setColorMenuVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleBucketClick = () => {
    setColorMenuVisible(!isColorMenuVisible);
  };

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setColorMenuVisible(false);
  };

  // Step 2: Event handler to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Step 3: Event handler to save changes
  const handleSaveClick = () => {
    props.text = editedText; // You may need to update the parent component's state here
    setIsEditing(false);
  };
  


  // Step 2: Event handler to toggle visibility
  const handleDeleteClick = () => {
    console.log("Delete icon clicked"); // Add this line for testing
    setIsVisible(false);
  };

  const handleStarClick = () => {
    setIsStarClicked(!isStarClicked); // Step 2: Toggle star click
  };

  const colorOptions = [
    "#BAE2FF",
    "#FFCAB9",
    "#FF5733",
    "#9DD6FF",
    "#FFE8AC",
    "#B9FFDD",
    "#ECA1FF",
    "#DAFF8B",
    "#FFA285",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
    /* Add more color codes here */
  ];

  const cardStyle = {
    backgroundColor: selectedColor,
  };

  return isVisible ? (
    <div className={styles.CreationCard} style={cardStyle}>
      <div className={styles.header}> 
          <input
            type="text"
            placeholder="Enter Title"
            value={editedTitle}
            className={styles.title}
            onChange={(e) => setEditedTitle(e.target.value)}
          />

        {isStarClicked ? ( // Step 3: Conditionally render the desired star
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.star}
            onClick={handleStarClick} // Step 4: Toggle star click when clicking the star
          >
            <path
              d="M7.47998 7.50375L2.32617 8.29666L6.88529 11.9638L5.69595 17.5141L9.85865 14.3425L15.0125 17.5141L13.6249 11.9638L17.4903 8.29666L12.2373 7.50375L9.85865 2.34995L7.47998 7.50375Z"
              fill="#FFA000"
            />
            <path
              d="M9.93823 13.7112L6.29995 15.9077L7.25791 11.7662L4.04538 8.97947L8.28359 8.62145L9.93823 4.71223L11.5929 8.62145L15.8311 8.97947L12.6186 11.7662L13.5765 15.9077M19.6145 7.76026L12.6573 7.17001L9.93823 0.754639L7.2192 7.17001L0.261963 7.76026L5.53553 12.3371L3.9583 19.1396L9.93823 15.5303L15.9182 19.1396L14.3313 12.3371L19.6145 7.76026Z"
              fill="#455A64"
            />
          </svg>
        ) : (
          <svg
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.star}
            onClick={handleStarClick} // Step 4: Toggle star click when clicking the star
          >
            <path
              d="M9.93823 13.2503L6.29995 15.4469L7.25791 11.3054L4.04538 8.51865L8.28359 8.16063L9.93823 4.25142L11.5929 8.16063L15.8311 8.51865L12.6186 11.3054L13.5765 15.4469M19.6145 7.29944L12.6573 6.70919L9.93823 0.293823L7.2192 6.70919L0.261963 7.29944L5.53553 11.8763L3.9583 18.6787L9.93823 15.0695L15.9182 18.6787L14.3313 11.8763L19.6145 7.29944Z"
              fill="#455A64"
            />
          </svg>
        )}
        
      </div>
      <div className={styles.divider}></div>
      <textarea
        placeholder="Criar nota..."
        value={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        className={styles.editText}
        style={{ maxHeight: "200px", overflowY: "auto" }}
      />
      
      <div className={styles.content}>{props.children}</div>
    </div>
  ) : null;
};

export default CreationCard;
