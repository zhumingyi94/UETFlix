import './RecommendationButton.css';

function RecommendationButton({onButtonClick}) {
    return (
        <div className="ButtonContainer">
            <button className="button-style">
                <img src="Btn.png" alt="icon" className="button-icon" />
                Get Recommendation
            </button>
        </div>
    );
}

export default RecommendationButton;