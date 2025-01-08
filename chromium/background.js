const MARRETA = "https://marreta.pcdomanual.com/p/";
const PAGE_TITLE = "Abrir essa página com Marreta";
const LINK_TITLE = "Abrir link com Marreta";
const DISABLED_ICON = "./icon48-disabled-chromium.png";
const ENABLED_ICON = "./icon48.png";

// Toolbar Button settings
const toolbarEvent = (tab) => {
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: () => window.location.href,
    })
    .then((results) => {
      const urlWithParam = `${MARRETA}${encodeURIComponent(results[0].result)}`;
      chrome.tabs.update({ url: urlWithParam });
    });
};

chrome.action.onClicked.addListener(toolbarEvent);

const iconStatus = async (tabId) => {
  try {
    const tab = await chrome.tabs.get(tabId);

    if (tab && tab.url) {
      const isMarreta = tab.url.includes(MARRETA);
      const iconPath = isMarreta ? ENABLED_ICON : DISABLED_ICON;
      const title = isMarreta ? "" : PAGE_TITLE;

      chrome.action.onClicked[isMarreta ? "removeListener" : "addListener"](
        toolbarEvent
      );

      chrome.action.setIcon({ path: iconPath });
      chrome.action.setTitle({ title });
    }
  } catch (error) {
    console.warn(error);
  }
};

// Fires when the active tab in a window changes
chrome.tabs.onActivated.addListener((activeInfo) => {
  iconStatus(activeInfo.tabId);
});

// Fires when a tab/URL is updated
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active) {
    iconStatus(tabId);
  }
});

// Context Menu settings
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendTabUrl",
    title: PAGE_TITLE,
    contexts: ["page"],
    visible: true,
  });

  chrome.contextMenus.create({
    id: "sendLink",
    title: LINK_TITLE,
    contexts: ["link"],
    visible: true,
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendTabUrl" && tab.url) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(tab.url)}`;
    chrome.tabs.update({ url: urlWithParam });
  } else if (info.menuItemId === "sendLink" && info.linkUrl) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(info.linkUrl)}`;
    chrome.tabs.create({ url: urlWithParam });
  }
});
