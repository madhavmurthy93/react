import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";

function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (cities.length === 0)
    return <Message message="Add your first city by clicking on a city on the map" />;
  const countries = cities.reduce((acc, city) => {
    if (!acc.some((country) => country.country === city.country)) {
      acc.push({ country: city.country, emoji: city.emoji });
    }
    return acc;
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
