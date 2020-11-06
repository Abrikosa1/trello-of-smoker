
import React, { RefObject, SetStateAction, useEffect } from 'react';


export const useOutsideAlerter = (ref: RefObject<HTMLElement>, setState: React.Dispatch<SetStateAction<boolean>>) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setState(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
}