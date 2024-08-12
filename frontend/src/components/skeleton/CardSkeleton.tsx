import "./cardSkeleton.scss";

const CardSkeleton = () => {
  return (
    <div className="cardSkeleton">
      <div className="cardSkeleton__image"></div>
      <div className="cardSkeleton__content">
        <div className="cardSkeleton__content__title"></div>
        <div className="cardSkeleton__content__description"></div>
        <div className="cardSkeleton__content__details"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
