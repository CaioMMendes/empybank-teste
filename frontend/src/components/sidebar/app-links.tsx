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
    <div className="flex h-full flex-1 flex-col gap-6">
      <Button variant={"icon"} size={"icon"}>
        <PiChartPie size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"} selected={"selected"}>
        <PiWallet size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"}>
        <PiToolbox size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"}>
        <PiStorefront size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"}>
        <PiClipboardText size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"}>
        <PiMoney size={24} />
      </Button>
    </div>
  );
};

export default AppLinks;
