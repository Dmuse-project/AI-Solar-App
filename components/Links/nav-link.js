"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./NavLink.module.css"

export default function NavLink({ href, children }) {
  const path = usePathname();

  // DEBUGGING
  // console.log("Current Path", path);
  // console.log("href", href);
  return (
    <>
      <Link
        href={href}
        className={`${classes["link"]} ${path.startsWith(href) ? classes["active"] : ""} `}
      >
        {children}
      </Link>
    </>
  );
}
