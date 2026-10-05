const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmail(email) {
  return typeof email === "string" && EMAIL_RE.test(email);
}

function isValidPassword(password) {
  // Keep this simple for the project's scope: at least 8 characters.
  // Tighten these rules later if your SRS NFRs require more.
  return typeof password === "string" && password.length >= 8;
}

function isValidName(name) {
  return typeof name === "string" && name.trim().length >= 2;
}

function isValidRole(role) {
  // Only Attendee/Organizer can self-register. Admin accounts are
  // created separately (e.g. seeded or promoted by an existing Admin).
  return ["ATTENDEE", "ORGANIZER"].includes(role);
}

module.exports = { isValidEmail, isValidPassword, isValidName, isValidRole };
