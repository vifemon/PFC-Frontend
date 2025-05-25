import './inputField.css'

function InputField({label, id, value, onChange, error, type, ...props}) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} {...props} />
      {error &&<span className="mensaje-error">{error}</span>}
    </>
  )
}

export default InputField
