import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * UseTraitsList component is responsible for fetching and displaying the trait icon
 * based on the trait name provided as a prop. It makes an API call to retrieve the
 * appropriate icon and displays it.
 *
 * @component
 * @param {string} traitName - The name or ID of the trait to display the icon for.
 *
 */
const UseTraitsList = ({ traitName }) => {
  // sets the link to get the trait image
  const [traitLink, setLink] = useState('');

  /**
   * Fetches the image of the trait based on the trait name or ID.
   * Makes an API call to a local server to retrieve the trait's image filename.
   * The image link is then set using `setLink`.
   *
   * @param {string} traitID - The ID or name of the trait to get the image for.
   */
  function getTrait(traitID) {
    axios
      .get('http://localhost:4000/getTraitIcon', { params: { trait: traitName } })
      .then((response) => {
        setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-trait/` + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Runs the getTrait function once when the component mounts
  useEffect(() => {
    getTrait(traitName);
  }, [traitName]);

  // Render the trait image
  return <img src={traitLink} alt="" />;
};

export default UseTraitsList;
