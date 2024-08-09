import React, { createContext, useContext } from 'react'
import { UseFormReturn, FieldValues } from 'react-hook-form'

interface FormProviderProps<T extends FieldValues> {
  methods: UseFormReturn<T>
  children: React.ReactNode
}

type ContextType<T extends FieldValues> = UseFormReturn<T> | undefined

const FormContext = createContext<ContextType<any>>(undefined)

export const FormProvider = <T extends FieldValues>({
  children,
  methods,
}: FormProviderProps<T>): React.ReactElement => {
  return <FormContext.Provider value={methods}>{children}</FormContext.Provider>
}

export const useFormContext = <T extends FieldValues>(): UseFormReturn<T> => {
  const context = useContext(FormContext) as ContextType<T>
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider')
  }
  return context
}
