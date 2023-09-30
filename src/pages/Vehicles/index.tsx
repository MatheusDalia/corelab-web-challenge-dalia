import { useEffect, useState } from "react";
import { getVehicles } from "../../lib/api";
import {  CreationCard, Card, Search, Navbar } from "../../components";
import styles from "./Vehicles.module.scss";
import { IVehicle } from "../../types/Vehicle";

const VehiclesPage = () => {
  const [vehicles, setVehicles] = useState<IVehicle[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    const fetchVehicles = async () => {
      const payload = await getVehicles();
      setVehicles(payload);
    };

    fetchVehicles();
  }, []);

  console.log({ vehicles });

  return (
    <div className={styles.Vehicles}>
      <main className={styles.main}>
        <Navbar title="CoreNote">
        </Navbar>
        <div className={styles.centeredContainer}>
            <CreationCard title="Título" text="asdasdas"> </CreationCard>
        </div>
        <div className={styles.grid}>
        <Card title="Sandero Stepway" text="asdasdas">
        </Card>
        <Card title="Sandero Stepway" text="asdasdas">
        </Card>
        <Card title="Sandero Stepway" text="asdasdas">
        </Card>
        <Card title="Sandero Stepway" text="asdasdas">
        </Card>
        </div>
      </main>
    </div>
  );
};

export default VehiclesPage;
