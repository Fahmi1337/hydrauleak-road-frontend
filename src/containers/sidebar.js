import { Link as RouterLink, matchPath, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Cog as CogIcon } from '../containers/icons/cog';
import { DocumentText as DocumentTextIcon } from '../containers/icons/document-text';
import { Home as HomeIcon } from '../containers/icons/home';
import { ShoppingCart as ShoppingCartIcon } from '../containers/icons/shopping-cart';
// import { Star as StarIcon } from '../containers/icons/star';
// import { User as UserIcon } from '../containers/icons/user';

const items = [
  {
    href: '/',
    icon: HomeIcon,
    label: 'Dashboard'
  },
  {
    href: '/contracts',
    icon: ShoppingCartIcon,
    label: 'Contracts'
  },
  {
    href: '/interventions',
    icon: CogIcon,
    label: 'Interventions'
  },
  {
    href: '/reports',
    icon: DocumentTextIcon,
    label: 'Reports'
  },
  // {
  //   href: '/dashboard/icons',
  //   icon: StarIcon,
  //   label: 'Icons'
  // },
  // {
  //   href: '/404',
  //   icon: UserIcon,
  //   label: '404'
  // },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      open
      sx={{ zIndex: 1000 }}
      variant="permanent"
      PaperProps={{
        sx: {
          backgroundColor: 'background.paper',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100% - 64px)',
          p: 1,
          top: 150,
          width: 73
        }
      }}
    >
      <List sx={{ width: '100%' }}>
        {items.map(({ href, icon: Icon, label }) => {
          const active = matchPath({ path: href, end: true }, location.pathname);

          return (
            
            <ListItem
              disablePadding
              component={RouterLink}
              key={href}
              to={href}
              sx={{
                flexDirection: 'column',
                color: active ? 'primary.main' : 'text.secondary',
                px: 2,
                py: 1.5,
                '&:hover': {
                  color: 'primary.main'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 'auto',
                  color: 'inherit'
                }}
              >
                <Icon />
              </ListItemIcon>
              <ListItemText
                primary={label}
                primaryTypographyProps={{
                  sx: {
                    pb: 0,
                    pt: 1.25
                  },
                  variant: 'caption'
                }}
              />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};
