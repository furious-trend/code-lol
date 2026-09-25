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
  const mockSignInWithOAuth = vi.fn();
  const mockPush = vi.fn();
  const mockSupabase = {
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
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

  it("renders Google login button", () => {
    render(<Login />);
    expect(screen.getByText(/Continue with Google/i)).toBeDefined();
  });
});
