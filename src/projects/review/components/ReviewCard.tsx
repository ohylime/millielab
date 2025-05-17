import { Cross2Icon } from "@radix-ui/react-icons";
import { StarRating } from "../../../components";

export interface Review {
  id: string;
  title: string;
  body: string;
  rating: number | null;
}
export interface ReviewCardProps {
  review: Review;
  remove?: Function;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({ review, remove }) => {
  return (
    <div className="review--card">
      <div className="review--card-header">
        <h5>{review.title}</h5>
        {remove ? (
          <Cross2Icon
            className="review--card-close"
            onClick={() => remove(review.id)}
          />
        ) : (
          ""
        )}
      </div>
      <StarRating rating={review.rating} isDisabled={true} />
      <p>{review.body}</p>
    </div>
  );
};
