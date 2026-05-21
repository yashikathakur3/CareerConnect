import { render, screen } from "@testing-library/react";
import App from "./App";
import { AuthProvider } from "./components/AuthContext";

test("renders the Career Connect home page", () => {
  render(
    <AuthProvider>
      <App />
    </AuthProvider>
  );

  expect(screen.getAllByText(/Career Connect/i).length).toBeGreaterThan(0);
});
