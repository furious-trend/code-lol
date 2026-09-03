import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/login/page";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

vi.mock("next/navigation", () => ({ useRouter: vi.fn() }));
vi.mock("@/lib/supabase/client", () => ({ createClient: vi.fn() }));
vi.mock("@/components/Bugsy", () => ({ Bugsy: () => <div data-testid="bugsy" /> }));

vi.mock("framer-motion", () => {
  const React = require("react");
  const motion = new Proxy({}, {
    get: (_t: unknown, tag: string) =>
      ({ children, ...props }: Record<string, unknown>) =>
        React.createElement(tag, props, children),
  });
  return { motion, AnimatePresence: ({ children }: { children: unknown }) => children };
});

describe("Authentication Flow Integration", () => {
  const mockSignInWithPassword = vi.fn();
  const mockSignInWithOAuth = vi.fn();
  const mockSignUp = vi.fn();
  const mockPush = vi.fn();
  const mockSupabase = {
    auth: {
      signInWithPassword: mockSignInWithPassword,
      signInWithOAuth: mockSignInWithOAuth,
      signUp: mockSignUp,
      getUser: vi.fn().mockResolvedValue({ data: { user: null }, error: null }),
    },
    from: vi.fn().mockReturnValue({
      upsert: vi.fn().mockResolvedValue({ error: null })
    })
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (createClient as any).mockReturnValue(mockSupabase);
    (useRouter as any).mockReturnValue({ push: mockPush });
  });

  it("renders Sign In mode by default", () => {
    render(<Login />);
    expect(screen.getByRole("button", { name: /Sign In/i })).toBeDefined();
    expect(screen.getByPlaceholderText(/Username or Email/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Password/i)).toBeDefined();
  });

  it("renders Join Arena mode with registration fields and Humor Selector", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /Join Arena/i }));
    
    expect(screen.getByText(/Continue with Google/i)).toBeDefined();
    expect(screen.getByText(/Continue with Facebook/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Choose Username/i)).toBeDefined();
    expect(screen.getByPlaceholderText(/Set Password/i)).toBeDefined();
    expect(screen.getByText(/General Dev Meme/i)).toBeDefined();
    expect(screen.getByText(/Tamil Comedy Sense/i)).toBeDefined();
  });

  it("allows selection of humor preference and submission for signup", async () => {
    mockSignUp.mockResolvedValueOnce({ data: { user: { id: "new-user" } }, error: null });
    
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /Join Arena/i }));
    
    fireEvent.change(screen.getByPlaceholderText(/Choose Username/i), { target: { value: "newcoder" } });
    fireEvent.change(screen.getByPlaceholderText(/Set Password/i), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/Tamil Comedy Sense/i));
    
    fireEvent.click(screen.getByRole("button", { name: /Create Account/i }));
    
    await waitFor(() => {
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "newcoder",
        password: "password123",
        options: {
          data: {
            username: "newcoder",
            humor_preference: "tamil"
          }
        }
      });
    });
  });
});
