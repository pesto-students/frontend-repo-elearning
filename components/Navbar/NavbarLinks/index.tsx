import { Box, Collapse, Group, ThemeIcon, UnstyledButton, rem } from '@mantine/core';
import { IconCalendarStats, IconChevronRight } from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import classes from './style.module.css';

interface LinksGroupProps {
  icon: React.FC<any>;
  label: string;
  initiallyOpened?: boolean;
  options?: { label: string; icon: ReactNode, onClick?: () => void }[];
  link?: string
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, options, link }: LinksGroupProps) {
  const hasLinks = Array.isArray(options);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? options : []).map((option) => (
    <div
      className={classes.link}
      key={option.label}
      onClick={option?.onClick}
    >
      {option.icon}  {option.label}
    </div>
  ));

  const RenderLink = <Group justify="space-between" gap={0}>
    <Box style={{ display: 'flex', alignItems: 'center', padding: '5px 10px' }}>
      <ThemeIcon variant="light" size={30}>
        <Icon style={{ width: rem(18), height: rem(20) }} />
      </ThemeIcon>
      <Box ml="md">{label}</Box>
    </Box>
    {hasLinks && (
      <IconChevronRight
        className={classes.chevron}
        stroke={1.5}
        style={{
          width: rem(16),
          height: rem(16),
          transform: opened ? 'rotate(-90deg)' : 'none',
        }} />
    )}
  </Group>;
  return (
    <>
      {link ?
        <Link href={link} style={{ textDecoration: "none", fontWeight: 500, color: '#000' }}>
          {RenderLink}
        </Link>
        :
        <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
          {RenderLink}
        </UnstyledButton>
      }

      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: 'Releases',
  icon: IconCalendarStats,
  links: [
    { label: 'Upcoming releases', link: '/' },
    { label: 'Previous releases', link: '/' },
    { label: 'Releases schedule', link: '/' },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box mih={220} p="md">
      <LinksGroup {...mockdata} />
    </Box>
  );
}