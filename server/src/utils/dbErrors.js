const UNIQUE_VIOLATION = "23505";

const constraintMessages = {
  users_email_key: "Email already in use",
};

export const isUniqueViolation = (error) => error?.code === UNIQUE_VIOLATION;

export const messageForUniqueViolation = (error, fallback = "Resource already exists") => {
  if (error?.constraint && constraintMessages[error.constraint]) {
    return constraintMessages[error.constraint];
  }

  return fallback;
};
