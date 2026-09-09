function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  )
}

export default ErrorMessage