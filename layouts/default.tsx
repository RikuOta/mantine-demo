import type { ReactElement } from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ActionIcon, AppShell, Burger, Container, Drawer, Header, Navbar, NavLink, Title, useMantineTheme } from '@mantine/core'
import { IconBrandGithub, IconChecklist } from '@tabler/icons'

interface DefaultLayoutProps {
  children: ReactElement
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      navbarOffsetBreakpoint="md"
      navbar={
        <>
          {/* ナビゲーション (md 以上で表示) */}
          <Navbar width={{ base: 240 }} className="p-6 hidden md:block">
            <Link href="/todo" key="/todo">
              <NavLink
                label="TODO"
                icon={<IconChecklist size={16} stroke={1.5} />}
                active
                className="p-3"
              />
            </Link>
          </Navbar>
          {/* /ナビゲーション (md 以上で表示) */}

          {/* ナビゲーション (sm 以下で表示) */}
          <Drawer
            opened={opened}
            onClose={() => setOpened(false)}
            overlayColor={theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            withCloseButton={true}
            size={280}
            className="p-6 md:hidden"
          >
            <Link href="/todo" key="/todo">
              <NavLink
                label="TODO"
                icon={<IconChecklist size={16} stroke={1.5} />}
                active
                className="p-3"
              />
            </Link>
          </Drawer>
          {/* /ナビゲーション (sm 以下で表示) */}
        </>
      }
      header={
        <Header height={56} className="px-6">
          <div className="h-full flex items-center justify-between">
            {/* ハンバーガーアイコン (sm 以下で表示) */}
            <Burger
              opened={opened}
              size="sm"
              color={theme.colors.gray[6]}
              onClick={() => setOpened((o) => !o)}
              className="mr-4 md:hidden"
            />
            {/* /ハンバーガーアイコン (sm 以下で表示) */}

            <Title
              order={1} size="h3"
              color="dark.4"
              className="-ml-2.5 md:ml-0"
            >
              Mantine Demo
            </Title>

            <ActionIcon
              component="a"
              size="md"
              variant="default"
              href="https://github.com/RikuOta"
              target="_blank"
            >
              <IconBrandGithub size={14} />
            </ActionIcon>
          </div>
        </Header>
      }
    >
      <Container className="py-2 px-0 sm:px-4">
        {children}
      </Container>
    </AppShell>
  )
}
