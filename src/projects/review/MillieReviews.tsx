import { useState, ChangeEvent, FormEvent } from "react";
import { StarRating } from "../../components/StarRatings/StarRating";
import "./MillieReview.css";
interface Review {
  title: string;
  body: string;
  rating: number | null;
}

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

function MillieReviews() {
  let [reviews, setReviews] = useState([sampleReview]);
  let [formData, setFormData] = useState<Review>({
    title: "",
    body: "",
    rating: null,
  });
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
    if (!formData.body.trim()) newErrors.body = "Body is Required";
    if (formData.rating === null) newErrors.rating = "Rating is Required";

    // SetErrors
    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    } else {
      setErrors({});
      setReviews(() => {
        return [...reviews, formData];
      });
      setFormData({
        title: "",
        body: "",
        rating: null,
      });
    }
  };

  return (
    <div id="millie-review-app">
      Millie's Product Reviews
      <div className="review--content">
        <div>
          Reviews
          <ul className="review--list">
            {reviews.map((each, i) => (
              <ReviewCard key={i} review={each} />
            ))}
          </ul>
        </div>

        <form className="review--form" onSubmit={handleSubmit}>
          <h5>Submit a Review</h5>
          <div className="review--input">
            <label htmlFor="title">Title</label>
            <input
              name="title"
              type="text"
              onChange={handleFormChange}
              value={formData.title}
            ></input>
          </div>
          <div className="review--input">
            <label htmlFor="ratings">Ratings</label>
            <StarRating rating={formData.rating} onUpdate={handleRating} />
          </div>
          <div className="review--input">
            <label htmlFor="title">Review</label>
            <textarea
              name="body"
              onChange={handleFormChange}
              value={formData.body}
            ></textarea>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default MillieReviews;
