import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Detail {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
}

// interface Detail {
//   url: string;

// }

const DetailPlanet: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Ambil ID dari URL menggunakan react-router-dom
  const [detail, setDetail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [rotation, setRotation] = useState<string>("");
  const [orbit, setOrbit] = useState<string>("");
  const [diameter, setDiameter] = useState<string>("");
  const [climate, setClimate] = useState<string>("");
  const [created, setCreated] = useState<string>("");
  const [edited, setEdited] = useState<string>("");
  const [residents, setResidents] = useState<string[]>([]);

  useEffect(() => {
    const fetchPlanetDetail = async () => {
      try {
        const res = await axios(`https://swapi.dev/api/planets/${id}`);
        setDetail(res.data.url);
        setName(res.data.name);
        setRotation(res.data.rotation_period);
        setOrbit(res.data.orbital_period);
        setDiameter(res.data.diameter);
        setClimate(res.data.climate);
        setResidents(res.data.residents);
        setCreated(res.data.created);
        setEdited(res.data.edited);
        console.log(res.data.url);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchPlanetDetail();
  }, [id]); // Gunakan ID sebagai dependensi agar useEffect dipanggil kembali saat ID berubah

  return (
    <div className="planet-detail flex flex-col items-center gap-24 border-2 border-orange-800">
      <h2 className="font-bold text-3xl text-orange-800 border-2 border-orange-500 mt-4 py-6 px-6">{name}</h2>
      <div>
        <strong>Rotation Period:</strong> {rotation}
      </div>
      <div>
        <strong>Orbital Period:</strong> {orbit}
      </div>
      <div>
        <strong>Diameter:</strong> {diameter}
      </div>
      <div>
        <strong>Climate:</strong> {climate}
      </div>
      {/* Continue displaying other properties */}
      <div>
        <strong>Residents:</strong>
        <ul className="flex flex-col">
          {residents.map((resident, index) => (
            <a href={resident} key={index}>
              {resident}
            </a>
          ))}
        </ul>
      </div>
      <div>
        <strong>Created:</strong> {new Date(created).toDateString()}
      </div>
      <div>
        <strong>Edited:</strong> {new Date(edited).toDateString()}
      </div>
    </div>
  );
};

export default DetailPlanet;
