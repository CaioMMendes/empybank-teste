import {
  PiChartPie,
  PiStorefront,
  PiToolbox,
  PiWallet,
  PiClipboardText,
  PiMoney,
} from "react-icons/pi";
import { Button } from "../ui/button";

const AppLinks = () => {
  return (
    <div className=" flex flex-col gap-6  md:flex-1">
      <Button variant={"icon"} size={"icon"} name="Chart Link">
        <PiChartPie size={24} />
      </Button>
      <Button
        variant={"icon"}
        size={"icon"}
        selected={"selected"}
        name="Wallet Link"
      >
        <PiWallet size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"} name="Tools Link">
        <PiToolbox size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"} name="Store Link">
        <PiStorefront size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"} name="Anotations Link">
        <PiClipboardText size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"} name="Biling Link">
        <PiMoney size={24} />
      </Button>
    </div>
  );
};

export default AppLinks;
