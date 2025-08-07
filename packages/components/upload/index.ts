import { withInstall } from '@yy-craft/utils/src/with-install'
import upload from './src/upload'

const uploadWithInstall = withInstall(upload)

export * from './src/upload'
export { upload, uploadWithInstall }
export default upload

declare module 'vue' {
  export interface GlobalComponents {
    YyUpload: typeof upload
  }
}
