interface Props {
  name: string;
  textLabel?: string;
  type: string;
  defaultValue: string;
}

const FormRow = ({ name, textLabel, type, defaultValue }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {textLabel || name}
      </label>
      <input
        type={type}
        defaultValue={defaultValue || ""}
        id={name}
        className="form-input"
        required
      />
    </div>
  );
};
export default FormRow;
