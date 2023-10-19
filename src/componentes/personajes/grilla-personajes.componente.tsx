import { useAppDispatch, useAppSelector } from "../../store";
import "./grilla-personajes.css";
import TarjetaPersonaje from './tarjeta-personaje.componente';
import { useEffect } from "react";
import { GET_PERSONAJES } from "../../store/character/thunk";


// /**
//  * Grilla de personajes para la pagina de inicio
//  *
//  * Deberás agregar las funciones necesarias para mostrar y paginar los personajes
//  *
//  *
//  * @returns un JSX element
//  */
function GrillaPersonajes() {
  const { url, personajes, isLoading, error, favorites } = useAppSelector((state) => state.character);
  const favID = favorites.map((fav) => fav.id);
  const personajesFavoritos = personajes.map((personaje) => ({
    ...personaje,
    esFavorito: favID.includes(personaje.id),
  }));
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(GET_PERSONAJES(url));
  }, []);
  return (
    <div className="grilla-personajes">
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        personajesFavoritos?.map((personaje) => (
          <TarjetaPersonaje personaje={personaje} key={personaje.id} />
        ))
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default GrillaPersonajes;
