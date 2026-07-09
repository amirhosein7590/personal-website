import Logo from "./Logo";
import LanguageSwitcher from "./LanguageSwitcher";
import { memo } from "react";

type Props = {
    locale: string;
};

export default memo(function Navbar({ locale }: Props) {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080c14]/80 backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
                <Logo />
                <div />
                <LanguageSwitcher locale={locale} />
            </div>
        </header>
    );
})