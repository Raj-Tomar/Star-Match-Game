import { useState } from "react";
import utils from './Utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';

const StarMatch = () => {
    //const stars = utils.random(1, 9);
    // Changing stars to state element
    const [stars, setStars] = useState(utils.random(1, 9));

    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that are some to the number of stars
            </div>
            <div className="body">
                <div className="left">
                    {/* {utils.range(1, stars).map(startId => 
                        <div key={startId} className="star" />        
                    )} */}
                    <StarsDisplay count={stars}/>
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number => 
                        <PlayNumber key={number} number={number} />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
  };


export default StarMatch;