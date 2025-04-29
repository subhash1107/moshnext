'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
    const currentPath = usePathname()
    
  const links = [
    {
      label: "dashboard",
      href: "/dashboard",
    },
    {
      label: "issues",
      href: "/issues",
    },
  ];
  return (
    <nav className="flex space-x-6 items-center mb-5 border-b px-5 h-14">
      <Link className="" href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              className={classNames({
                "hover:text-zinc-800 transition-colors":true,
                "text-zinc-500":link.href!=currentPath,
                "text-zinc-900":link.href===currentPath
              })}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
