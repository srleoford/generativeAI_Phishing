import { Button } from '@/once-ui/components'
import React from "react";

interface DefaultButtonProps {
    label: string;
    href: string;
    type?: string;
    name: string;
    value: string;
}

export function DefaultButton({ label, href, type, name, value }: DefaultButtonProps) {
    return (
        <Button
            href={ href }
            suffixIcon="chevronRight"
            variant="secondary"
            type={ type }
            name={ name }
            value={ value }>
            { label }
        </Button>
    )
}