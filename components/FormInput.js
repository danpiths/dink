export default function FormInput(props) {
  return (
    <div className="relative flex flex-col">
      <input
        type={props.type}
        name={props.for}
        id={props.for}
        placeholder={props.label}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="peer mt-3 rounded border border-gray-400 px-4 py-2 caret-gray-800 placeholder:opacity-0 placeholder-shown:mt-0 focus:border-gray-800 focus:outline-none"
      />
      <label
        htmlFor={props.for}
        className="absolute -top-3 text-sm text-gray-800 transition duration-300 ease-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-5 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400"
      >
        {props.label}
      </label>
    </div>
  );
}
