import React from 'react';
import Logo from "../../app/public/elearning-logo.svg"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const AppLogo = () => {
    return (
        <Link href='/'>
            <Image src={Logo} alt='Logo' style={{ objectFit: 'contain' }} width={150} ></Image>
        </Link>
    );
};

export default AppLogo;