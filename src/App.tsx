// import React from "react";
// import "./App.css";
// import ListPage from "./components/ListPage";
// import ListPlanets from "./components/ListPlanets";

// function App() {
//   return (
//     <div className="App ">
//       <h1 className="text-3xl font-bold underline">LIST PAGE</h1>
//       <ListPlanets />
//     </div>
//   );
// }

// export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListPlanets from "./pages/home/ListPlanets";
import DetailPlanet from "./pages/detailplanet/DetailPlanet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPlanets />} />
        <Route path="//https://swapi.dev/api/planets/:id" element={<DetailPlanet />} />
        {/* <Route path="/hotels/:id" element={<Hotel />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
