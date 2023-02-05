import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import Navbar from "react-bootstrap/Navbar";
import "./App.css";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./lib/contextLib";
import { Auth } from "aws-amplify";
import { useNavigate } from "react-router-dom";
import { onError } from "./lib/errorLib";
import ErrorBoundary from "./components/ErrorBoundary";

// function App() {
//   return (
//     <div className="App container py-3">
//       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
//         <Navbar.Brand className="font-weight-bold text-muted">
//           Scratch
//         </Navbar.Brand>
//         <Navbar.Toggle />
//       </Navbar>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div className="App container py-3">
//       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
//         <Navbar.Brand className="font-weight-bold text-muted">
//           Scratch
//         </Navbar.Brand>
//         <Navbar.Toggle />
//       </Navbar>
//       <Routes />
//     </div>
//   );
// }
// function App() {
//   return (
//     <div className="App container py-3">
//       <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
//         <Navbar.Brand href="/" className="font-weight-bold text-muted">
//           Scratch
//         </Navbar.Brand>
//         <Navbar.Toggle />
//         <Navbar.Collapse className="justify-content-end">
//           <Nav>
//             <Nav.Link href="/signup">Signup</Nav.Link>
//             <Nav.Link href="/login">Login</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>
//       <Routes />
//     </div>
//   );
// }


function App() {
  const nav = useNavigate();
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        // alert(e);
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }
  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    nav("/login");
  }
  return (
    !isAuthenticating && (
      <div className="App container py-3">
        <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
          <LinkContainer to="/">
            <Navbar.Brand className="font-weight-bold text-muted">
              Scratch
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav activeKey={window.location.pathname}>
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/settings">
                    <Nav.Link>Settings</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <ErrorBoundary>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>
      </div>
    )
  );
}

export default App;