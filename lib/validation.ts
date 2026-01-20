export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Invalid email format";
  return null;
};

export const validatePassword = (password: string): string | null => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain a number";
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^01[3-9]\d{8}$/; // Bangladesh phone format
  if (!phone) return "Phone number is required";
  if (!phoneRegex.test(phone))
    return "Invalid phone number (must be 11 digits starting with 01)";
  return null;
};

export const validateName = (name: string): string | null => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters";
  if (!/^[a-zA-Z\s]+$/.test(name)) return "Name can only contain letters";
  return null;
};

export const validateServicePrice = (price: string): string | null => {
  const priceNum = parseFloat(price);
  if (!price) return "Price is required";
  if (isNaN(priceNum)) return "Price must be a number";
  if (priceNum <= 0) return "Price must be greater than 0";
  return null;
};
