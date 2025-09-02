import { useState } from "react";
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  Card,
  Group,
  Checkbox,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { LoremIpsum } from "lorem-ipsum";
import { randomId } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";

interface Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
  dueDate: Date | null;
  completedAt?: Date | null;
}

export default function HomePage() {
  const { colorScheme } = useMantineColorScheme(); // << ใช้ตรวจธีม
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Read a book",
      description: "Vite + React + Mantine + TS",
      isDone: false,
      dueDate: new Date(),
      completedAt: null,
    },
    {
      id: "2",
      title: "Write code",
      description: "Finish project for class",
      isDone: false,
      dueDate: new Date(),
      completedAt: null,
    },
    {
      id: "3",
      title: "Deploy app",
      description: "Push project to GitHub Pages",
      isDone: false,
      dueDate: new Date(),
      completedAt: null,
    },
  ]);

  const lorem = new LoremIpsum();

  const handleAdd = () => {
    const newTask: Task = {
      id: uuidv4(),
      title: randomId(),
      description: lorem.generateWords(10),
      isDone: false,
      dueDate: new Date(),
      completedAt: null,
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const deleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const toggleDoneTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? {
              ...t,
              isDone: !t.isDone,
              completedAt: !t.isDone ? new Date() : null,
            }
          : t
      )
    );
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  return (
    <Container size="sm" py="lg">
      <Stack align="center">
        <Title order={2}>Todo List</Title>
        <Text size="sm" c="dimmed">
          All : {tasks.length} | Done : {tasks.filter((t) => t.isDone).length}
        </Text>

        <Button onClick={handleAdd} color="blue" style={{ width: "200px" }}>
          Add Task
        </Button>

        <Stack w="100%">
          {tasks.map((task) => (
            <Card withBorder shadow="sm" radius="md" mb="sm" key={task.id}>
              {/* Title + Checkbox + Delete */}
              <Group justify="space-between" align="center">
                <Text
                  fw={600}
                  td={task.isDone ? "line-through" : "none"}
                  c={task.isDone ? "dimmed" : undefined}
                >
                  {task.title}
                </Text>

                <Group>
                  <Checkbox
                    checked={task.isDone}
                    onChange={() => toggleDoneTask(task.id)}
                    label="Done"
                    color="teal"
                  />
                  <ActionIcon
                    variant="light"
                    color="red"
                    onClick={() => deleteTask(task.id)}
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              {/* เนื้อหาด้านล่าง */}
              <Stack gap="xs" mt="sm">
                <Text size="sm" c="dimmed">
                  {task.description}
                </Text>

                {task.dueDate && (
                  <Text size="xs" c="gray">
                    Due: {task.dueDate.toLocaleDateString()}
                  </Text>
                )}

                {task.isDone && task.completedAt && (
                  <Text
                    size="xs"
                    c={colorScheme === "dark" ? "yellow" : "violet"} // << เปลี่ยนสีตามธีม
                  >
                    Done at: {formatDateTime(task.completedAt)}
                  </Text>
                )}
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

