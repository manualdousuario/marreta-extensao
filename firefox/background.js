const MARRETA = "https://marreta.pcdomanual.com/p/";

// Address bar button
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    browser.pageAction.show(tabId);
  }
});

browser.pageAction.onClicked.addListener((tab) => {
  browser.scripting
    .executeScript({
      target: { tabId: tab.id },
      func: () => window.location.href,
    })
    .then((results) => {
      const urlWithParam = `${MARRETA}${encodeURIComponent(results[0].result)}`;
      browser.tabs.create({ url: urlWithParam });
    });
});

// Context menu
browser.runtime.onInstalled.addListener(() => {
  browser.contextMenus.create({
    id: "sendTabUrl",
    title: "Abrir essa página com Marreta",
    contexts: ["page"],
    visible: true,
  });

  browser.contextMenus.create({
    id: "sendLink",
    title: "Abrir link com Marreta",
    contexts: ["link"],
    visible: true,
  });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendTabUrl" && tab.url) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(tab.url)}`;
    browser.tabs.create({ url: urlWithParam });
  } else if (info.menuItemId === "sendLink" && info.linkUrl) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(info.linkUrl)}`;
    browser.tabs.create({ url: urlWithParam });
  }
});
