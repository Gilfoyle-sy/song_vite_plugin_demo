import getServer from './getServer'

export default function vitePluginPromptDev(serverOptions) {

  return {
    name: 'vite-plugin-prompt-dev',
    version: '1.0.0',

    async config(config, { mode, command }) {
      if (mode === 'development' && command === 'serve') {
        const server = await getServer(serverOptions)
        return { server }
      }
      return {}
    },
  }
}
