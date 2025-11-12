import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { BiHomeAlt2 } from "react-icons/bi";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList
} from "../components/ui/navigation-menu";
import "./globals.css";

export default function Home() {
  return (
    <>
      <div className="flex w-full justify-center">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink asChild >
                <Avatar>
                  <AvatarFallback>
                    <BiHomeAlt2 />
                  </AvatarFallback>
                </Avatar>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild >
                <Link href="/option-pricer">Option Pricer</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

      </div>
      <main className="flex w-full flex-col items-center justify-center bg-white font-sans dark:bg-black">
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
        <h1>hello world</h1>
      </main>
    </>
  );
}

