import React, { useState } from 'react';
import { useRouter } from 'next/router'
import {
  Navbar,
  Center,
  Tooltip,
  UnstyledButton,
  createStyles,
  Group,
} from '@mantine/core';
import {
  Icon as TablerIcon,
  Home2,
  Gauge,
  Inbox,
  Send,
  Fingerprint,
  CalendarStats,
  User,
  Settings,
  Logout,
  SwitchHorizontal,
} from 'tabler-icons-react';
// import { MantineLogoSmall } from '../../shared/MantineLogo';

const useStyles = createStyles(theme => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    '&:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark'
          ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
          : theme.colors[theme.primaryColor][0],
      color:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
    },
  },
}));

interface NavbarLinkProps {
  icon: TablerIcon;
  label: string;
  active?: boolean;
  href: string;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position='right' withArrow transitionDuration={0}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: Home2, label: 'Home', href: '/test' },
  { icon: Gauge, label: 'Dashboard', href: '/test' },
  { icon: Inbox, label: 'Inbox', href: '/test' },
  { icon: CalendarStats, label: 'Releases', href: '/test' },
  { icon: User, label: 'Account', href: '/test' },
  { icon: Fingerprint, label: 'Security', href: '/test' },
  { icon: Send, label: 'Post', href: '/test' },
];

export function NavbarMinimal() {
  const [active, setActive] = useState(2);
  const router = useRouter()

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {setActive(index), router.push(link.href)}}
    />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p='md'>
      <Center>{/* <MantineLogoSmall /> */}Logo</Center>
      <Navbar.Section grow mt={50}>
        <Group direction='column' align='center' spacing={0}>
          {links}
        </Group>
      </Navbar.Section>
      <Navbar.Section>
        <Group direction='column' align='center' spacing={0}>
          <NavbarLink icon={Settings} label='Settings' />
          <NavbarLink icon={Logout} label='Logout' />
        </Group>
      </Navbar.Section>
    </Navbar>
  );
}
