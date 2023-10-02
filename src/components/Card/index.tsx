import React, { useState, useEffect } from "react";
import styles from "./Card.module.scss";
import { updateCardFavoriteStatus, deleteTodo, updateCardColor, updateCardText} from "../../lib/api"

interface ICard {
  id: string;
  title: string;
  text: string;
  favorite: boolean;
  color: string;
  onDataChange: () => void;
}

const Card = (props: ICard) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(false); // Step 1: State for edit mode
  const [editedText, setEditedText] = useState(props.text); // Step 1: State for edited text
  const [editedTitle, setEditedTitle] = useState(props.title); // Step 1: State for edited title
  const [isStarClicked, setIsStarClicked] = useState(false);
  const [isColorMenuVisible, setColorMenuVisible] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavorite, setIsFavorite] = useState(props.favorite); // Initialize with props.favorite

  const handleBucketClick = () => {
    setColorMenuVisible(!isColorMenuVisible);
  };

  const handleColorChange = async (color: string) => {
    try {
      // Update the local state with the selected color
      setSelectedColor(color);
      setColorMenuVisible(false);
      // Call the updateCardColor function to update the color on the server
      console.log("Color:", color)
      const updateColor = await updateCardColor(props.id, color);
      console.log(updateColor)
      props.onDataChange();
      // Handle API response and updated data as needed
    } catch (error) {
      console.error("Error updating card color:", error);
    }
  };

  // Step 2: Event handler to toggle edit mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };



  // Step 2: Event handler to toggle visibility
  const handleDeleteClick = async (cardId: string) => {
    try {
      await deleteTodo(cardId);
      props.onDataChange();
      // Handle success or update your component state as needed after the Todo is deleted.
    } catch (error) {
      console.error("Error deleting Todo:", error);
    }
  };

  const handleStarClick = async () => {
    try {
      // Toggle the isFavorite state locally
      const updatedIsFavorite = !isFavorite;

      // Update the favorite status in the component's state
      setIsFavorite(updatedIsFavorite);

      // Make a PUT request to update the favorite status on the server
      const response = await updateCardFavoriteStatus(props.id, updatedIsFavorite);

      console.log("API Response:", response);
      props.onDataChange();
      // Handle API response and updated data as needed
    } catch (error) {
      console.error("Error updating card favorite status:", error);
    }
  };

  useEffect(() => {
    if (!isEditing) {
      handleUpdateText(); // Automatically save text when exiting edit mode
    }
  }, [isEditing]); // Watch for changes in the isEditing state

  

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
    backgroundColor: props.color,
  };

  const handleUpdateText = async () => {
    try {
      // Call the updateCardText function to update the text on the server
      const response = await updateCardText(props.id, editedText);

      console.log("API Response:", response);
      props.onDataChange();
      // Handle API response and updated data as needed
    } catch (error) {
      console.error("Error updating card text:", error);
    }

    // Exit edit mode after updating text
    setIsEditing(false);
  };

  

  return(
    <div className={styles.Card} style={cardStyle}>
      <div className={styles.header}> 
        <h4>{editedTitle}</h4>

        {isFavorite === true ? ( // Step 3: Conditionally render the desired star
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
      {isEditing ? ( // Step 2: Conditionally render input in edit mode
        <textarea
          value={editedText}
          onChange={(e) => {
            setEditedText(e.target.value);
            setEditedTitle(props.title);
          }}
          className={styles.editText}
          style = {cardStyle}
        />
      ) : (
        <p>{editedText}</p> // Display text when not in edit mode
      )}

      <div className={styles.bottom}> 
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.pen} // You can add a CSS class to style the SVG
            onClick={handleEditClick} // Step 2: Toggle edit mode on pen click
          >
            <path
              d="M13.9443 9.16667L14.8321 10.0544L6.25656 18.6111H5.38767V17.7422L13.9443 9.16667ZM17.3443 3.5C17.1082 3.5 16.8627 3.59444 16.6832 3.77389L14.9549 5.50222L18.4966 9.04389L20.2249 7.31556C20.5932 6.94722 20.5932 6.33333 20.2249 5.98389L18.0149 3.77389C17.826 3.585 17.5899 3.5 17.3443 3.5ZM13.9443 6.51278L3.49878 16.9583V20.5H7.04045L17.486 10.0544L13.9443 6.51278Z"
              fill="#51646E"
            />
          </svg>

          <svg
            width="19"
            height="18"
            viewBox="0 0 19 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.bucket} // Unique class for the new SVG
            onClick={handleBucketClick}
          >
            <path
              d="M16.4957 11.5468C16.4957 11.5468 14.4957 13.7168 14.4957 15.0468C14.4957 15.5772 14.7064 16.086 15.0815 16.461C15.4565 16.8361 15.9652 17.0468 16.4957 17.0468C17.0261 17.0468 17.5348 16.8361 17.9099 16.461C18.285 16.086 18.4957 15.5772 18.4957 15.0468C18.4957 13.7168 16.4957 11.5468 16.4957 11.5468ZM2.70566 10.0468L7.49566 5.25681L12.2857 10.0468M14.0557 8.98681L5.11566 0.046814L3.70566 1.45681L6.08566 3.83681L0.935664 8.98681C0.345664 9.54681 0.345664 10.5168 0.935664 11.1068L6.43566 16.6068C6.72566 16.8968 7.11566 17.0468 7.49566 17.0468C7.87566 17.0468 8.26566 16.8968 8.55566 16.6068L14.0557 11.1068C14.6457 10.5168 14.6457 9.54681 14.0557 8.98681Z" fill="#51646E"/>
            <path d="M7.56462 15.0439L2.73462 10H12.302L7.56462 15.0439Z" fill="#FFA000"/>
          </svg>
          

          <svg
            width="14"
            height="15"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.delete} // Unique class for the second new SVG
            onClick={() => handleDeleteClick(props.id)}
          >
            <path
              d="M13.6146 2.29924L12.2909 0.975616L7.04337 6.22319L1.7958 0.975616L0.472168 2.29924L5.71974 7.54682L0.472168 12.7944L1.7958 14.118L7.04337 8.87045L12.2909 14.118L13.6146 12.7944L8.367 7.54682L13.6146 2.29924Z"
              fill="#51646E"
            />
          </svg>
      </div>
      {isColorMenuVisible && (
          <div className={styles.colorMenu}>
            {colorOptions.map((color, index) => (
            <div
              key={index}
              className={styles.colorOption}
              style={{ backgroundColor: color }}
              onClick={() => handleColorChange(color)} // Step 2: Trigger color change on click
            />
          ))}
            {/* Add more color options */}
          </div>
          )}
      <div className={styles.content}></div>
    </div>
  );
};

export default Card;
