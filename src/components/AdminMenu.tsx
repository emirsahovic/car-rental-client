import { useState } from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { MdOutlineArrowForwardIos } from 'react-icons/md';
import { Link, useLocation, useParams } from 'react-router-dom';

interface IColorProp {
    color: string
}

const AdminMenu = ({ color }: IColorProp) => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);

    const { pathname } = useLocation();
    const { pageNumber } = useParams();

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const routeMatch = (url: string): boolean | undefined => {
        if (pathname === url) return true;
    }

    return (
        <>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{ textTransform: 'none', color: { color }, fontSize: '18px', p: 0, minHeight: 0, minWidth: 0, fontWeight: 400, letterSpacing: 0, transition: 'all 0.4s', "&:hover": { background: 'transparent', color: '#ed6c02' } }}
                className={`${routeMatch(`/vehicles/page/${pageNumber}`) && 'prim-color'} link-hover`}
            >
                Vehicles
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Link to='/vehicles/page/1'>
                    <MenuItem sx={{ transition: 'all 0.4s', "&:hover": { background: 'transparent', color: '#ed6c02' } }} onClick={handleClose}>
                        View Vehicles
                        <MdOutlineArrowForwardIos style={{ marginLeft: '1rem' }} />
                    </MenuItem>
                </Link>
                <Link to='/add-vehicle'>
                    <MenuItem sx={{ transition: 'all 0.4s', "&:hover": { background: 'transparent', color: '#ed6c02' } }} onClick={handleClose}>
                        Add Vehicle
                        <MdOutlineArrowForwardIos style={{ marginLeft: '1.9rem' }} />
                    </MenuItem>
                </Link>
            </Menu>
        </>
    );
}

export default AdminMenu;
