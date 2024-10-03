import { Button, Input } from "@/once-ui/components";
import React from "react";



export default async function RegisterCardWrapper() {

    return (
        <>
            <RegisterForm title="Registration" value="" type="email" error=""/>
        </>
    );
}



export function RegisterForm({
                                 title,
                                 value,
                                 type,
                                 error
                             }: {
    title: string;
    value: number | string;
    type: 'email';
    error: string;
}) {

    return (
        <form>
            <header>
                <h2>{title}</h2>
            </header>
            <hr/>
            <br/>
            <section>
                <label htmlFor="user-email">
                    <Input
                        id="user-email"
                        label="Email"
                        error={error && "Please enter a valid email"}
                        // onChange={onChange}
                    />
                </label>
            </section>
            <br/>
            <hr/>
            <br/>
            <footer>
                <Button
                    href="intro"
                    suffixIcon="chevronRight"
                    variant="secondary"
                    type="submit">
                    {/*onSubmit={validateEmail}>*/}
                    Register
                </Button>
            </footer>
        </form>
    );
}
