// import React, { createContext, useState } from "react";

// export const ConvocatoriaContext = createContext();

// export const ConvocatoriaProvider = ({ children }) => {
//   const [convocatoria, setConvocatoria] = useState({
//     titulo: "",
//     fechaPublicacion: "",
//     fechaInicioInsc: "",
//     fechaFinInsc: "",
//     portada: "",
//     habilitada: true,
//     fechaInicioOlimp: "",
//     fechaFinOlimp: "",
//     maximoPostPorArea: 1,
//   });

//   const [areas, setAreas] = useState([]);

//   const agregarConvocatoria = (datos) => {
//     setConvocatoria({ ...convocatoria, ...datos });
//   };

//   const agregarArea = (area) => {
//     setAreas((prev) => [...prev, { ...area, categorias: [] }]);
//   };

//   const agregarCategoria = (indexArea, categoria) => {
//     setAreas((prev) =>
//       prev.map((area, idx) =>
//         idx === indexArea
//           ? { ...area, categorias: [...area.categorias, categoria] }
//           : area
//       )
//     );
//   };

//   const obtenerJSONFinal = () => ({
//     convocatoria,
//     areas,
//   });

//   return (
//     <ConvocatoriaContext.Provider
//       value={{
//         convocatoria,
//         areas,
//         agregarConvocatoria,
//         agregarArea,
//         agregarCategoria,
//         obtenerJSONFinal,
//       }}
//     >
//       {children}
//     </ConvocatoriaContext.Provider>
//   );
// };

// En ConvocatoriaContext.jsx
import { createContext, useState } from "react";

export const ConvocatoriaContext = createContext();

export const ConvocatoriaProvider = ({ children }) => {
  const [convocatoria, setConvocatoria] = useState({});

  // const agregarConvocatoria = (data) => {
  //   setConvocatoria(data);
  // };
  const agregarConvocatoria = (datos) => {
    setConvocatoria({ ...convocatoria, ...datos });
  };

  return (
    <ConvocatoriaContext.Provider value={{ convocatoria, agregarConvocatoria }}>
      {children}
    </ConvocatoriaContext.Provider>
  );
};
