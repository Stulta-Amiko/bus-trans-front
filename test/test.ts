import { terminalName } from '../data/termData'
import * as fs from 'fs'
import axios, { AxiosResponse } from 'axios'

const setTimeOutSync = () => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      res(console.log('대기중'))
    }, 100)
  })
}

const isDir = (path: string) => {
  try {
    if (fs.lstatSync(path).isDirectory()) {
      return true
    }
  } catch (e: any) {
    if (e.code === 'ENONET') {
      return false
    }
  }
}

const isFile = (path: string) => {
  try {
    if (fs.lstatSync(path).isFile()) {
      return true
    }
  } catch (e: any) {
    if (e.code === 'ENONET') {
      return false
    }
  }
}

const makeFile = (dep: string, arr: string, res: AxiosResponse) => {
  if (isDir(`./logs/${dep}`)) {
    if (isFile(`./logs/${dep}/${arr}.json`)) {
      fs.rmSync(`./logs/${dep}/${arr}.json`)
      fs.writeFileSync(`./logs/${dep}/${arr}.json`, JSON.stringify(res.data))
      console.timeEnd()
    } else {
      console.log(res.data, typeof res.data)
      fs.writeFileSync(`./logs/${dep}/${arr}.json`, JSON.stringify(res.data))
      console.timeEnd()
    }
  } else {
    fs.mkdirSync(`./logs/${dep}`)
    if (isFile(`./logs/${dep}/${arr}.json`)) {
      fs.rmSync(`./logs/${dep}/${arr}.json`)
      fs.writeFileSync(`./logs/${dep}/${arr}.json`, JSON.stringify(res.data))
      console.timeEnd()
    } else {
      fs.writeFileSync(`./logs/${dep}/${arr}.json`, JSON.stringify(res.data))
      console.timeEnd()
    }
  }
}

const makeError = (i: number, j: number) => {
  const nowTime = new Date()
  fs.writeFileSync(
    `'./logs/error/${nowTime.getFullYear()}${nowTime.getMonth()}${nowTime.getDay()}_${nowTime.getHours()}${nowTime.getMinutes()}.json`,
    `${i} ${j} error occured`
  )
}

/*
axios
  .get(
    `http://localhost:3000/bustrans/bus?depTmn=서울경부&arrTmn=수원&depHour=0&depMin=0`
  )
  .then((res) => {
    makeFile('서울경부', '수원', res)
  })
    */

const main = async () => {
  for (let i = 36; i < terminalName.length; i++) {
    for (let j = 0; j < terminalName.length; j++) {
      await setTimeOutSync()
      axios
        .get(
          `http://localhost:3000/bustrans/bus?depTmn=${terminalName[i]}&arrTmn=${terminalName[j]}&depHour=0&depMin=0`
        )
        .then((res) => {
          makeFile(terminalName[i], terminalName[j], res)
          console.log(terminalName[i], terminalName[j])
        })
        .catch((e) => {
          console.error(e)
          makeError(i, j)
        })
    }
  }
}

main()
