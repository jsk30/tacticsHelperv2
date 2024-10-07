import { useState, useEffect } from 'react';
import axios from 'axios';
import UseAugmentList from './UseAugmentList'; // Assuming these are imported components
import UseTraitsList from './UseTraitsList';

/**
 * UseMatchCard component is used to render information about a specific match, including
 * the player's placement, game time, augments, and traits. It also displays the Little Legend
 * used by the player in that match.
 *
 * @component
 * @param {number} index - The index of the match (used for labeling the match as Game X).
 * @param {Object} info - Object containing the information about the match.
 * @param {number} info.placement - The placement of the player in the match.
 * @param {number} info.time_eliminated - The time the player was eliminated, in seconds.
 * @param {Array} info.augments - Array of augments chosen by the player in the match.
 * @param {Array} info.traits - Array of traits used by the player, containing trait name and tier information.
 * @param {number} info.traits[].tier_current - The current tier level of the trait.
 * @param {string} info.traits[].name - The name of the trait.
 * @param {string} companion - The ID of the Little Legend companion used by the player.
 *
 */
const UseMatchCard = ({ index, info, companion }) => {
  // sets Link to get the image link for Little Legend
  const [LLLink, setLink] = useState('');

  /**
   * Fetches the image of the Little Legend (Tactician) based on the companion ID.
   * Makes an API call to a local server to retrieve the Little Legend's image filename.
   * The image link is then set using `setLink`.
   *
   * @param {string} itemID - The ID of the tactician to get the image for.
   */
  function getTactician(itemID) {
    axios
      .get('http://localhost:4000/getLL', { params: { tactician: itemID } })
      .then((response) => {
        setLink(`https://ddragon.leagueoflegends.com/cdn/14.12.1/img/tft-tactician/` + response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Runs the getTactician function once when the component mounts
  useEffect(() => {
    getTactician(companion);
  }, [companion]);

  // Render the match card component
  return (
    <div className="matchCard">
      {/* Image of the Little Legend */}
      <img className="matchCard_img" src={LLLink} alt="" />
      <div className="matchCard_text">
        {/* Display the game index and match details */}
        Game {index + 1}
        <p>
          Placement: {info.placement} | Game Time:{' '}
          {Math.floor(info.time_eliminated / 60)}:
          {Math.round(info.time_eliminated % 60).toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false,
          })}
        </p>
        {/* List of augments used in the match */}
        <p>
          {info.augments.map((aInfo, aIndex) => (
            <>
              <UseAugmentList augName={aInfo} />
            </>
          ))}
        </p>
        {/* List of traits with current tier greater than 0 */}
        <p>
          {info.traits.map((tInfo, tIndex) =>
            tInfo.tier_current > 0 ? (
              <>
                <UseTraitsList traitName={tInfo.name} />
              </>
            ) : (
              <></>
            )
          )}
        </p>
      </div>
    </div>
  );
};

export default UseMatchCard;
