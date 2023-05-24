import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ApplicationLauncher,
  ApplicationLauncherItem,
  Avatar,
  Brand,
  Button,
  ButtonVariant,
  Divider,
  Dropdown,
  DropdownGroup,
  DropdownItem,
  DropdownPosition,
  DropdownToggle,
  KebabToggle,
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadMain,
  MastheadToggle,
  Nav,
  NavItem,
  NavList,
  Page,
  PageSidebar,
  PageToggleButton,
  SkipToContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { BarsIcon, CogIcon, HelpIcon, QuestionCircleIcon } from '@patternfly/react-icons';
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { storeHooks, reduxActions, reduxTypes } from '../../redux';
import titleImgBrand from '../../styles/images/title-brand.svg';
import titleImg from '../../styles/images/title.svg';
import { translate } from '../i18n/i18n';
import { helpers } from '../../common/helpers';
import { routes } from '../router/router';

const PageLayout = ({
  children,
  leftMenu,
  t,
  uiBrand,
  uiName,
  useDispatch: useAliasDispatch,
  useLocation: useAliasLocation,
  useNavigate: useAliasNavigate,
  useSelector: useAliasSelector
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFullKebabDropdownOpen, setIsFullKebabDropdownOpen] = useState(false);
  const [isAppLauncherOpen, setIsAppLauncherOpen] = useState(false);

  const location = useAliasLocation();
  const navigate = useAliasNavigate();
  const dispatch = useAliasDispatch();
  const session = useAliasSelector(({ user }) => user.session, {});

  const onAbout = () => {
    dispatch({
      type: reduxTypes.aboutModal.ABOUT_MODAL_SHOW
    });
  };

  const onLogout = () => {
    dispatch(reduxActions.user.logoutUser()).finally(() => {
      window.location = '/logout';
    });
  };

  const onNavigate = path => {
    navigate(path);
  };

  const onDropdownToggle = isOpen => {
    setIsDropdownOpen(isOpen);
  };

  const onDropdownSelect = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onFullKebabDropdownToggle = isOpen => {
    setIsFullKebabDropdownOpen(isOpen);
  };

  const onFullKebabDropdownSelect = () => {
    setIsFullKebabDropdownOpen(!isFullKebabDropdownOpen);
  };

  const onAppLauncherToggle = isOpen => {
    setIsAppLauncherOpen(isOpen);
  };

  const onAppLauncherSelect = () => {
    setIsAppLauncherOpen(!isAppLauncherOpen);
  };

  const fullKebabDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem key="group 2 logout" onClick={() => onLogout()}>
        Logout
      </DropdownItem>
    </DropdownGroup>,
    <Divider key="divider" />,
    <DropdownItem key="about" onClick={() => onAbout()}>
      <CogIcon /> About
    </DropdownItem>,
    <DropdownItem key="guides-install" href={`${(!helpers.DEV_MODE && '.') || ''}/docs/install.html`}>
      <HelpIcon /> Guides - Install
    </DropdownItem>,
    <DropdownItem key="guides-using" href={`${(!helpers.DEV_MODE && '.') || ''}/docs/use.html`}>
      <HelpIcon /> Guides - Using
    </DropdownItem>
  ];

  const userDropdownItems = [
    <DropdownGroup key="group 2">
      <DropdownItem key="group 2 logout" onClick={() => onLogout()}>
        Logout
      </DropdownItem>
    </DropdownGroup>
  ];

  const appLauncherItems = [
    <ApplicationLauncherItem key="application_1a" onClick={() => onAbout()}>
      About
    </ApplicationLauncherItem>,
    <ApplicationLauncherItem key="application_2a" href={`${(!helpers.DEV_MODE && '.') || ''}/docs/install.html`}>
      Guides - Install
    </ApplicationLauncherItem>,
    <ApplicationLauncherItem key="application_3a" href={`${(!helpers.DEV_MODE && '.') || ''}/docs/use.html`}>
      Guides - Using
    </ApplicationLauncherItem>
  ];

  const headerToolbar = (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          alignment={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          <ToolbarGroup variant="icon-button-group" visibility={{ default: 'hidden', lg: 'visible' }}>
            <ToolbarItem visibility={{ default: 'hidden', md: 'hidden', lg: 'visible' }}>
              <ApplicationLauncher
                position={DropdownPosition.right}
                toggleIcon={<QuestionCircleIcon />}
                onSelect={onAppLauncherSelect}
                onToggle={onAppLauncherToggle}
                isOpen={isAppLauncherOpen}
                items={appLauncherItems}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'visible', lg: 'hidden' }}>
            <Dropdown
              isPlain
              position="right"
              onSelect={onFullKebabDropdownSelect}
              toggle={<KebabToggle onToggle={onFullKebabDropdownToggle} />}
              isOpen={isFullKebabDropdownOpen}
              dropdownItems={fullKebabDropdownItems}
            />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', lg: 'visible' }}>
          <Dropdown
            isFullHeight
            onSelect={onDropdownSelect}
            isOpen={isDropdownOpen}
            toggle={
              <DropdownToggle icon={<Avatar src={imgAvatar} alt="Avatar" />} onToggle={onDropdownToggle}>
                {session?.username}
              </DropdownToggle>
            }
            dropdownItems={userDropdownItems}
          />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const masthead = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton variant="plain" aria-label="Global navigation">
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <MastheadBrand>
          <Brand alt={t('view.brand-image-alt', { name: uiName })}>
            <source srcSet={uiBrand ? titleImgBrand : titleImg} />
          </Brand>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );

  const pageNav = (
    <Nav>
      <NavList>
        {leftMenu
          ?.filter(({ title }) => typeof title === 'string' && title.length)
          ?.map(({ icon: Icon, title, path }) => (
            <NavItem
              className="quipucords-navItem"
              key={title}
              id={title}
              isActive={path === location?.pathname}
              onClick={() => onNavigate(path)}
              icon={<Icon />}
              component={Button}
              variant={ButtonVariant.link}
            >
              {t('view.page', { context: title })}
            </NavItem>
          ))}
      </NavList>
    </Nav>
  );

  const sidebar = <PageSidebar nav={pageNav} />;

  const mainContainerId = 'main-content';

  const pageSkipToContent = <SkipToContent href={`#${mainContainerId}`}>Skip to content</SkipToContent>;

  return (
    <Page
      header={masthead}
      sidebar={sidebar}
      isManagedSidebar
      skipToContent={pageSkipToContent}
      mainContainerId={mainContainerId}
    >
      {children}
    </Page>
  );
};

/**
 * Prop types
 *
 * @type {{children: React.ReactNode}}
 */
PageLayout.propTypes = {
  children: PropTypes.node,
  leftMenu: PropTypes.array,
  t: PropTypes.func,
  uiBrand: PropTypes.string,
  uiName: PropTypes.string,
  useDispatch: PropTypes.func,
  useLocation: PropTypes.func,
  useNavigate: PropTypes.func,
  useSelector: PropTypes.func
};

/**
 * Default props
 *
 * @type {{}}
 */
PageLayout.defaultProps = {
  children: null,
  leftMenu: routes,
  t: translate,
  uiBrand: helpers.UI_BRAND,
  uiName: helpers.UI_NAME,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useLocation,
  useNavigate,
  useSelector: storeHooks.reactRedux.useSelector
};

export { PageLayout as default, PageLayout };
