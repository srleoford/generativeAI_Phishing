import { Button, Input } from "@/once-ui/components";
import React from "react";



export default async function RegisterCardWrapper() {

    return (
        <>
            <RegisterForm title="Registration" value="Register" type="email"/>
        </>
    );
}

export function RegisterForm({
                                 title,
                                 value,
                                 type,
                             }: {
    title: string;
    value: number | string;
    type: 'email';
}) {

    return (
        <>
            <header>
                <h2>{title}</h2>
            </header>
            <section>
                <label htmlFor="user-email">
                    <Input
                        id="user-email"
                        label="Email"
                        labelAsPlaceholder
                        value=""
                        // onChange={onChange}
                    />
                </label>
            </section>
            <footer>
                <Button
                    href="intro"
                    suffixIcon="chevronRight"
                    variant="secondary"
                    type="submit">
                    {value}
                </Button>
            </footer>
        </>
    );
}
