import Image from "next/image";

import { SignIn } from "../signIn";
import Logo from "../../../public/img/logo";
import Link from "next/link";

export default function Header() {
  return (
    <div className="container items-center mx-auto flex justify-between p-5 py-0 h-[93px] ">
      <Link href="/">
        <Logo />
      </Link>
      <SignIn />
    </div>
  );
}
