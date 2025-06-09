import { Menu, X } from "lucide-react";

type Props = {
  open: boolean;
  toggle: () => void;
};

const ToggleButton = ({ open, toggle }: Props) => (
  <button onClick={toggle} className="block md:hidden text-yigit433-nightblue-light">
    {open ? <X size={28} /> : <Menu size={28} />}
  </button>
);

export default ToggleButton;