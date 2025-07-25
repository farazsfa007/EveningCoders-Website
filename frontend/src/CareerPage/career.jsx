/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { db } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const qualificationYearMap = {
  BCA: ["3rd Year", "Completed"],
  "B.Tech": ["2nd Year", "3rd Year", "4th Year", "Completed"],
  "B.Sc Computer Science": ["3rd Year", "Completed"],
  MCA: ["1st Year", "2nd Year", "Completed"],
};

const skillTagColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-red-500",
  "bg-yellow-500",
];

const FormField = ({ children, className = "" }) => (
  <motion.div
    className={`mb-4 ${className}`}
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
    }}
  >
    {children}
  </motion.div>
);

const CareerPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contactNumber: "",
    collegeName: "",
    qualification: "",
    year: "",
    passingYear: "",
  });

  const [skills, setSkills] = useState([]);
  const [currentSkill, setCurrentSkill] = useState("");
  const [yearOptions, setYearOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const options = qualificationYearMap[formData.qualification] || [];
    setYearOptions(options);
    if (formData.year && !options.includes(formData.year)) {
      setFormData((prev) => ({ ...prev, year: "" }));
    }
  }, [formData.qualification, formData.year]);

  useEffect(() => {
    if (formData.year !== "Completed") {
      setFormData((prev) => ({ ...prev, passingYear: "" }));
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.passingYear;
        return newErrors;
      });
    }
  }, [formData.year]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && currentSkill.trim()) {
      e.preventDefault();
      const newSkill = currentSkill.trim().toUpperCase();
      if (!skills.includes(newSkill)) {
        setSkills([...skills, newSkill]);
      }
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const validateForm = () => {
    let tempErrors = {};

    if (!formData.fullName.trim())
      tempErrors.fullName = "Full Name is required.";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      tempErrors.email = "Email is not valid.";
    }

    if (!formData.contactNumber.trim()) {
      tempErrors.contactNumber = "Contact Number is required.";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      tempErrors.contactNumber = "Contact Number must be 10 digits.";
    }

    if (!formData.collegeName.trim())
      tempErrors.collegeName = "College Name is required.";
    if (!formData.qualification)
      tempErrors.qualification = "Qualification is required.";
    if (!formData.year) tempErrors.year = "Year is required.";
    if (skills.length === 0)
      tempErrors.skills = "At least one skill is required.";

    if (formData.year === "Completed") {
      if (!formData.passingYear) {
        tempErrors.passingYear = "Passing Year is required.";
      } else {
        const year = parseInt(formData.passingYear, 10);
        const currentYear = new Date().getFullYear();
        if (
          !/^\d{4}$/.test(formData.passingYear) ||
          year < 1980 ||
          year > currentYear
        ) {
          tempErrors.passingYear = `Enter a valid year between 1980 and ${currentYear}.`;
        }
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      console.log("Form validation failed.");
      return;
    }

    const submissionData = {
      ...formData,
      skills,
      submittedAt: serverTimestamp(),
    };

    try {
      await addDoc(collection(db, "internshipApplications"), submissionData);
      console.log("Form Submitted to Firestore:", submissionData);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting to Firestore:", error);
      alert("Failed to submit form. Please try again later.");
    }
  };

  const handlePopupClose = () => {
    setIsSubmitted(false);
  };

  const inputStyle =
    "w-full p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 text-sm";
  const labelStyle =
    "block text-gray-700 dark:text-gray-300 mb-1 font-medium text-sm";
  const errorStyle = "text-red-600 text-xs mt-1";

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center justify-center p-4 dark:bg-gray-900 dark:text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="relative bg-white p-6 rounded-xl shadow-lg text-center max-w-sm dark:bg-gray-800"
        >
          <button
            onClick={handlePopupClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition"
            aria-label="Close"
          >
            <RxCross2 className="w-5 h-5" />
          </button>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.5,
              type: "spring",
              stiffness: 150,
            }}
          >
            <IoCheckmarkDoneCircleSharp className="w-20 h-20 text-green-500 mx-auto mb-4" />
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 text-sm dark:text-gray-300">
            Your application has been submitted. We'll be in touch soon!
          </p>
        </motion.div>
      </div>
    );
  }

  // Main form rendering
  return (
    <div
      id="career"
      className="relative w-full min-h-screen py-14 pb-10 bg-gray-100 dark:bg-black overflow-hidden" // Changed pt-24 to pt-20, light mode background added
    >
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        <div
          className="absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-none"
          style={{
            clipPath: "polygon(0 0, 100% 5%, 100% 100%, 0% 100%)",
          }}
        />
        <div className="hidden dark:block absolute inset-0 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)]" />
      </div>

      <div className="relative z-10 flex items-center justify-center px-4">
        <div className="w-full max-w-4xl mx-auto min-h-[80vh]">
          {" "}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl sm:text-5xl my-6 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
              Join Our Team
            </h1>
            <p className="text-purple-700 animate-bounce mt-2 text-base dark:text-purple-400">
              {" "}
              Apply for an internship and kickstart your career! 🚀
            </p>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl shadow-lg text-gray-900 dark:bg-gray-800 dark:text-white"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="visible"
            noValidate
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {" "}
              <FormField>
                <label htmlFor="fullName" className={labelStyle}>
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
                {errors.fullName && (
                  <p className={errorStyle}>{errors.fullName}</p>
                )}
              </FormField>
              <FormField>
                <label htmlFor="email" className={labelStyle}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
                {errors.email && <p className={errorStyle}>{errors.email}</p>}
              </FormField>
              <FormField>
                <label htmlFor="contactNumber" className={labelStyle}>
                  Contact Number
                </label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
                {errors.contactNumber && (
                  <p className={errorStyle}>{errors.contactNumber}</p>
                )}
              </FormField>
              <FormField>
                <label htmlFor="collegeName" className={labelStyle}>
                  College Name
                </label>
                <input
                  type="text"
                  id="collegeName"
                  name="collegeName"
                  value={formData.collegeName}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                />
                {errors.collegeName && (
                  <p className={errorStyle}>{errors.collegeName}</p>
                )}
              </FormField>
              <FormField>
                <label htmlFor="qualification" className={labelStyle}>
                  Qualification
                </label>
                <select
                  id="qualification"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className={inputStyle}
                  required
                >
                  <option value="" disabled>
                    Select Qualification
                  </option>
                  {Object.keys(qualificationYearMap).map((qual) => (
                    <option key={qual} value={qual}>
                      {qual}
                    </option>
                  ))}
                </select>
                {errors.qualification && (
                  <p className={errorStyle}>{errors.qualification}</p>
                )}
              </FormField>
              <FormField>
                <label htmlFor="year" className={labelStyle}>
                  Year of Study
                </label>
                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  className={inputStyle}
                  disabled={!formData.qualification}
                  required
                >
                  <option value="" disabled>
                    Select Year
                  </option>
                  {yearOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.year && <p className={errorStyle}>{errors.year}</p>}
              </FormField>
              {formData.year === "Completed" && (
                <FormField className="md:col-span-2">
                  <label htmlFor="passingYear" className={labelStyle}>
                    Year of Graduation
                  </label>
                  <input
                    type="number"
                    id="passingYear"
                    name="passingYear"
                    value={formData.passingYear}
                    onChange={handleInputChange}
                    className={inputStyle}
                    placeholder="e.g., 2023"
                    min="1980"
                    max={new Date().getFullYear()}
                    required
                  />
                  {errors.passingYear && (
                    <p className={errorStyle}>{errors.passingYear}</p>
                  )}
                </FormField>
              )}
              <FormField className="md:col-span-2">
                <label htmlFor="skills" className={labelStyle}>
                  Skills (press Enter to add)
                </label>
                <input
                  type="text"
                  id="skills"
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  className={inputStyle}
                  placeholder="e.g., React, Node.js, Python"
                />
                {errors.skills && <p className={errorStyle}>{errors.skills}</p>}
                <div className="flex flex-wrap gap-2 mt-2 min-h-[36px]">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      className={`flex items-center text-white text-xs font-medium px-2 py-1 rounded-full ${
                        skillTagColors[index % skillTagColors.length]
                      }`}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="ml-1 font-bold text-white hover:text-gray-200 text-sm"
                      >
                        &times;
                      </button>
                    </motion.div>
                  ))}
                </div>
              </FormField>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              className="text-center mt-6"
            >
              <button
                type="submit"
                className="w-full md:w-auto px-10 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-purple-400 transform hover:scale-105 transition-all duration-300 mb-5"
              >
                Apply Now
              </button>
            </motion.div>
          </motion.form>
        </div>
        
      </div>
      <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-10 text-center text-sm md:text-base leading-relaxed"
            >
              <p className="max-w-2xl mx-auto bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
                Join our team of passionate innovators and shape the future with
                us. At our company, we value creativity, collaboration, and
                continuous growth. Explore exciting career opportunities,
                develop your skills, and make a real impact. Start your journey
                today and become part of something extraordinary.
              </p>
            </motion.div>
    </div>
  );
};

export default CareerPage;
