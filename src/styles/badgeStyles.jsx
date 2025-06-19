import { MdStars, MdShield } from "react-icons/md";
import { GiNinjaHead } from "react-icons/gi";

export const badgeStyles = {
  legendary: {
    className: "badge-soft badge-error",
    icon: <MdStars size={14} />,
  },
  mythical: {
    className: "badge-soft badge-warning",
    icon: <MdShield size={14} />,
  },
  hasHiddenAbility: {
    className: "badge-soft badge-info",
    icon: <GiNinjaHead size={14} />,
  },
};
