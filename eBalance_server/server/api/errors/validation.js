const validationErrors = errors => (
  errors.reduce((fields, error) => {
    if (fields[error.path]) {
      fields[error.path].push(error.message);
    } else {
      fields[error.path] = [error.message];
    }

    return fields;
  }, {})
);

export default validationErrors;
