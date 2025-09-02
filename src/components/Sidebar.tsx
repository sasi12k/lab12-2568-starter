import { NavLink as RouterNavLink } from "react-router-dom";
import {
  NavLink,
  Stack,
  Box,
  Avatar,
  Indicator,
  Text,
  Group,
} from "@mantine/core";

interface SidebarComponentProps {
  userName?: string;
  type?: "admin" | "student";
  userAvatarUrl?: string; // เพิ่ม props สำหรับรูปโปรไฟล์
}

export default function Sidebar({
  userName = "Sasikan",
  type = "admin",
  userAvatarUrl = "https://i.pravatar.cc/150?img=68", // รูปน่ารัก
}: SidebarComponentProps) {
  return (
    <Stack align="stretch" justify="space-between" gap="md" style={{ height: "100%" }}>
      {/* Menu */}
      <Box>
        <NavLink color="cyan" label="Home" component={RouterNavLink} to="/" active />
        <NavLink color="cyan" label="About" component={RouterNavLink} to="/about" />
      </Box>

      {/* User Info แบบเพื่อน */}
      <Box
        p={12}
        style={{
          border: "1px solid #e0e0e0",
          borderRadius: 12,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Text size="xs" fw={600} mb={4} color="green">
          Online
        </Text>
        <Group gap={10} align="center">
          <Indicator color="green" position="bottom-end" offset={2}>
            <Avatar size={36} radius="xl" src={userAvatarUrl} />
          </Indicator>
          <Stack gap={0}>
            <Text size="sm" fw={500}>
              {userName}
            </Text>
            <Text size="xs" color="dimmed">
              {type === "admin" ? "Admin" : "Student"}
            </Text>
          </Stack>
        </Group>
      </Box>
    </Stack>
  );
}
