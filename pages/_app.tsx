import 'styles/globals.css'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DefaultLayout from 'layouts/default'

const resolvedTailwindConfig = resolveConfig(tailwindConfig)

// Tailwind のブレイクポイントを Mantine 用に変換
const tailwindScreensForMantine: {[key: string]: number} = {}
const tailwindScreens = resolvedTailwindConfig.theme?.screens
if (tailwindScreens) {
  for (const [key, value] of Object.entries(tailwindScreens)) {
    // 末尾の px を削除してから数値に変換
    tailwindScreensForMantine[key] = Number(value.slice(0, -2))
  }
}

const theme: MantineThemeOverride = {
  breakpoints: tailwindScreensForMantine
}

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Head>
        <title>Mantine Demo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={theme}
      >
        <DefaultLayout>
          <Component {...pageProps} />
        </DefaultLayout>
      </MantineProvider>

      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}
