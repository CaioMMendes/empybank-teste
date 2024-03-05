import iconSvg from "/iconSvg.svg";
import AppLinks from "./app-links";
import ConfigLinks from "./config-links";

const Sidebar = () => {
  return (
    <div className=" flex w-fit flex-col items-center gap-[1.4375rem] bg-layout-surface shadow-[0px_2px_6px_2px_#00000026,0px_0px_1px_2px_#0000004D] sm:p-1.5 md:p-6">
      <img
        src={iconSvg}
        alt="Empybank logo icon"
        className="mb-6 mt-2 size-8"
      />
      <AppLinks />
      <ConfigLinks />
    </div>
  );
};

export default Sidebar;
