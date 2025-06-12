// Validate email format
exports.isEmailValid = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Validate phone number (international format)
exports.isPhoneValid = (phone) => {
  return /^\+?[0-9]{10,15}$/.test(phone);
};

// Validate password strength (at least 8 chars, 1 letter, 1 number)
exports.isPasswordStrong = (password) => {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};
