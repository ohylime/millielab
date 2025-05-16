import { useState, ChangeEvent, FormEvent } from "react";
import { StarRating } from "../../components/starRatings/StarRating";
import "./MillieReview.css";
interface Review {
  title: string;
  body: string;
  rating: number | null;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <div className="review--card">
      <h5>{review.title}</h5>
      <StarRating rating={review.rating} isDisabled={true} />
      <p>{review.body}</p>
    </div>
  );
};

const sampleReview: Review = {
  title: "Sunny Tail Handless Leashes",
  body: "Best Leash ever! Stylish, durable, and easy to use. Millie has had this leash since she was a baby and we have gotten few more colors!",
  rating: 4,
};

const emptyFormData = { title: "", body: "", rating: null };

type FormErrors = {
  title?: string;
  body?: string;
  rating?: string;
};
function MillieReviews() {
  let [reviews, setReviews] = useState([sampleReview]);
  let [formData, setFormData] = useState<Review>(emptyFormData);
  let [errorState, setErrors] = useState({});

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]:
          name === "rating" ? (value === "" ? null : parseInt(value)) : value,
      };
    });
  };

  const handleRating = (newRating: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        rating: newRating ? parseInt(newRating) : null,
      };
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate
    let newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is Required";
    if (!formData.body.trim()) newErrors.body = "Required";
    if (formData.rating === null) newErrors.rating = "Required";

    // SetErrors
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setReviews(() => {
        return [...reviews, formData];
      });
      setFormData(emptyFormData);
    }
  };

  return (
    <div id="millie-review-app">
      <h3 className="rasa-mini-header"> Millie's Product Reviews</h3>

      <div className="review--content">
        <form className="review--form" onSubmit={handleSubmit}>
          <h5>Submit a Review</h5>
          <div className="review--input">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={handleFormChange}
              value={formData.title}
            />
            <span className="review--error">
              {errorState.title ? errorState.title : ""}
            </span>
          </div>
          <div className="review--input">
            <label htmlFor="ratings">Ratings</label>
            <StarRating rating={formData.rating} onUpdate={handleRating} />
            <span className="review--error">
              {errorState.rating ? errorState.rating : ""}
            </span>
          </div>
          <div className="review--input">
            <label htmlFor="title">Review</label>
            <textarea
              name="body"
              onChange={handleFormChange}
              value={formData.body}
            />
            <span className="review--error">
              {errorState.body ? errorState.body : ""}
            </span>
          </div>

          <button type="submit">Submit</button>
        </form>

        <div>
          <ul className="review--list">
            {reviews.map((each, i) => (
              <ReviewCard key={`review-${i}`} review={each} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MillieReviews;
