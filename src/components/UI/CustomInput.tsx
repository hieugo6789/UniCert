interface CustomInputProps {
    type: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
    width?: string;
    height?: string;
    placeholder: string;
    value?: string;
  }

const CustomInput = (props: CustomInputProps) => {
  return (
    <div className="mb-4">
            <input
              type={props.type}
              placeholder={props.placeholder}
              value={props.value}
              className={`${props.width} ${
        props.height
      } w-full px-4 py-2 border border-purple-300 rounded-lg placeholder:text-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400`}
                onChange={props.onChange}
                required={props.required}
            />
    </div>
  )
}

export default CustomInput
