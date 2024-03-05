import { PiSun, PiUserCircle } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import avatarImage from "/avatarImage.png";

const ConfigLinks = () => {
  return (
    <div className="flex flex-col gap-6">
      <Button variant={"icon"} size={"icon"}>
        <PiUserCircle size={24} />
      </Button>
      <Button variant={"icon"} size={"icon"}>
        <PiSun size={24} />
      </Button>
      <Avatar className="size-9 cursor-pointer  ">
        <AvatarImage src={avatarImage} alt="Avatar image" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default ConfigLinks;
