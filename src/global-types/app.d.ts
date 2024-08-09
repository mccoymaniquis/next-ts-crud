import { List } from 'ts-toolbelt'
import { Paths } from 'ts-toolbelt/out/Object/Paths'

type Join<T extends List.List, D extends string> = T extends []
  ? ''
  : T extends [(string | number | boolean)?]
  ? `${T[0]}`
  : T extends [(string | number | boolean)?, ...infer U]
  ? `${T[0]}` | `${T[0]}${D}${Join<U, D>}`
  : never

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never

declare module '*.svg' {
  const content: React.ElementType<React.ComponentPropsWithRef<'svg'>>
  export default content
}

declare global {
  export type NestedPaths<V> = Join<Paths<V>, '.'>

  interface ObjectConstructor {
    keys<T>(o: T): ObjectKeys<T>
  }

  interface Array<T> {
    includes(searchElement: any, fromIndex?: number): searchElement is T
  }

  interface ReadonlyArray<T> {
    includes(searchElement: any, fromIndex?: number): searchElement is T
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_MAP_API_KEY: string
      NEXT_PUBLIC_API_BASE_URL: string
      NEXT_PUBLIC_CLIENT_ID: string
      NEXT_PUBLIC_CLIENT_SECRET: string
      NEXT_PUBLIC_COOKIE_NAME: string
    }
  }
}
