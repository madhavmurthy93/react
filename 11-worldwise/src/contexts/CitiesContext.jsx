import { createContext, useContext, useEffect, useReducer, useCallback } from "react";

const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, error, currentCity }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const controller = new AbortController();
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:5000/cities`, { signal: controller.signal });
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "rejected", payload: "There was an error loading the data" });
          alert("There was an error loading the data");
        }
        console.log(err);
      }
    };
    fetchCities();
    return () => controller.abort();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (id == currentCity.id) return;
      const controller = new AbortController();
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`http://localhost:5000/cities/${id}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        if (err.name !== "AbortError") {
          dispatch({ type: "rejected", payload: "There was an error loading the data" });
          alert("There was an error loading the data");
        }
        console.log(err);
      }
    },
    [currentCity.id]
  );

  async function createCity(city) {
    const controller = new AbortController();
    dispatch({ type: "loading" });
    try {
      const res = await fetch(
        `http://localhost:5000/cities`,
        {
          method: "POST",
          body: JSON.stringify(city),
          headers: {
            "Content-Type": "application/json",
          },
        },
        {
          signal: controller.signal,
        }
      );
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({ type: "rejected", payload: "There was an error creating the city" });
        alert("There was an error creating the city");
      }
      console.log(err);
    }
  }

  async function deleteCity(id) {
    const controller = new AbortController();
    dispatch({ type: "loading" });
    try {
      await fetch(
        `http://localhost:5000/cities/${id}`,
        {
          method: "DELETE",
        },
        {
          signal: controller.signal,
        }
      );
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      if (err.name !== "AbortError") {
        dispatch({ type: "rejected", payload: "There was an error deleting the city" });
        alert("There was an error deleting the city");
      }
      console.log(err);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, error, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (!context) {
    throw new Error("useCities must be used within a CitiesProvider");
  }
  return context;
}
export { CitiesProvider, useCities };
