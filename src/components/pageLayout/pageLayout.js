import React from 'react';
import PropTypes from 'prop-types';
import {
  Masthead,
  // MenuItem,
  ToolbarItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  Page,
  PageSection,
  PageToggleButton,
  MastheadContent,
  MastheadToggle,
  MastheadMain,
  Brand,
  SkipToContent
} from '@patternfly/react-core';
import BarsIcon from '@patternfly/react-icons/dist/esm/icons/bars-icon';
import { connectRouter, reduxActions, reduxTypes, store } from '../../redux';
import { ContextIcon, ContextIconVariant } from '../contextIcon/contextIcon';
import { helpers } from '../../common';
import { routes } from '../router/router';
import titleImgBrand from '../../styles/images/title-brand.svg';
import titleImg from '../../styles/images/title.svg';
import { DropdownSelect } from '../dropdownSelect/dropdownSelect';
import { translate } from '../i18n/i18n';

class PageLayout extends React.Component {
  constructor(props) {
    super(props);

    /*
    this.helpItems = [
      { isActive: true, menuType: 'help', title: 'About', key: 'about', onClick: this.onAbout },
      {
        isActive: false,
        menuType: 'help',
        title: 'Guides - Install',
        key: 'install',
        href: `${(!helpers.DEV_MODE && '.') || ''}/docs/install.html`,
        target: '_blank'
      },
      {
        isActive: true,
        menuType: 'help',
        title: 'Guides - Using',
        key: 'use',
        href: `${(!helpers.DEV_MODE && '.') || ''}/docs/use.html`,
        target: '_blank'
      }
    ];

    this.userItems = [
      { isActive: true, menuType: 'action', displayTitle: 'Logout', key: 'logout', onClick: this.onLogout }
    ];
    */
  }

  onAbout = () => {
    store.dispatch({
      type: reduxTypes.aboutModal.ABOUT_MODAL_SHOW
    });
  };

  onLogout = () => {
    const { logoutUser } = this.props;

    logoutUser().finally(() => {
      window.location = '/logout';
    });
  };

  /*
  onNavigate = path => {
    const { history } = this.props;

    history.push(path);
  };
   */

  onUnauthorized = () => {
    window.location = '/logout';
  };

  /*
  renderIconBarActions() {
    const { session } = this.props;

    const title = (
      <React.Fragment>
        <ContextIcon symbol={ContextIconVariant.user} /> {session && session.username}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Masthead.Dropdown id="app-help-dropdown" title={<span aria-hidden className="pficon pficon-help" />}>
          {this.menuItems.map(
            ({ isActive, displayTitle, menuType, ...item }, index) =>
              isActive &&
              menuType === 'help' && (
                <MenuItem eventKey={index} {...item}>
                  {displayTitle}
                </MenuItem>
              )
          )}
        </Masthead.Dropdown>
        <Masthead.Dropdown id="app-user-dropdown" title={title}>
          {this.menuItems.map(
            ({ isActive, displayTitle, menuType, ...item }, index) =>
              isActive &&
              menuType === 'action' && (
                <MenuItem eventKey={index} {...item}>
                  {displayTitle}
                </MenuItem>
              )
          )}
        </Masthead.Dropdown>
      </React.Fragment>
    );
  }

  renderMenuActions() {
    return this.menuItems.map(
      item => item.isActive && <VerticalNav.Item className="collapsed-nav-item" title={item.displayTitle} {...item} />
    );
  }

  renderMenuItems() {
    const { location, menu, isFullPage } = this.props;
    const activeItem = menu.find(item => item.path.indexOf(location.pathname) > -1);

    if (isFullPage) {
      return null;
    }

    return menu.map(item => (
      <VerticalNav.Item
        key={item.path}
        title={item.title}
        iconClass={item.iconClass}
        active={item === activeItem || (!activeItem && item.redirect)}
        onClick={() => this.onNavigate(item.path)}
      />
    ));
  }
  */

  render() {
    const { children, session, uiBrand, uiName, t } = this.props;

    if (!session.authorized) {
      return (
        <div className="layout-pf layout-pf-fixed fadein">
          <Masthead
            // titleImg={uiBrand ? titleImgBrand : titleImg}
            title={uiName}
            // navToggle={false}
            // onTitleClick={this.onUnauthorized}
          />
          <div>{children}</div>
        </div>
      );
    }

    const headerToolbar = (
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
                  { title: 'About', key: 'about', onClick: this.onAbout },
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
              options={[{ title: 'Logout', key: 'logout', onClick: this.onLogout }]}
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
          <Brand alt={t('view.brand-image-alt', { name: helpers.UI_NAME })}>
            <source srcSet={uiBrand ? titleImgBrand : titleImg} />
          </Brand>
        </MastheadMain>
        <MastheadContent>{headerToolbar}</MastheadContent>
      </Masthead>
    );

    /**
     * ToDo: Evaluate PF3-React VerticalNav vs PF4-React Page component. The component contributes to throwing a warning regarding unmounted components setting state.
     * And forces the consumer to monitor more closely how state is managed. The warnings correlate to resize events. This warning can be squashed by using an
     * `isMounted` state property to prevent render with a "null" return, or by avoiding the use of the onLayoutChange callback in the consuming component. This
     * may be related to the PF4-React implementation around "onPageResize" where a check around the returned size helps squash a warning.
     */
    return (
      <Page
        header={masthead}
        className="fadein"
        skipToContent={<SkipToContent href="#main-content">Skip to content</SkipToContent>}
        mainContainerId="main-content"
        groupProps={{
          stickyOnBreakpoint: { default: 'top' }
        }}
      >
        <PageSection>
          <div className="container-pf-nav-pf-vertical">{children}</div>
        </PageSection>
      </Page>
    );
  }
}

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  isFullPage: PropTypes.bool,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }),
  logoutUser: PropTypes.func,
  menu: PropTypes.array,
  session: PropTypes.shape({
    authorized: PropTypes.bool,
    username: PropTypes.string
  }),
  uiBrand: PropTypes.bool,
  uiName: PropTypes.string,
  t: PropTypes.func
};

PageLayout.defaultProps = {
  history: {},
  isFullPage: false,
  location: {},
  logoutUser: helpers.noop,
  menu: routes,
  session: {
    authorized: false,
    username: ''
  },
  uiBrand: helpers.UI_BRAND,
  uiName: helpers.UI_NAME,
  t: translate
};

const mapDispatchToProps = dispatch => ({
  logoutUser: () => dispatch(reduxActions.user.logoutUser())
});

const mapStateToProps = state => ({
  session: state.user.session
});

const ConnectedPageLayout = connectRouter(mapStateToProps, mapDispatchToProps)(PageLayout);

export { ConnectedPageLayout as default, ConnectedPageLayout, PageLayout };
