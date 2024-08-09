import { Group, Code, ScrollArea, rem } from '@mantine/core';
import {
    IconSwitchHorizontal,
    IconLogout,
    IconChartPieFilled,
    IconBriefcaseFilled,
    IconIdBadge2,
    IconDeviceDesktop,
    IconBrandYoutubeFilled,
    IconFileStack,
    IconVideo,
    IconUsers,
    IconChevronUp,
    IconEyeFilled,
    IconCirclePlusFilled,
  } from '@tabler/icons-react';
import classes from './style.module.css';
import { LinksGroup } from './NavbarLinks';

const data = [
    { link: '', label: 'Dashboard', icon: IconChartPieFilled },
    { link: '', label: 'Manage Teachers', icon: IconBriefcaseFilled, options: [{label: 'Teachers', icon: <IconEyeFilled/>, onclick: () => {}}, {label: 'Add Teachers', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
    { link: '', label: 'Manage Students', icon: IconIdBadge2 , options: [{label: 'Students', icon: <IconEyeFilled/>, onclick: () => {}}, {label: 'Add Students', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
    { link: '', label: 'Manage Classes', icon: IconDeviceDesktop , options: [{label: 'Classes', icon:  <IconEyeFilled/>, onclick: () => {}}, {label: 'Add Classes', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
    { link: '', label: 'Live Classes', icon: IconBrandYoutubeFilled },
    { link: '', label: 'Questionare', icon: IconFileStack },
    { link: '', label: 'Recorded Lectures', icon: IconVideo },
    { link: '', label: 'Manage Parents', icon: IconUsers },
  
  ];




const Navbar = () => {
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
      {/* <div className={classes.header}>
       
      </div> */}

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;