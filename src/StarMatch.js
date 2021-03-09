import { useState } from "react";
import utils from './Utils';
import PlayNumber from './PlayNumber';
import StarsDisplay from './StarsDisplay';
import PlayAgain from './PlayAgain';

const StarMatch = () => {
    //const stars = utils.random(1, 9);
    // Changing stars to state element
    const [stars, setStars] = useState(utils.random(1, 9));
    const [availableNums, setAvailableNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);

    
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const gameIsdone = availableNums.length === 0;

    const resetGame = () => {
        setStars(utils.random(1, 9));
        setAvailableNums(utils.range(1, 9));
        setCandidateNums([]);
    };
    
    const numberStatus = (number) => {
        if (!availableNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available';
    };

    const onNumberClick = (number, currentStatus) => {
        // currentStatus => newStatus
        if (currentStatus === 'used') {
            return;
        }
        // candidateNums
        const newCandidateNums = 
            currentStatus === 'available' 
                ? candidateNums.concat(number)
                : candidateNums.filter(cn => cn !== number);
                
        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums);
        } else {
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            // Re-Draw stars (from what's avialable)
            setStars(utils.randomSumIn(newAvailableNums, 9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
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
                    {gameIsdone ? 
                        (<PlayAgain onClick={resetGame} />) 
                        : (<StarsDisplay count={stars}/>)
                    }
                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>( 
                        <PlayNumber 
                            key={number}
                            status={numberStatus(number)} 
                            number={number} 
                            onClick={onNumberClick}
                        />
                    ))}
                </div>
            </div>
            <div className="timer">Time Remaining: 10</div>
        </div>
    );
}


export default StarMatch;