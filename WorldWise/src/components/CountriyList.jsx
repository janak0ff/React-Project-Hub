import Spinner from "./Spinner";
import styles from "./Css_Modules/CountryList.module.css";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../Contexts/CititesContext";

function CountryList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // create an array of unique countries
  // we use reduce to avoid having to create an empty array first
  // and then pushing to it
  // the initial value of the accumulator is an empty array
  // we use the map method to get an array of countries
  // we use the includes method to check if the country already exists in the array
  // if it doesn't exist, we add it to the array
  // the final value of the accumulator is the array of unique countries
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
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
