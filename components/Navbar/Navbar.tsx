import { ScrollArea } from '@mantine/core';
import {
  IconBrandYoutubeFilled,
  IconBriefcaseFilled,
  IconChartPieFilled,
  IconCirclePlusFilled,
  IconDeviceDesktop,
  IconEyeFilled,
  IconFileStack,
  IconIdBadge2,
  IconLogout,
  IconUsers,
  IconVideo
} from '@tabler/icons-react';
import Link from 'next/link';
import { LinksGroup } from './NavbarLinks';
import classes from './style.module.css';






const Navbar = (props) => {
  // const router=useRouter()
  const data = [
    { link: '/dashboard', label: 'Dashboard', icon: IconChartPieFilled },
    { link: '', label: 'Manage Teachers', icon: IconBriefcaseFilled, options: [{ label: 'Teachers', icon: <IconEyeFilled />, onclick: () => { } }, { label: 'Add Teachers', icon: <IconCirclePlusFilled />, onclick: () => { } }] },
    { link: '', label: 'Manage Students', icon: IconIdBadge2, options: [{ label: 'Students', icon: <IconEyeFilled />, onclick: () => { } }, { label: 'Add Students', icon: <IconCirclePlusFilled />, onclick: () => { } }] },
    { link: '', label: 'Manage Classes', icon: IconDeviceDesktop, options: [{ label: 'Classes', icon: <IconEyeFilled />, onclick: () => { } }, { label: 'Add Classes', icon: <IconCirclePlusFilled />, onclick: () => { } }] },
    { link: '/dashboard/live-classes', label: 'Live Classes', icon: IconBrandYoutubeFilled },
    { link: '', label: 'Questionare', icon: IconFileStack },
    { link: '', label: 'Recorded Lectures', icon: IconVideo },
    { link: '', label: 'Manage Parents', icon: IconUsers },

  ];
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      {/* <div className={classes.header}>
       
      </div> */}

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a> */}

        <Link href="/" className={classes.link} onClick={(e) => {
          // e.preventDefault();
          props.toggleDesktop()
        }} >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;