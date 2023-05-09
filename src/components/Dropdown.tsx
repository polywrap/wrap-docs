import { createContext, useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";

import Button from "./Button";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

export interface DropdownProps {
  style?: React.CSSProperties;
  showDropdown?: boolean;
  onShowDropdown?: (showDropdown: boolean) => void;
  inner: React.ReactNode;
  children: React.ReactNode;
}

export interface DropdownState {
  setShowDropdown: (showDropdown: boolean) => void;
}

export const DropdownContext = createContext<DropdownState>({
  setShowDropdown: () => console.log("unimplemented"),
});

function Dropdown(props: DropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [showDropdown, innerSetShowDropdown] = useState(!!props.showDropdown);
  const setShowDropdown = useCallback(
    (value: boolean) => {
      if (props.onShowDropdown) {
        props.onShowDropdown(value);
      }
      innerSetShowDropdown(value);
    },
    [props]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef, setShowDropdown]);

  return (
    <DropdownContext.Provider value={{ setShowDropdown: setShowDropdown }}>
      <DropdownContainer ref={dropdownRef}>
        <Button
          style={props.style}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {props.inner}
        </Button>
        {showDropdown && <>{props.children}</>}
      </DropdownContainer>
    </DropdownContext.Provider>
  );
}

export default Dropdown;
