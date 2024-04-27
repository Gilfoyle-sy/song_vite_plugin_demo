import prompts from 'prompts'
import os from 'os'


/**
 * 获取本机ip
 */
const getCurrentIP = () => {
  const interfaces = os.networkInterfaces();
  for (const key in interfaces) {
    for (const iface of interfaces[key]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address
      }
    }
  }
}


/**
 * 生成问题列表
 * @param {Object} serverOptions
 * @returns Array
 */
const createChoiceList = (serverOptions) => {
  const res = Object.entries(serverOptions).map(([title, options]) => {
    return {
      title,
      description: `http://${options.host}:${options.port}`,
      value: options,
    }
  })

  const currentIP = getCurrentIP()

  if (currentIP) {
    const index = res.findIndex(item => item.value.host === currentIP)
    if (index !== -1) {
      const element = res[index]
      res.splice(index, 1).unshift(element)
    }
  }

  return res
}


// 人员较少时的单选
const selectQuestions = (serverOptions) => {
  return {
    type: 'select',
    name: 'server',
    message: '选择服务配置',
    choices: createChoiceList(serverOptions)
  }
}

// 人员较多时的单选，可输入过滤
const autocompleteQuestions = (serverOptions) => {
  return {
    type: 'autocomplete',
    name: 'server',
    message: '请选择服务配置，可输入筛选，未选择时使用locahost',
    initial: 1,
    limit: 5,
    suggest: (input, choices) => choices.filter(i => i.title.toLowerCase().includes(input.toLowerCase())),
    choices: createChoiceList(serverOptions),
    fallback: {
      title: '未找到相关配置',
      value: 'error'
    },
  }
}

/**
 *
 * @param {Object} serverOptions
 * @param {String | undefined} questionType : autocomplete | select | undefined
 * @returns
 */
const getServer = async (serverOptions, questionType) => {
  let response = {}
  if (!questionType || questionType === 'select') {
    response = await prompts(selectQuestions(serverOptions))
  } else {
    response = await prompts(autocompleteQuestions(serverOptions))
  }

  return response.server
}

export default getServer

