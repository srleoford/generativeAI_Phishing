import React from "react";
import { Flex, Skeleton } from "@/once-ui/components";

export default function Survey() {
    return (
        <Flex>
            <Skeleton
                shape="line"
                width="m"
                height="xl"
            />
            <form onSubmit={(e) =>
                e.preventDefault()} >

            </form>
        </Flex>
    )
}