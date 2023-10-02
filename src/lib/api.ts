const API = "http://localhost:3333";

const endpoint = (path: string): string => API + path;

const get = async (path: string): Promise<any> => {
  return fetch(endpoint(path)).then((res) => res.json());
};

export const getTodos = async () => {
  return get("/todos");
};

export const updateCardFavoriteStatus = async (cardId: string, isFavorite: boolean): Promise<void> => {
  const url = endpoint(`/todos/${cardId}`); // Adjust the URL as needed based on your API's endpoint structure

  try {
    // Fetch the existing card data
    const existingCard = await getTodoById(cardId);

    // Extract the 'id' property from existingCard and create a new object without it
    const { id, ...updatedCard } = existingCard;
    
    // Add the modified favorite status to updatedCard
    updatedCard.favorite = isFavorite;

    // Make a PUT request to update the card on the server
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard), // Pass the updated card object without the ID
    });

    if (!response.ok) {
      throw new Error(`Failed to update card favorite status: ${response.statusText}`);
    }

    // If the PUT request is successful, no data is returned in the response.
    // You can handle this based on your API's response format.

  } catch (error) {
    throw new Error(`Error updating card favorite status: ${(error as Error).message}`);
  }
};

export const updateCardText = async (cardId: string, text: string): Promise<void> => {
  const url = endpoint(`/todos/${cardId}`); // Adjust the URL as needed based on your API's endpoint structure

  try {
    // Fetch the existing card data
    const existingCard = await getTodoById(cardId);

    // Extract the 'id' property from existingCard and create a new object without it
    const { id, ...updatedCard } = existingCard;
    
    // Add the modified favorite status to updatedCard
    updatedCard.text = text;

    // Make a PUT request to update the card on the server
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard), // Pass the updated card object without the ID
    });

    if (!response.ok) {
      throw new Error(`Failed to update card favorite status: ${response.statusText}`);
    }

    // If the PUT request is successful, no data is returned in the response.
    // You can handle this based on your API's response format.

  } catch (error) {
    throw new Error(`Error updating card favorite status: ${(error as Error).message}`);
  }
};




export const getTodoById = async (cardId: string): Promise<any> => {
  const url = endpoint(`/todos/${cardId}`); // Adjust the URL as needed based on your API's endpoint structure

  try {
    const response = await fetch(url, {
      method: "GET", // Use the GET method to retrieve a specific Todo
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch the Todo: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the retrieved Todo data

  } catch (error) {
    throw new Error(`Error fetching Todo: ${(error as Error).message}`);
  }
};

export const deleteTodo = async (cardId: string): Promise<void> => {
  const url = endpoint(`/todos/${cardId}`); // Adjust the URL as needed based on your API's endpoint structure

  try {
    // Make a DELETE request to delete the card on the server
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete the Todo: ${response.statusText}`);
    }

    // If the DELETE request is successful, you can handle the success as needed.

  } catch (error) {
    throw new Error(`Error deleting Todo: ${(error as Error).message}`);
  }
};

export const updateCardColor = async (cardId: string, newColor: string): Promise<void> => {
  const url = endpoint(`/todos/${cardId}`); // Adjust the URL as needed based on your API's endpoint structure

  try {
    // Fetch the existing card data
    const existingCard = await getTodoById(cardId);

    const { id, ...updatedCard } = existingCard;
    
    // Add the modified favorite status to updatedCard
    updatedCard.color = newColor;

    console.log(updatedCard)

    // Make a PUT request to update the card on the server
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCard), // Pass the updated card object with the new color
    });

    if (!response.ok) {
      throw new Error(`Failed to update card color: ${response.statusText}`);
    }

    // If the PUT request is successful, no data is returned in the response.
    // You can handle this based on your API's response format.

  } catch (error) {
    throw new Error(`Error updating card color: ${(error as Error).message}`);
  }
};

export const createCard = async (newCardData: any): Promise<any> => {
  const url = endpoint("/todos"); // Adjust the URL based on your API's endpoint structure

  try {
    // Make a POST request to create a new card
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCardData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create a new card: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Return the created card data

  } catch (error) {
    throw new Error(`Error creating a new card: ${(error as Error).message}`);
  }
};