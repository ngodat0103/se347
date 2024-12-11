"use client";

interface LandingPageLayoutProps {
  children: React.ReactNode;
}

const LandingPageLayout = ({ children }: LandingPageLayoutProps) => {
  return <main>{children}</main>;
};

export default LandingPageLayout;
