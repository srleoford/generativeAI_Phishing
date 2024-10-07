import { register } from '@/app/actions'
import { Button } from '@/once-ui/components'
import React from "react";

export function DefaultButton({ label }: { label: string }, { type }: { type: string }) {
    return (
        <Button
            href="register"
            suffixIcon="chevronRight"
            variant="secondary"
            type={type}>
            { label }
        </Button>
    )
}