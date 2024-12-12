import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // If there is no authenticated user, redirect to the login page
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/login");
      }
    },
    [navigate, isAuthenticated, isLoading]
  );

  // While loading, show the spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // If there is an authenticated user, show the children
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
