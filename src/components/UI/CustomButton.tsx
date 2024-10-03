interface CustomButtonProps {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
}

const CustomButton = (props: CustomButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${props.width} ${
        props.height
      } px-4 py-2  text-white rounded-lg ${
        props.disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-purple-500 hover:bg-purple-600"
      } shadow-lg`}
      disabled={props.disabled}
      type={props.type || "button"}
    >
      {props.label}
    </button>
  );
};
export default CustomButton;
