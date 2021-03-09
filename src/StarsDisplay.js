import utils from './Utils';

const StarsDisplay = props => {
    return(
        // This is called React Frament Concept
        <>
        {utils.range(1, props.count).map(startId => 
            <div key={startId} className="star" />        
        )}
        </>
    );
}

export default StarsDisplay;