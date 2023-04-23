import "./App.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import button from "./../assets/images/icon-arrow.svg";

const numberOfDaysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

function App() {
  const [data, setData] = useState({});

  const formik = useFormik({
    initialValues: {
      year: "",
      month: "",
      day: "",
    },
    validationSchema: Yup.object({
      day: Yup.number()
        .test("isValidDay", "Must be a valid day", function (value) {
          const { month, year } = this.parent;
          if (!month || !year) {
            return true;
          }
          const daysInMonth = new Date(year, month, 0).getDate();
          return value > 0 && value <= daysInMonth;
        })
        .min(1, "Must be a valid day")
        .required("This field is required")
        .integer("Must be a valid day"),
      month: Yup.number()
        .lessThan(13, "Must be a valid month")
        .moreThan(0, "Must be a valid month")
        .required("This field is required")
        .integer("Must be a valid month"),
      year: Yup.number()
        .lessThan(new Date().getFullYear() + 1, "Must be in the past")
        .required("This field is required")
        .integer("Must be in the past"),
    }),
    onSubmit: (values) => {
      setData(values);
    },
  });

  const birthDate = new Date(data.year, data.month, data.day);
  const today = new Date();

  const diffTime = Math.abs(today - birthDate);
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  const diffMonths = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)
  );
  const diffDays = Math.floor(
    (diffTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="main-section">
      <div className="card">
        <div className="form">
          <form onSubmit={formik.handleSubmit}>
            <div className="flex flex-col relative">
              <label
                htmlFor="day"
                className={
                  formik.touched.day && formik.errors.day ? "red-text" : ""
                }
              >
                Day
              </label>
              <input
                id="day"
                name="day"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.day}
                placeholder="DD"
                className={
                  formik.touched.day && formik.errors.day ? "red-border" : ""
                }
              />
              {formik.touched.day && formik.errors.day ? (
                <div className="error">{formik.errors.day}</div>
              ) : null}
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="month"
                className={
                  formik.touched.month && formik.errors.month ? "red-text" : ""
                }
              >
                Month
              </label>
              <input
                id="month"
                name="month"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.month}
                placeholder="MM"
                className={
                  formik.touched.month && formik.errors.month
                    ? "red-border"
                    : ""
                }
              />
              {formik.touched.month && formik.errors.month ? (
                <div className="error">{formik.errors.month}</div>
              ) : null}
            </div>
            <div className="flex flex-col relative">
              <label
                htmlFor="year"
                className={
                  formik.touched.year && formik.errors.year ? "red-text" : ""
                }
              >
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
                placeholder="YYYY"
                className={
                  formik.touched.year && formik.errors.year ? "red-border" : ""
                }
              />
              {formik.touched.year && formik.errors.year ? (
                <div className="error">{formik.errors.year}</div>
              ) : null}
            </div>
          </form>
          <div className="button-container">
            <button
              type="button"
              className="button"
              onClick={formik.handleSubmit}
            >
              <img src={button} alt="button"></img>
            </button>
          </div>
        </div>
        <div className="result">
          <div>
            {!data.year && <span>--</span>}
            {data.year && <span>{diffYears}</span>} years
          </div>
          <div>
            {!data.month && <span>--</span>}
            {data.month && <span>{diffMonths}</span>} months
          </div>
          <div>
            {!data.day && <span>--</span>}
            {data.day && <span>{diffDays}</span>} days
          </div>
        </div>
      </div>
      <div className="attribution">
        Challenge by
        <a
          href="https://www.frontendmentor.io?ref=challenge"
          target="_blank"
          rel="noreferrer"
        >
          Frontend Mentor
        </a>
        . Coded by <a href="#">Giedrius</a>.
      </div>
    </div>
  );
}

export default App;
