import { MdStars, MdShield } from "react-icons/md";
import { GiNinjaHead } from "react-icons/gi";

export function PokeCard({ name, isActive, badges }) {
  return (
    <div
      className={`rounded-lg shadow p-4 hover:scale-105 transition transform
        ${isActive ? "bg-grape-200 text-white" : "bg-white"}
        relative
      `}
    >
      {/* Badges en esquina superior derecha */}
      <div className="absolute top-2 right-2 flex gap-1">
        {badges?.legendary && (
          <div className="badge badge-soft badge-error flex items-center gap-1 text-xs px-2 py-0.5">
            <MdStars size={14} />
          </div>
        )}
        {badges?.mythical && (
          <div className="badge badge-soft badge-warning flex items-center gap-1 text-xs px-2 py-0.5">
            <MdShield size={14} />
          </div>
        )}
        {badges?.hasHiddenAbility && (
          <div className="badge badge-soft badge-info flex items-center gap-1 text-xs px-2 py-0.5">
            <GiNinjaHead size={14} />
          </div>
        )}
      </div>

      <p className="text-center font-medium capitalize">{name}</p>
    </div>
  );
}
