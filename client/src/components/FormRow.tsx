interface Props {
  name: string;
  textLabel?: string;
  type: string;
  defaultValue: string;
  handlerFunction?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}

const FormRow = ({
  name,
  textLabel,
  type,
  defaultValue,
  handlerFunction,
}: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {textLabel || name}
      </label>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue || ""}
        id={name}
        className="form-input"
        required
        onChange={handlerFunction}
      />
    </div>
  );
};
export default FormRow;
