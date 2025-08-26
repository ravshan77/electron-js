import { z } from 'zod'
import { useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { authApi } from '@/services/auth.service'
import { useAuth } from '@/context/auth/authContext'
import { zodResolver } from '@hookform/resolvers/zod'
import { formatPhoneNumber } from '@/utils/formatPhoneNumber'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const FormSchema = z.object({
  password: z.string().min(1, 'Parolni kiriting'),
  phone: z.string().min(1, 'Telefon raqamni kiriting'),
})

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({ resolver: zodResolver(FormSchema) })
  const { handleSubmit, setValue } = form
  const { dispatch } = useAuth()
  const navigate = useNavigate()


  useEffect(() => {
    setValue('phone', '991940851')
    setValue('password', '991940851')
  }, [])

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true)
    try {
      const response = await authApi.login({ phone: `998${data.phone}`, password: data.password, otp: null })

      if (!response?.resoult?.token) {
        toast({ variant: 'destructive', title: 'Xatolik', description: 'Foydalanuvchi tizimga kirish huquqiga ega emas' })
        setLoading(false)
        return
      }

      sessionStorage.setItem("auth", JSON.stringify(response.resoult));
      window.location.reload()

    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Xatolik', description: err?.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center flex-col bg-gray-50 px-4'>
      <Card className='w-full max-w-sm shadow-lg rounded-2xl'>
        <CardHeader className='flex flex-col items-center space-y-2 pt-8'>
          <CardTitle className="text-2xl font-bold text-gray-800">Metra App</CardTitle>
        </CardHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className='px-4 py-6 space-y-6'>
            <CardContent className='space-y-5'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700">Telefon raqam</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">+998</span>
                        <Input 
                          {...field}
                          value={formatPhoneNumber(field.value)}
                          inputMode='numeric'
                          required
                          disabled={loading}
                          className="pl-16"
                          type="tel"
                          placeholder="_ _  _ _ _  _ _ _ _"
                          onChange={(e) => {
                            const rawValue = e.target.value.replace(/\D/g, "")?.slice(0, 10);
                            field.onChange(rawValue);
                          }}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-700">Parol</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input {...field} inputMode='numeric' disabled={loading} type={showPassword ? "text" : "password"} placeholder="********"/>
                        <Button onClick={() => setShowPassword(!showPassword)} disabled={loading} size="icon" type="button" variant="ghost" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className='flex flex-col space-y-4'>
              <Button type='submit' className='w-full' disabled={loading}>
                {loading ? 'Tekshirlomoqda...' : 'Kirish'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
