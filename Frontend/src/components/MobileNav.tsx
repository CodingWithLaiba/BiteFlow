import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-orange-100"
        >
          <Menu className="h-6 w-6 text-orange-500 cursor-pointer" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[280px] sm:w-[350px] px-6 py-8">
        <SheetTitle className="text-2xl font-bold text-orange-500">
          BiteFlow 🍔
        </SheetTitle>

        <p className="mt-2 text-sm text-muted-foreground">
          Welcome to BiteFlow! Order your favorite meals in just a few taps.
        </p>

        <Separator className="my-6" />

        <SheetDescription className="space-y-4">
          <Button className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer">
            Log In
          </Button>
        </SheetDescription>
      </SheetContent>
    </Sheet>
  );
}
