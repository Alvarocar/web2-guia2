import { server } from "."
import { EDatabase } from "./const/message"

export const exit = (message: string) => {
  process.on('SIGTERM', () => {
    server.close(() => {
      console.error(message)
    })
  })
}

export const getEnv = (variableName: string, errMessage?: string): string  => {
  const env = process.env[variableName] || ''
  if (!env) { 
    const message = errMessage ? errMessage : `${EDatabase.ENV_NOT_SET} ${variableName}`
    exit(message)
  }
  return env
}