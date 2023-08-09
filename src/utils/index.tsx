import React from 'react';

interface TitleProps {
  title: string;
}

export const PageTitle: React.FC<TitleProps> = (props) => {
  document.title = props.title;
  return null;
};

export const REACT_APP_INTERNAL_API_PATH = 'http://localhost:4000/';

export const NEWS_API_KEYS = 'e9f4335359f94c97824fdcefd82a27c5';