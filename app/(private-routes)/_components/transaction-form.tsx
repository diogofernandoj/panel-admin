'use client'

import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/app/_components/ui/form'
import { Input } from '@/app/_components/ui/input'
import { Button } from '@/app/_components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/app/_components/ui/select'
import { ArrowDownIcon, ArrowUpIcon, CalendarIcon } from 'lucide-react'
import { Calendar } from '@/app/_components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/app/_components/ui/popover'
import { format } from 'date-fns'
import { cn } from '@/app/_lib/utils'
import CurrencyInput from 'react-currency-input-field'
import { createTransaction } from '@/app/_actions/create-transaction'
import { useToast } from '@/app/_components/ui/use-toast'
import { Transaction } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { editTransaction } from '@/app/_actions/edit-transaction'

const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Título deve conter no mínimo 2 caracteres.',
  }),
  date: z.date({ required_error: 'A data é obrigatória.' }),
  type: z.string(),
  amount: z.any({ required_error: 'O valor não pode ficar em branco.' }),
})

interface TransactionFormProps {
  setIsOpen?: (value: boolean) => void
  transaction?: Transaction
}

const TransactionForm = ({ setIsOpen, transaction }: TransactionFormProps) => {
  const { toast } = useToast()
  const { replace } = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: transaction?.title || '',
      type: !transaction?.type ? '0' : '1',
      date: transaction?.date || undefined,
      amount: transaction?.amount || '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true)
    if (transaction) {
      await editTransaction({
        id: transaction.id,
        data: {
          title: values.title,
          date: values.date,
          type: !!Number(values.type),
          amount: parseFloat(values.amount.replace(',', '.')),
        },
      })
      toast({
        title: 'Transação atualizada com sucesso!',
      })
      return replace('/transactions')
    }

    await createTransaction({
      title: values.title,
      date: values.date,
      type: !!Number(values.type),
      amount: parseFloat(values.amount.replace(',', '.')),
    })

    if (setIsOpen) {
      setIsOpen(false)
    }
    toast({
      title: 'Transação adicionada com sucesso!',
    })
  }

  const handleCancelButtonClick = () => {
    if (transaction) {
      replace('/transactions')
    }

    if (setIsOpen) {
      setIsOpen(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          disabled={loading}
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/6">Título</FormLabel>
              <FormControl>
                <Input
                  className="w-full flex-1"
                  placeholder="Insira um título"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/6">Tipo</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full flex-1">
                    <SelectValue placeholder="Selecione o tipo da transação" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">
                    <span className="flex items-center gap-1">
                      Entrada <ArrowUpIcon size={14} color="#0f0" />
                    </span>
                  </SelectItem>
                  <SelectItem value="0">
                    <span className="flex items-center gap-1">
                      Saída <ArrowDownIcon size={14} color="#f00" />
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/6">Data</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      disabled={loading}
                      variant="outline"
                      className={cn(
                        'w-full pl-3 text-left flex-1',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'dd / MM / yyyy')
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="flex items-center gap-4">
              <FormLabel className="w-1/6">Valor</FormLabel>
              <FormControl>
                <CurrencyInput
                  disabled={loading}
                  className={`bg-background border border-solid border-secondary rounded-sm p-2 w-full flex-1 ${loading && 'opacity-50 cursor-not-allowed'}`}
                  placeholder="R$ 0,00"
                  decimalsLimit={2}
                  intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                  value={field.value}
                  onValueChange={field.onChange}
                  onBlur={field.onBlur}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-end">
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            onClick={handleCancelButtonClick}
          >
            Cancelar
          </Button>
          <Button disabled={loading} type="submit">
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default TransactionForm
