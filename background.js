const MARRETA = "https://marreta.pcdomanual.com/p/";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "sendTabUrl",
    title: "Abrir essa página com Marreta",
    contexts: ["page"],
    visible: true,
  });

  chrome.contextMenus.create({
    id: "sendLink",
    title: "Abrir link com Marreta",
    contexts: ["link"],
    visible: true,
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "sendTabUrl" && tab.url) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(tab.url)}`;
    chrome.tabs.create({ url: urlWithParam });
  } else if (info.menuItemId === "sendLink" && info.linkUrl) {
    const urlWithParam = `${MARRETA}${encodeURIComponent(info.linkUrl)}`;
    chrome.tabs.create({ url: urlWithParam });
  }
});
