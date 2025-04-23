

function InputField({label, id, value, onChange, error, type, step}) {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} id={id} value={value} onChange={onChange} step={step} />
      {error &&<span className="mensaje-error">{error}</span>}
    </div>
  )
}

export default InputField
