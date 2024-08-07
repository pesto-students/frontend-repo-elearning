import { Fragment, useState } from 'react';
import { Group, Code } from '@mantine/core';
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
import { MantineLogo } from '@mantinex/mantine-logo';
import classes from './Navbar.module.css';
import { randomUUID } from 'crypto';

const ExpandedOptions = ({options}) => {
    return <div className={classes.expandedOptions}>
        {options.map((option) => {
            return <div key={options.title} onClick={option.click}>
               {option.icon} {option.title}
            </div>
        })}
    </div>
}

const NavItems = ({item, setActive, active}) => {
   const [showMore, setShowMore] = useState(false);
   return <div>
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
        if(item.options){
            setShowMore(!showMore)
        }
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
      {item.options && <IconChevronUp height='15px' className={`${classes.iconChevron} ${showMore && classes.rotateSvg}`} />}
    </a>
    {item.options && showMore && <ExpandedOptions  options={item.options}/>}
   </div>
}


const data = [
  { link: '', label: 'Dashboard', icon: IconChartPieFilled },
  { link: '', label: 'Manage Teachers', icon: IconBriefcaseFilled, options: [{title: 'Teachers', icon: <IconEyeFilled/>, onclick: () => {}}, {title: 'Add Teachers', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
  { link: '', label: 'Manage Students', icon: IconIdBadge2 , options: [{title: 'Students', icon: <IconEyeFilled/>, onclick: () => {}}, {title: 'Add Students', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
  { link: '', label: 'Manage Classes', icon: IconDeviceDesktop , options: [{title: 'Classes', icon:  <IconEyeFilled/>, onclick: () => {}}, {title: 'Add Classes', icon: <IconCirclePlusFilled />, onclick: () => {}}] },
  { link: '', label: 'Live Classes', icon: IconBrandYoutubeFilled },
  { link: '', label: 'Questionare', icon: IconFileStack },
  { link: '', label: 'Recorded Lectures', icon: IconVideo },
  { link: '', label: 'Manage Parents', icon: IconUsers },

];

const Navbar = () => {
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
   <NavItems key={item.label} item={item} active={active} setActive={setActive} />
    

  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
      
        {links}
      </div>

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