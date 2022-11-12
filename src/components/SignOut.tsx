import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../auth/authUtil";

export default function SignOut() {
  const authContext = useContext(AuthContext);

  authContext.signOut();

  return <Navigate to="/" replace />;
}
