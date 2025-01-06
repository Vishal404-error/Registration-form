const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.name) {
      errors.name = "Name is required";
    }
  
    if (!formData.qualification) {
      errors.qualification = "Qualification is required";
    }
  
    if (!formData.university) {
      errors.university = "University is required";
    }
  
    if (!formData.grade) {
      errors.grade = "Grade is required";
    }
  
    if (!formData.yearsOfStudy[0] || !formData.yearsOfStudy[1]) {
      errors.yearsOfStudy = "Years of Study range is required";
    }
  
    return errors;
  };
  
  export default validateForm;
  