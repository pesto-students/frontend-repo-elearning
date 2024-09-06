import Image from 'next/image';
import Link from 'next/link';
import Logo from "../../app/public/elearning-logo.svg";

const AppLogo = ({path}: {path: string}) => {
    return (
        <Link href={path}>
            <Image src={Logo} alt='Logo' style={{ objectFit: 'contain' }} width={150} ></Image>
        </Link>
    );
};

export default AppLogo;