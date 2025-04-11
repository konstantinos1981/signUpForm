document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");

  const fields = {
    "first-name": {
      validate: value => /^[A-Za-z]{3,}[A-Za-z]*$/.test(value.trim()),
      error: "Name must be at least 3 characters.Cannot have special characters"
    },
    "last-name": {
      validate: value => /^[A-Za-z]{3,}[A-Za-z]*$/.test(value.trim()),
      error: "Name must be at least 3 characters.Cannot have special characters"
    },
    email: {
      validate: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      error: "Please enter a valid email"
    },
    dob: {
      validate: value => value !== "",
      error: "Please select your date of birth"
    },
    password: {
      validate: value =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value),
      error:
        "Password must be 8+ characters, include uppercase, number, and special character"
    },
    confirmPassword: {
      validate: value => value === document.getElementById("password").value,
      error: "Passwords do not match"
    },
    phone: {
      validate: value => /^[0-9\-\+\s\(\)]{7,15}$/.test(value),
      error: "Please enter a valid phone number"
    },
    terms: {
      validate: () => document.getElementById("terms").checked,
      error: "You must agree to the terms and conditions"
    }
  };

  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    let errorDiv = null;

    const formGroup = input.closest(".form-group");
    if (formGroup && formGroup.querySelector(".error")) {
      errorDiv = formGroup.querySelector(".error");
    } else if (
      input.parentElement &&
      input.parentElement.querySelector(".error")
    ) {
      errorDiv = input.parentElement.querySelector(".error");
    }

    if (errorDiv) errorDiv.textContent = message;
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
  }

  function clearError(inputId) {
    const input = document.getElementById(inputId);
    let errorDiv = null;

    const formGroup = input.closest(".form-group");
    if (formGroup && formGroup.querySelector(".error")) {
      errorDiv = formGroup.querySelector(".error");
    } else if (
      input.parentElement &&
      input.parentElement.querySelector(".error")
    ) {
      errorDiv = input.parentElement.querySelector(".error");
    }

    if (errorDiv) errorDiv.textContent = "";
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  }

  // Attach live validation listeners
  Object.keys(fields).forEach(id => {
    const input = document.getElementById(id);

    if (input.type === "checkbox") {
      input.addEventListener("change", () => {
        const valid = fields[id].validate(input.checked);
        valid ? clearError(id) : showError(id, fields[id].error);
      });
    } else {
      input.addEventListener("input", () => {
        const valid = fields[id].validate(input.value);
        if (id === "confirmPassword") {
          // Force recheck if password changes
          const confirmInput = document.getElementById("confirmPassword");
          const match =
            confirmInput.value === document.getElementById("password").value;
          match
            ? clearError("confirmPassword")
            : showError("confirmPassword", fields["confirmPassword"].error);
        } else {
          valid ? clearError(id) : showError(id, fields[id].error);
        }
      });
    }
  });

  // Final validation on submit
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    let isValid = true;

    Object.keys(fields).forEach(id => {
      const input = document.getElementById(id);
      const value = input.type === "checkbox" ? input.checked : input.value;
      const valid = fields[id].validate(value);
      if (!valid) {
        showError(id, fields[id].error);
        isValid = false;
      } else {
        clearError(id);
      }
    });

    if (isValid) {
      //We are ready to use the form data (eg send this to an API or send a verification text to the phone provided)
      alert("Form submitted successfully!");
      form.reset();
      document.querySelectorAll(".form-control").forEach(input => {
        input.classList.remove("is-valid");
      });
    }
  });
});
