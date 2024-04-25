export { auth as middleware } from "@/auth"
// middleware file in nextjs is a special file type where it creates a of code that will be executed
// every time a client requests to our website

// currently, thiis middleware is disabled. indicated by the "_" at the beginning of the file.
// I disabled this middleware cuz there's some issue with "next-auth": "^5.0.0-beta.16"
// We can enable this file when the issue is fixed, probably on the next version..