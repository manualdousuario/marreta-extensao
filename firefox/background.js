const MARRETA = "https://marreta.pcdomanual.com/p/";
const PAGE_TITLE = "Abrir essa página com Marreta";
const LINK_TITLE = "Abrir link com Marreta";
const ENABLED_ICON = "./icon16.png";
const DARK_ICON = "./icon16-disabled-dark.png";
const LIGHT_ICON = "./icon16-disabled-light.png";

// Icon Theme settings
let DISABLED_ICON;

browser.tabs.onActivated.addListener((tabId, changeInfo, tab) => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  DISABLED_ICON = isDarkMode ? DARK_ICON : LIGHT_ICON;
});

// Address Bar Button settings
const addressBarEvent = (tab) => {
  browser.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: () => window.location.href,
    })
    .then((results) => {
      const urlWithParam = `${MARRETA}${encodeURIComponent(results[0].result)}`;
      browser.tabs.update({ url: urlWithParam });
    });
};

browser.pageAction.onClicked.addListener(addressBarEvent);

const iconStatus = async (tabId) => {
  try {
    const tab = await browser.tabs.get(tabId);

    if (tab && tab.url) {
      const isMarreta = tab.url.includes(MARRETA);
      const iconPath = isMarreta ? ENABLED_ICON : DISABLED_ICON;
      const title = isMarreta ? "" : PAGE_TITLE;

      browser.pageAction.onClicked[
        isMarreta ? "removeListener" : "addListener"
      ](addressBarEvent);

      browser.pageAction.setIcon({
        tabId: tabId,
        path: {
          16: iconPath,
        },
      });
      browser.pageAction.setTitle({ tabId: tabId, title: title });

      browser.pageAction.show(tabId);
    }
  } catch (error) {
    console.error(error);
  }
};

// Fires when the active tab in a window changes
browser.tabs.onActivated.addListener((activeInfo) => {
  iconStatus(activeInfo.tabId);
});

// Fires when a tab/URL is updated
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active) {
    iconStatus(tabId);
  }
});

// Context Menu settings
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "sendTabUrl",
    title: PAGE_TITLE,
    contexts: ["page"],
    visible: true,
  });

  browser.contextMenus.create({
    id: "sendLink",
    title: LINK_TITLE,
    contexts: ["link"],
    visible: true,
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendTabUrl" && tab.url) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(tab.url)}`;
    browser.tabs.update({ url: urlWithParam });
  } else if (info.menuItemId === "sendLink" && info.linkUrl) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(info.linkUrl)}`;
    browser.tabs.create({ url: urlWithParam });
  }
});
