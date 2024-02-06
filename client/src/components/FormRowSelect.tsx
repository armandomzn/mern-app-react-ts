interface Props {
  labelText?: string;
  valueList: string[];
  name: string;
  defaultValue?: string;
}
const FormRowSelect = ({ labelText, name, defaultValue, valueList }: Props) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <select
        name={name}
        id={name}
        defaultValue={defaultValue}
        className="form-select"
      >
        {valueList.map((value) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
