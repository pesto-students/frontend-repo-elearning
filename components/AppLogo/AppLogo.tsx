import React from 'react';
import Logo from "../../app/public/elearning-logo.png"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AppLogo = () => {
    return (
        <Link href='/'>
            <Image src={Logo} alt='Logo' style={{ objectFit: 'contain' }} width={35} ></Image>
        </Link>
    );
};

export default AppLogo;