import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Avatar,
  Brand,
  Button,
  // ButtonVariant,
  Nav,
  NavList,
  NavItem,
  // NavExpandable,
  Page,
  PageHeader,
  PageHeaderTools,
  PageHeaderToolsGroup,
  PageHeaderToolsItem,
  PageSidebar,
  SkipToContent
} from '@patternfly/react-core';
import { useLocation, useNavigate } from 'react-router-dom';
import { QuestionCircleIcon, IconSize } from '@patternfly/react-icons';
import imgAvatar from '@patternfly/react-core/src/components/Avatar/examples/avatarImg.svg';
// import HelpIcon from '@patternfly/react-icons/dist/esm/icons/help-icon';
import { translate } from '../i18n/i18n';
import { routes } from '../router/router';
import { helpers } from '../../common/helpers';
import titleImgBrand from '../../styles/images/title-brand.svg';
import titleImg from '../../styles/images/title.svg';
import { DropdownSelect, SelectPosition, ButtonVariant } from '../dropdownSelect/dropdownSelect';
import { storeHooks, reduxActions, reduxTypes } from '../../redux';
// import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';

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
 * @param props.leftMenu
 * @param props.uiName
 * @param props.useSelector
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

  const onNavigate = path => {
    navigate(path);
  };

  const headerToolbar = (
    <PageHeaderTools>
      <PageHeaderToolsGroup
        variant="icon-button-group"
        alignment={{ default: 'alignRight' }}
        spacer={{ default: 'spacerNone', md: 'spacerMd' }}
      >
        <PageHeaderToolsItem visibility={{ default: 'visible', md: 'hidden' }}>
          <Button aria-label="Settings" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
        </PageHeaderToolsItem>
        <PageHeaderToolsItem visibility={{ default: 'visible', md: 'hidden' }}>
          <Button aria-label="Help" variant={ButtonVariant.plain} icon={<QuestionCircleIcon />} />
        </PageHeaderToolsItem>
        <PageHeaderToolsItem visibility={{ default: 'hidden', md: 'visible' }}>
          <DropdownSelect
            buttonVariant={ButtonVariant.plain}
            isDropdownButton
            // toggleIndicator={null}
            placeholder={<QuestionCircleIcon size={IconSize.md} />}
            ariaLabel="Help"
            position={SelectPosition.right}
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
        </PageHeaderToolsItem>
      </PageHeaderToolsGroup>
      <PageHeaderToolsItem visibility={{ default: 'hidden', md: 'visible' }}>
        <DropdownSelect
          isDropdownButton
          isFullHeight
          isInline={false}
          position={SelectPosition.right}
          toggleIcon={<Avatar src={imgAvatar} alt="Avatar" />}
          placeholder={session?.username}
          options={[{ title: 'Logout', key: 'logout', onClick: onLogout }]}
        />
      </PageHeaderToolsItem>
    </PageHeaderTools>
  );

  const Header = (
    <PageHeader
      logo={
        <Brand alt={t('view.brand-image-alt', { name: uiName })}>
          <source srcSet={uiBrand ? titleImgBrand : titleImg} />
        </Brand>
      }
      showNavToggle
      isNavOpen={isNavOpen}
      onNavToggle={isMobileView ? onNavToggleMobile : onNavToggle}
      headerTools={headerToolbar}
    />
  );

  /*
  const Header = (
    <Masthead>
      <MastheadToggle>
        <PageToggleButton variant="plain" aria-label="Global navigation">
          <BarsIcon />
        </PageToggleButton>
      </MastheadToggle>
      <MastheadMain>
        <Brand alt={t('view.brand-image-alt', { name: helpers.UI_NAME })}>
          <source srcSet={uiBrand ? titleImgBrand : titleImg} />
        </Brand>
      </MastheadMain>
      <MastheadContent>{headerToolbar}</MastheadContent>
    </Masthead>
  );
  */

  const test = leftMenu
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
    ));

  const Navigation = (
    <Nav id="nav-primary-simple" theme="dark">
      <NavList id="nav-list-simple">{test}</NavList>
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
  /*
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
  */
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
