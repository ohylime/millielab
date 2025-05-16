import { StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import "./StarRating.css";
import { SetStateAction, useState } from "react";

interface StarRatingProps {
  rating: number | null;
  onUpdate?: Function;
  isDisabled?: boolean;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onUpdate,
  isDisabled = false,
}) => {
  const [hover, setHover] = useState<null | number>(null);

  const handleOnClick = (value: number) => {
    if (!isDisabled && onUpdate) {
      onUpdate(value);
    }
  };

  const onHover = (value: SetStateAction<number | null>) => {
    if (!isDisabled) {
      setHover(value);
    }
  };

  return (
    <div className="ratings">
      {Array.from(Array(5), (_, i) => {
        let value = i + 1;
        return (
          <label key={`star-${value}`} htmlFor="rating">
            <input
              name="rating"
              type="radio"
              value={value}
              disabled={isDisabled}
            />
            {(hover ?? rating ?? 0) >= value ? (
              <StarFilledIcon
                color="#646cff"
                onClick={() => handleOnClick(value)}
                onMouseEnter={() => {
                  onHover(value);
                }}
                onMouseLeave={() => {
                  setHover(null);
                }}
              />
            ) : (
              <StarIcon
                color="#646cff"
                onClick={() => handleOnClick(i)}
                onMouseEnter={() => {
                  onHover(value);
                }}
                onMouseLeave={() => {
                  setHover(null);
                }}
              />
            )}
          </label>
        );
      })}
    </div>
  );
};
