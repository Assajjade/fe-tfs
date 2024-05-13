import { AppRouter, OrganizerRouter } from "../routers";

const APPS = [
    {
        subdomain: "www",
        app: AppRouter,
        main: true, 
    },
    {
        subdomain: "organizer",
        app: OrganizerRouter,
        main: false, 
    },
];

export default APPS;
