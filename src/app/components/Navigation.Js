'use client';
import NavSmall from "./NavSmall";
import NavFull from "./NavFull";


export default function Header() {
    return (
        <header className="z-50">
            <NavFull />
            <NavSmall />
        </header>
    );
}