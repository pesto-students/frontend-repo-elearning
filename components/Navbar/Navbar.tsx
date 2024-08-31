import { setAddClassModalState, setAddStudentModalState, setAddTeacherModalState } from '@/app/lib/slice';
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
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { LinksGroup } from './NavbarLinks';
import classes from './style.module.css';

const Navbar = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const data = [
    { link: '/dashboard', label: 'Dashboard', icon: IconChartPieFilled },
    {
      link: '', label: 'Manage Teachers', icon: IconBriefcaseFilled, options: [{ label: 'Teachers', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/teachers") } },
      {
        label: 'Add Teacher', icon: <IconCirclePlusFilled />, onClick: () => {
          dispatch(setAddTeacherModalState({ show: true }))
        }
      }]
    },
    {
      link: '', label: 'Manage Students', icon: IconIdBadge2, options: [{ label: 'Students', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/students") } }, {
        label: 'Add Student', icon: <IconCirclePlusFilled />, onClick: () => {
          dispatch(setAddStudentModalState({ show: true }))
        }
      }]
    },
    {
      link: '', label: 'Manage Classes', icon: IconDeviceDesktop, options: [{ label: 'Classes', icon: <IconEyeFilled />, onClick: () => { router.push("/dashboard/classes") } },
      { label: 'Add Classes', icon: <IconCirclePlusFilled />, onClick: () => { dispatch(setAddClassModalState({ show: true })) } }]
    },
    { link: '/dashboard/online-classes', label: 'Online Classes', icon: IconBrandYoutubeFilled },
    { link: '/dashboard/questionnaire', label: 'Questionnaire', icon: IconFileStack },
    { link: '/dashboard/recorded-classes', label: 'Recorded Lectures', icon: IconVideo },
    { link: '/dashboard/parents', label: 'Manage Parents', icon: IconUsers },

  ];
  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <nav className={classes.navbar}>
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
          // props.toggleDesktop()
        }} >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;