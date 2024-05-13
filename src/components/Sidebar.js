import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons/lib';
import * as IoIcons from 'react-icons/io'; 
import * as RiIcons from 'react-icons/ri'; 

const Nav = styled.div` background: #65CCD0; height: 80px; display: flex; justify-content: flex-start; align-items: center; `;

const NavIcon = styled(Link)` margin-left: 2rem; font-size: 2rem; height: 80px; display: flex; justify-content: flex-start; align-items: center; `;

const SidebarNav = styled.nav` background: #65CCD0; width: 250px; height: 100vh; display: flex; justify-content: center; position: fixed; top: 0; left: ${({ sidebar }) => (sidebar ? '0' : '-100%')}; transition: 350ms; z-index: 10; `;

const SidebarWrap = styled.div`width: 100%;`;

const SidebarLink = styled(Link)`
  display: flex;
  color: #000000;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;

  &:hover {
    background: #f5f5f5;
    border-left: 4px solid #632ce4;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
    padding: 18px;
`;

const DropdownLink = styled(Link)`
  background: #91eaed;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #000000;
  font-size: 18px;

  &:hover {
    background: #632ce4;
    cursor: pointer;
  }
`;

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const SidebarData = [
    {
      title: 'Admin',
      path: '/admin',
      icon: <AiIcons.AiFillHome />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
    },
    {
      title: 'Trips',
      path: '/trips',
      icon: <IoIcons.IoIosPaper />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Trips',
          path: '/trips',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Create',
          path: '/trips/create',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
      ]
    },
    {
      title: 'Blogs',
      path: '/blogs',
      icon: <FaIcons.FaCartPlus />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'Blogs',
          path: '/blogs',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
        {
          title: 'Create',
          path: '/blog/create',
          icon: <IoIcons.IoIosPaper />,
          cName: 'sub-nav'
        },
      ]
    },
    {
      title: 'Crowdfunding',
      path: '/crowdfunding',
      icon: <IoIcons.IoMdPeople />,
    },
    {
      title: 'Merchandise',
      path: '/merchandise',
      icon: <FaIcons.FaEnvelopeOpenText />,
    },
    {
      title: 'Manage Content',
      icon: <FaIcons.FaEnvelopeOpenText />,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: 'About us',
          path: '/about-us"',
          icon: <IoIcons.IoIosPaper />
        },
        {
          title: 'Home Page',
          path: '/homepage/manage',
          icon: <IoIcons.IoIosPaper />
        }
      ]
    },
  ];

  const SubMenu = ({ item }) => {
    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    return (
      <>
        <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
          <div>
            {item.icon}
            <SidebarLabel>{item.title}</SidebarLabel>
          </div>
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        </SidebarLink>
        {subnav &&
          item.subNav.map((item, index) => {
            return (
              <DropdownLink to={item.path} key={index}>
                {item.icon}
                <SidebarLabel>{item.title}</SidebarLabel>
              </DropdownLink>
            );
          })}
      </>
    );
  };

  return (
    <>
      <IconContext.Provider value={{ color: 'black' }}>
        <Nav>
          <NavIcon to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </NavIcon>
        </Nav>
        <SidebarNav sidebar={sidebar}>
          <SidebarWrap>
            <NavIcon to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </NavIcon>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </SidebarWrap>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
