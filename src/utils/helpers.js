import APPS from "./constants";

export const getApp = () => {
  const subdomain = getSubdomain(window.location.hostname);
  const main = APPS.find(app => app.main);

  if (!subdomain === "") return main.app;
  const app = APPS.find((app) => subdomain === app.subdomain);

  if (!app) return main.main;
  return app.main;
};

const getSubdomain = (hostname) => {
  const locationParts = hostname.split(".");
  let sliceTil = -2;

  const isLocalHost = locationParts.slice(-1)[0] === "localhost";
  if (isLocalHost) sliceTil = -1;
  return locationParts.slice(0, sliceTil).join("");
};
