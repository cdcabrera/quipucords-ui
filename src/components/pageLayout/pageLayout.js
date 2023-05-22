import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Nav,
  NavList,
  NavItem,
  NavExpandable,
  Page,
  PageHeader,
  PageHeaderTools,
  PageSidebar,
  SkipToContent,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { translate } from '../i18n/i18n';
import { routes } from '../router/router';
import { useLocation, useNavigate } from '../router/routerContext';
import { helpers } from '../../common/helpers';
import titleImgBrand from '../../styles/images/title-brand.svg';
import titleImg from '../../styles/images/title.svg';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { storeHooks, reduxActions, reduxTypes } from '../../redux';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';

/**
 * Main navigation and page layout.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children
 * @param props.pageId
 * @param props.t
 * @param props.useNavigate
 * @param props.uiBrand
 * @param props.useLocation
 * @param props.useDispatch
 */
const PageLayout = ({
  children,
  leftMenu,
  pageId,
  t,
  uiName,
  uiBrand,
  useDispatch: useAliasDispatch,
  useLocation: useAliasLocation,
  useNavigate: useAliasNavigate,
  useSelector: useAliasSelector
}) => {
  const [isNavOpen, setIsNavOpen] = useState(true);
  const [isMobileView, setIsMobileView] = useState(true);
  const [isNavOpenMobile, setIsNavOpenMobile] = useState(false);

  const location = useAliasLocation();
  const navigate = useAliasNavigate();
  const dispatch = useAliasDispatch();
  const session = useAliasSelector(({ user }) => user.session, {});

  const onNavToggleMobile = () => {
    setIsNavOpenMobile(!isNavOpenMobile);
  };

  const onNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const onPageResize = ({ mobileView }) => {
    setIsMobileView(mobileView);
  };

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

  const onNavigate = (path, b, c, d) => {
    console.log('>>>> on navigate', path, b, c, d);
    return navigate(path);
  };

  const headerToolbar = (
    <PageHeaderTools>
      <Toolbar id="toolbar" isFullHeight isStatic>
        <ToolbarContent>
          <ToolbarGroup
            variant="icon-button-group"
            alignment={{ default: 'alignRight' }}
            spacer={{ default: 'spacerNone', md: 'spacerMd' }}
          >
            <ToolbarItem visibility={{ md: 'hidden' }}>
              <DropdownSelect
                isDropdownButton
                icon={<span aria-hidden className="pficon pficon-help" />}
                options={[
                  { title: 'About', key: 'about', onClick: onAbout },
                  {
                    title: 'Guides - Install',
                    key: 'install',
                    href: `${(!helpers.DEV_MODE && '.') || ''}/docs/install.html`,
                    target: '_blank'
                  },
                  {
                    menuType: 'help',
                    title: 'Guides - Using',
                    key: 'use',
                    href: `${(!helpers.DEV_MODE && '.') || ''}/docs/use.html`,
                    target: '_blank'
                  }
                ]}
              />
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'hidden', md: 'visible' }}>
            <DropdownSelect
              isDropdownButton
              icon={<ContextIcon symbol={ContextIconVariant.user} />}
              placeholder={session?.username}
              options={[{ title: 'Logout', key: 'logout', onClick: onLogout }]}
            />
          </ToolbarItem>
        </ToolbarContent>
      </Toolbar>
    </PageHeaderTools>
  );

  const Header = (
    <PageHeader
      logo={<source srcSet={uiBrand ? titleImgBrand : titleImg} alt={t('view.brand-image-alt', { name: uiName })} />}
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      headerTools={headerToolbar}
    />
  );

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">
        {leftMenu
          ?.filter(({ title }) => typeof title === 'string' && title.length)
          ?.map(({ title, path }) => (
            <NavItem key={title} id={title} isActive={path === location.pathname} onClick={onNavigate}>
              {title}
            </NavItem>
          ))}
      </NavList>
    </Nav>
  );

  const Sidebar = <PageSidebar theme="dark" nav={Navigation} isNavOpen={isMobileView ? isNavOpenMobile : isNavOpen} />;

  const PageSkipToContent = (
    <SkipToContent
      onClick={event => {
        event.preventDefault();
        const primaryContentContainer = document.getElementById(pageId);

        if (primaryContentContainer) {
          primaryContentContainer.focus();
        }
      }}
      href={`#${pageId}`}
    >
      {t('view.skip-content')}
    </SkipToContent>
  );
  return (
    <Page
      mainContainerId={pageId}
      header={Header}
      sidebar={Sidebar}
      onPageResize={onPageResize}
      skipToContent={PageSkipToContent}
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
  // helpMenu: PropTypes.array,
  leftMenu: PropTypes.array,
  // mainMenu: PropTypes.array,
  pageId: PropTypes.string,
  t: PropTypes.func,
  uiBrand: PropTypes.bool,
  // uiName: PropTypes.string,
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
  helpMenu: [
    { title: 'About', key: 'about', onClick: this.onAbout },
    {
      title: 'Guides - Install',
      href: `${(!helpers.DEV_MODE && '.') || ''}/docs/install.html`,
      target: '_blank'
    },
    {
      title: 'Guides - Using',
      href: `${(!helpers.DEV_MODE && '.') || ''}/docs/use.html`,
      target: '_blank'
    }
  ],
  leftMenu: routes,
  // mainMenu: [{ isActive: true, menuType: 'action', displayTitle: 'Logout', key: 'logout', onClick: this.onLogout }],
  pageId: 'primary-app-container',
  t: translate,
  uiBrand: helpers.UI_BRAND,
  uiName: helpers.UI_NAME,
  useDispatch: storeHooks.reactRedux.useDispatch,
  useLocation,
  useNavigate,
  useSelector: storeHooks.reactRedux.useSelector
};

export { PageLayout as default, PageLayout };
