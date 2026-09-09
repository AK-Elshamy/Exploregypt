function Button({ children, onClick, type = 'button' }) {
  return (
    <button
      type={type}
      className="shared-button"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button