import { useEffect, useState } from "react";
import { getTodos } from "../../lib/api";
import {  CreationCard, Card, Search, Navbar } from "../../components";
import styles from "./Home.module.scss";
import { ITodo } from "../../types/Todo";

const HomePage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    const fetchTodos = async () => {
      const payload = await getTodos();
      setTodos(payload);
    };

    fetchTodos();
  }, []);

  const handleDataChange = async () => {
    // Whenever there's a data change (e.g., after POST, PUT, or GET),
    // you can re-fetch the data or update it as needed.
    const payload = await getTodos();
    setTodos(payload);
  };

  // Filter todos based on the search text and whether they are favorites
  const filteredTodosFav = todos.filter((todo) => {
    const titleMatch = todo.title.toLowerCase().includes(search.toLowerCase());
    const isFavorite = todo.favorite;

    if (showFavorites) {
      return titleMatch && isFavorite;
    } else {
      return titleMatch;
    }
  });

  const filteredTodosOut = todos.filter((todo) => {
    const titleMatch = todo.title.toLowerCase().includes(search.toLowerCase());
    

    
    return titleMatch;
    
  });

  const favorites = filteredTodosFav.filter((todo) => todo.favorite);
  const outros = filteredTodosOut.filter((todo) => !todo.favorite);

  // Sort the favorites and outros arrays alphabetically by title
  favorites.sort((a, b) => a.title.localeCompare(b.title));
  outros.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div>
    <Navbar title="CoreNote" onSearchChange={setSearch}/>
    <div className={styles.Home}>
      <main className={styles.main}>
        
        <div className={styles.centeredContainer}>
            <CreationCard title="Título" text="Criar nota..." favorite={false} onDataChange={handleDataChange} />
        </div>
        <div className={styles.gridCards}>
            {/* Render the favorites row only if there are favorite todos */}
            {favorites.length > 0 && (
              <div>
                <h4>Favorites</h4>
                <div className={styles.grid}>
                  
                  {favorites.map((favorite) => (
                    <Card
                      id={favorite.id.toString()}
                      title={favorite.title}
                      text={favorite.text}
                      favorite={favorite.favorite}
                      color={favorite.color}
                      onDataChange={handleDataChange}
                    ></Card>
                  ))}
                </div>
              </div>
            )}
            <div>
            <h4>Outros</h4>
            <div className={styles.grid}>
              
              {outros.map((outro) => (
                <Card
                    id={outro.id.toString()}
                  title={outro.title}
                  text={outro.text}
                  favorite={outro.favorite}
                  color={outro.color}
                  onDataChange={handleDataChange}
                ></Card>
              ))}
            </div>
            </div>
          </div>
      </main>
    </div>
    </div>
  );
};

export default HomePage;
