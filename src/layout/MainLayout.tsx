import { Outlet } from "react-router-dom";
import { AppShell, MantineProvider, ColorSchemeScript } from "@mantine/core";
import HeaderComponent from "../components/Header";
import Sidebar from "../components/Sidebar";
import FooterComponent from "../components/Footer";
import { useDisclosure } from "@mantine/hooks";

export default function MainLayout() {
  const [opened, { toggle }] = useDisclosure();

  return (
    <MantineProvider
      theme={{
        fontFamily: "Arial, sans-serif",
        colors: {
          brand: ["#f0f9ff", "#e0f2fe", "#bae6fd", "#7dd3fc", "#38bdf8", "#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e"],
        },
        primaryColor: "brand",
      }}
      defaultColorScheme="light"
    >
      <ColorSchemeScript />

      <AppShell
        padding="md"
        header={{ height: 70 }}
        navbar={{ width: 300, breakpoint: "sm", collapsed: { mobile: !opened } }}
        footer={{ height: 50 }}
      >
        <AppShell.Header>
          <HeaderComponent opened={opened} toggle={toggle} />
        </AppShell.Header>

        <AppShell.Navbar>
          <Sidebar />
        </AppShell.Navbar>

        <AppShell.Footer>
          <FooterComponent year="2025" fullName="Sasikan" studentId="660612159" />
        </AppShell.Footer>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
}
