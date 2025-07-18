// src/hooks/useAuth.js
import { useContext } from 'react';
import { Authcontext } from '../Provider/AuthContext.jsx';

const useAuth = () => {
  return useContext(Authcontext);
};

export default useAuth;
