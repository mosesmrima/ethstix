"use client"
import React from "react";
import {Navbar, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";
import {signOut} from "next-auth/react";
export default function App() {
    return (
        <Navbar shouldHideOnScroll={true} isBordered={true}>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Features
                    </Link>
                </NavbarItem>
                <NavbarItem isActive>
                    <Link href="#" aria-current="page">
                        Customers
                    </Link>
                </NavbarItem>
                <NavbarItem>
                    <Link color="foreground" href="#">
                        Integrations
                    </Link>
                </NavbarItem>
            </NavbarContent>
            <NavbarContent justify="end">
                    <Button onClick={() => signOut()} color="primary" variant="flat">
                        Sign Out
                    </Button>
            </NavbarContent>
        </Navbar>
    );
}
