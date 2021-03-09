import { useState } from "react";
import utils from './Utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';

const StarMatch = () => {
    //const stars = utils.random(1, 9);
    // Changing stars to state element
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [condidateNums, setCondidateNums] = useState([]);

    
    const candatesAreWrong = utils.sum(condidateNums) > stars;
    
    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }

        if (condidateNums.includes(number)) {
            return candatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const numberClick = (number, currentStatus) => {
        // currentStatus => newStatus
        if (currentStatus === 'used') {
            return;
        }
        // candidateNums
        const newCandidateNums = 
            currentStatus === 'available' 
                ? condidateNums.concat(number)
                : condidateNums.filter(cn => cn !== number);

        if (utils.sum(newCandidateNums) !== stars) {
            setCondidateNums(newCandidateNums);
        } else {
            const newAvialableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            // Re-Draw stars (from what's avialable)
             setStars(utils.randomSumIn(newAvialableNums));
            setAvailableNums(newAvialableNums);
            setCondidateNums([]);
        }
    };

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
                        <PlayNumber 
                            key={number}
                            status={numberStatus(number)} 
                            number={number} 
                            onClick={numberClick}
                        />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}


export default StarMatch;