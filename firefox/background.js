const MARRETA = "https://marreta.pcdomanual.com/p/";
const PAGE_TITLE = "Abrir essa página com Marreta";
const LINK_TITLE = "Abrir link com Marreta";
const DISABLED_ICON = "./icons/icon48-disabled.png";
const ENABLED_ICON = "./icons/icon48.png";

// Toolbar Button settings
const toolbarEvent = async (tab) => {
  try {
    const tabInfo = await browser.tabs.get(tab.id);
    if (tabInfo.url) {
      const urlWithParam = `${MARRETA}${encodeURIComponent(tabInfo.url)}`;
      await browser.tabs.update(tab.id, { url: urlWithParam });
    }
  } catch (error) {
    console.warn(error);
  }
};

browser.pageAction.onClicked.addListener(toolbarEvent);

const iconStatus = async (tabId) => {
  try {
    const tab = await browser.tabs.get(tabId);

    if (tab && tab.url) {
      const isMarreta = tab.url.includes(MARRETA);
      const iconPath = isMarreta ? ENABLED_ICON : DISABLED_ICON;
      const title = isMarreta ? "" : PAGE_TITLE;

      browser.pageAction.onClicked[
        isMarreta ? "removeListener" : "addListener"
      ](toolbarEvent);

      browser.pageAction.setIcon({
        tabId: tabId,
        path: {
          16: iconPath,
        },
      });
      browser.pageAction.setTitle({ tabId: tabId, title: title });
    }
  } catch (error) {
    console.warn(error);
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
