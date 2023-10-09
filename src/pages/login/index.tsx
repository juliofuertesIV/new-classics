import Layout from "@/layout/Layout"
import { useMutation } from "@tanstack/react-query"
import { FormEvent } from "react"

export default function Login() {

    const loginRequest = async (payload : { email: string, password: string }) => {
        const data = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify(payload)
        }).then(async (data) => await data.json())

        return data
    }

    const loginMutation = useMutation({
        mutationFn: loginRequest,
        onSuccess: (data) => console.log(data),
        onError: (err) => alert(err)
    })

    const onSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const payload = Object.fromEntries(new FormData(e.currentTarget)) as { email: string, password: string }
        return loginMutation.mutate(payload)
    }

    return (
        <Layout>
            <section className="grid place-items-center w-full max-w-6xl">
                <header className="w-full text-center py-8">
                    <h1>Login</h1>
                    <h3>And be careful</h3>
                </header>
                <div className="w-full max-w-lg">
                    <form onSubmit={ onSubmitLoginForm }>
                        <label>
                            <p>email: </p>
                            <input type="email" name="email" placeholder="email" />
                        </label>
                        <label>
                            <p>email: </p>
                            <input type="password" name="password" placeholder="email" />
                        </label>
                        <input className="border w-full" type="submit" value={ 'login' } />                        
                    </form>
                </div>
            </section>
        </Layout>
    )
}
