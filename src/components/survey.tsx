import React from "react";
import { Card } from '@/bootstrap'
import { Flex, Skeleton } from "@/once-ui/components";

export default function Survey() {
    return (
        <Flex>
            <form onSubmit={(e) =>
                e.preventDefault()} >
                <label htmlFor=""></label>
                <input type=""/>
            </form>
        </Flex>
    )
}