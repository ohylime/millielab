import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { StarRating } from "../../components/starRatings/StarRating";
import { Review, ReviewCard } from "./components/ReviewCard";
import "./MillieReview.css";

const sampleReview: Review = {
  title: "Sunny Tail Handless Leashes",
  body: "Best Leash ever! Stylish, durable, and easy to use. Millie has had this leash since she was a baby and we have gotten few more colors!",
  rating: 4,
  id: "1",
};

const emptyFormData = { title: "", body: "", rating: null };

type FormErrors = {
  title?: string;
  body?: string;
  rating?: string;
};
function MillieReviews() {
  let [reviews, setReviews] = useState(() => {
    let data = localStorage.getItem("millieReviews");
    let parsed = data ? JSON.parse(data) : [];
    return parsed.length ? parsed : [sampleReview];
  });

  let [formData, setFormData] = useState(emptyFormData);
  let [errorState, setErrors] = useState({});

  useEffect(() => {
    localStorage.setItem("millieReviews", JSON.stringify(reviews));
  }, [reviews]);

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
        return [...reviews, { ...formData, id: crypto.randomUUID() }];
      });
      setFormData(emptyFormData);
    }
  };

  const removeReview = (id: string) => {
    const newReviews = reviews.filter((each: Review) => each.id !== id);
    setReviews(newReviews);
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
            {reviews.map((each) => (
              <ReviewCard key={each.id} review={each} remove={removeReview} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MillieReviews;
