"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import { Box, Button, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

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
    <nav className="mb-5 border-b px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link className="" href="/">
              <AiFillBug />
            </Link>
            <ul className="flex space-x-6">
              {links.map((link) => (
                <li key={link.label}>
                  <Link
                    className={classNames({
                      "hover:text-zinc-800 transition-colors": true,
                      "text-zinc-500": link.href != currentPath,
                      "text-zinc-900": link.href === currentPath,
                    })}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Flex>
          <Box>
            <Button>
              {status === "authenticated" && (
                <Link href={"/api/auth/signout"}>Logout</Link>
              )}
              {status === "unauthenticated" && (
                <Link href={"/api/auth/signin"}>Login</Link>
              )}
            </Button>
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
