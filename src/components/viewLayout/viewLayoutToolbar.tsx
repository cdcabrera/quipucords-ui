/**
 * Utilizes PatternFly for a responsive toolbar with theme toggling, help, and user logout functionality.
 * It auto-detects theme preference, provides a dropdown for help and user actions, and manages session state for
 * logout.
 *
 * @module appToolbar
 */
import React, { useEffect, useState } from 'react';
import {
  Dropdown,
  DropdownItem,
  Icon,
  MenuToggle,
  ToggleGroup,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem
} from '@patternfly/react-core';
import { EllipsisVIcon, MoonIcon, QuestionCircleIcon, SunIcon } from '@patternfly/react-icons';
import { useLogout, useUser } from '../../hooks/useLoginApi';
import '@patternfly/react-styles/css/components/Avatar/avatar.css';
import './viewLayoutToolbar.css';

const AppToolbar: React.FC = () => {
  const { logout } = useLogout();
  const { getUser } = useUser();
  const [userName, setUserName] = useState<string>();
  const [helpOpen, setHelpOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const [kebabDropdownOpen, setKebabDropdownOpen] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    getUser().then(username => setUserName(username));
  }, []);

  const applyTheme = isDark => {
    const htmlElement = document.getElementsByTagName('html')[0];
    if (htmlElement) {
      if (isDark) {
        htmlElement.classList.add('pf-v5-theme-dark');
      } else {
        htmlElement.classList.remove('pf-v5-theme-dark');
      }
    }
  };
  applyTheme(isDarkTheme);

  const onAbout = () => {};

  const onLogout = () => logout();

  const onHelpSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    console.log('selected', value);
    setHelpOpen(false);
  };

  const onUserDropdownSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined
  ) => {
    console.log('selected', value);
    setUserDropdownOpen(false);
  };

  return (
    <Toolbar id="toolbar" isFullHeight isStatic>
      <ToolbarContent>
        <ToolbarGroup
          variant="icon-button-group"
          align={{ default: 'alignRight' }}
          spacer={{ default: 'spacerNone', md: 'spacerMd' }}
        >
          <ToolbarGroup variant="icon-button-group" visibility={{ default: 'hidden', lg: 'visible' }}>
            <ToolbarItem>
              <ToggleGroup aria-label="Dark theme toggle group">
                <ToggleGroupItem
                  aria-label="light theme toggle"
                  icon={
                    <Icon size="md">
                      <SunIcon />
                    </Icon>
                  }
                  isSelected={!isDarkTheme}
                  onChange={() => {
                    setIsDarkTheme(false);
                    applyTheme(false);
                  }}
                />
                <ToggleGroupItem
                  aria-label="dark theme toggle"
                  icon={
                    <Icon size="md">
                      <MoonIcon />
                    </Icon>
                  }
                  isSelected={isDarkTheme}
                  onChange={() => {
                    setIsDarkTheme(true);
                    applyTheme(true);
                  }}
                />
              </ToggleGroup>
            </ToolbarItem>
            <ToolbarItem>
              <Dropdown
                popperProps={{ position: 'right' }}
                onSelect={onHelpSelect}
                onOpenChange={(isOpen: boolean) => setHelpOpen(isOpen)}
                isOpen={helpOpen}
                toggle={toggleRef => (
                  <MenuToggle
                    aria-label="Toggle"
                    ref={toggleRef}
                    variant="plain"
                    onClick={() => setHelpOpen(prev => !prev)}
                    isExpanded={helpOpen}
                  >
                    <QuestionCircleIcon />
                  </MenuToggle>
                )}
              >
                <DropdownItem onClick={onAbout} value="about">
                  About
                </DropdownItem>
              </Dropdown>
            </ToolbarItem>
          </ToolbarGroup>
          <ToolbarItem visibility={{ default: 'visible', lg: 'hidden' }}>
            <Dropdown
              isPlain
              popperProps={{ position: 'right' }}
              onSelect={onUserDropdownSelect}
              onOpenChange={(isOpen: boolean) => setKebabDropdownOpen(isOpen)}
              isOpen={kebabDropdownOpen}
              toggle={toggleRef => (
                <MenuToggle
                  aria-label="Toggle"
                  ref={toggleRef}
                  variant="plain"
                  onClick={() => setKebabDropdownOpen(prev => !prev)}
                  isExpanded={kebabDropdownOpen}
                  style={{ width: 'auto' }}
                >
                  <EllipsisVIcon />
                </MenuToggle>
              )}
              ouiaId="user_dropdown"
            >
              <DropdownItem value="logout" onClick={onLogout}>
                Logout
              </DropdownItem>
            </Dropdown>
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarItem visibility={{ default: 'hidden', lg: 'visible' }}>
          <Dropdown
            onSelect={onUserDropdownSelect}
            onOpenChange={(isOpen: boolean) => setUserDropdownOpen(isOpen)}
            isOpen={userDropdownOpen}
            ouiaId="user_dropdown"
            toggle={toggleRef => (
              <MenuToggle
                aria-label="Toggle"
                ref={toggleRef}
                variant="plain"
                onClick={() => setUserDropdownOpen(prev => !prev)}
                isExpanded={userDropdownOpen}
              >
                <div className="quipucords-toolbar__user-dropdown">
                  <span className="pf-v5-c-avatar" />
                  {userName}
                </div>
              </MenuToggle>
            )}
          >
            <DropdownItem value="logout" onClick={onLogout}>
              Logout
            </DropdownItem>
          </Dropdown>
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );
};

export { AppToolbar as default, AppToolbar };
