import React, { useState } from "react";
import styles from "./testimonial.module.scss";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

const testimonial = [
  {
    name: "Sarah T.",
    testimonial:
      "Enrolling my child at School Academy was the best decision I've made for their education! The dedicated teachers and innovative curriculum have ignited my child's passion for learning like never before.",
    role: "Software Engineer (lV)",
  },
  {
    name: "David M.",
    testimonial:
      "As a parent, I couldn't be happier with the nurturing environment and personalized attention my child receives at School Academy. It's truly a place where every student is valued and encouraged to thrive.",
    role: "Data Engineer",
  },
  {
    name: "Emily R.",
    testimonial:
      "School Academy goes above and beyond to create a well-rounded educational experience. From academics to extracurricular activities, my child is flourishing both academically and socially.",
    role: "Data Analyst",
  },
  {
    name: "Jessica L.",
    testimonial:
      "The sense of community at School Academy is unparalleled. The supportive teachers, involved parents, and engaged students create an environment where everyone feels like they belong.",
    role: "Software Engineer (Vlll)",
  },
  {
    name: "Ryan W.",
    testimonial:
      "Choosing School Academy for my child's education was the best investment in their future. The challenging yet supportive academic program has prepared them for success in college and beyond.",
    role: "Fullstack React Developer",
  },
  {
    name: "Amanda S.",
    testimonial:
      "I've watched my child grow and thrive at School Academy, both academically and personally. The emphasis on character development and leadership skills sets this academy apart from others.",
    role: "Network Engineer",
  },
  {
    name: "Daniel K.",
    testimonial:
      "The small class sizes at School Academy allow for individualized attention and meaningful connections between teachers and students. It's a place where every student's unique strengths are celebrated.",
    role: "Software Engineer",
  },
  {
    name: "Rachel C.",
    testimonial:
      "School Academy's commitment to academic excellence is evident in every aspect of the curriculum. My child is constantly challenged to reach their full potential and is encouraged to explore their passions.",
    role: "Software Engineer",
  },
  {
    name: "Jason P.",
    testimonial:
      "I'm grateful to School Academy for providing my child with a well-rounded education that extends beyond the classroom. The opportunities for growth and exploration have truly enriched their educational journey.",
    role: "Software Engineer",
  },
];
export default function Testimonial() {
  const [currentPage, setCurrenPage] = useState(1);

  const totalPages = Math.ceil(testimonial.length / 3);

  const handleNextPage = () => {
    setCurrenPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrenPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const paginatedTestimonials = testimonial.slice(
    (currentPage - 1) * 3,
    currentPage * 3
  );
  return (
    <div className={styles.container}>
      {/* <div className={styles.btnContainer}>
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          <TbChevronLeft size={40} />
        </button>
      </div> */}
      <div className={styles.gridContainer}>
        {paginatedTestimonials.map(({ name, testimonial, role }) => (
          <div key={name}>
            <p>{testimonial}</p>
            <span> {name}</span>
            <span className={styles.role}>{role}</span>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePrevPage}>
          <TbChevronLeft size={23} />
        </button>
        {paginatedTestimonials.map(({ name }, i) => (
          <button
            key={i}
            style={
              currentPage === i + 1
                ? { background: "#6f2da8", color: "#fff" }
                : { background: "#f5f5f5", color: "#ccc" }
            }
          >
            <span>{i + 1}</span>
          </button>
        ))}
        <button onClick={handleNextPage}>
          <TbChevronRight size={23} />
        </button>
      </div>
      {/* <div className={styles.btnContainer}>
        <button onClick={handleNextPage}>
          <TbChevronRight size={40} />
        </button>
      </div> */}
    </div>
  );
}
