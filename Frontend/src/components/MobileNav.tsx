import { CircleUserRound, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user } = useAuth0();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-orange-100"
        >
          <Menu className="h-6 w-6 text-orange-500" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[350px] px-6 py-6">
        <SheetTitle className="mb-4">
          {isAuthenticated ? (
            <span className="flex items-center gap-2 text-lg font-bold">
              <CircleUserRound className="h-6 w-6 text-orange-500 shrink-0" />
              <span className="truncate">{user?.email}</span>
            </span>
          ) : (
            <span className="text-xl font-bold text-orange-500">
              Welcome to BiteFlow 🍔
            </span>
          )}
        </SheetTitle>

        <Separator className="mb-6" />

        <SheetDescription className="flex flex-col gap-4">
          {isAuthenticated ? (
            <MobileNavLinks />
          ) : (
            <Button
              onClick={() => loginWithRedirect()}
              className="w-full bg-orange-500 font-bold hover:bg-orange-600"
            >
              Log In
            </Button>
          )}
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
