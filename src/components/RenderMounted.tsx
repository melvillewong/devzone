"use client";

import React, { ReactNode, useEffect, useState } from "react";

interface RenderMountedProps {
  children: ReactNode;
}

export const RenderMounted: React.FC<RenderMountedProps> = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return <>{children}</>;
};
