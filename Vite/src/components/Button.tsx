interface Props {
  children: string;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark"
    | "link";
  onClick: () => void;
}

const Button = ({ children, onClick, color = "primary" }: Props) => {
  return (
    <div>
      <button onClick={onClick} type="button" className={`btn btn-${color}`}>
        {children}
      </button>
    </div>
  );
};

export default Button;
