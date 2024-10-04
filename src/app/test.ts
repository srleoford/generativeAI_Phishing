// import { NewUser } from "@/app/lib/definitions";
import { consent } from "@/app/lib/data"
import React from "react";

console.log(consent.map(part => {
    <p>
        {part.title ? "" : <h3>part.title</h3>}
                <hr/>
                {part.section}
                </p>
        }))

/**
 * Testing the NewUser validation and parasing
 */
// const email = "dlkj@dlkjm.com"
//
// try {
//     const surveyor = NewUser.safeParse({ email: email })
//     if (surveyor.success) {
//         const { email } = surveyor.data
//         console.log("Email: ", email, " Token: ")
//     }
//     else {
//         console.log("Invalid email! Please enter a valid email.")
//     }
// } catch (e) {
//     console.error(e)
// }


