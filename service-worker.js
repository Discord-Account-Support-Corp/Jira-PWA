const CACHE_NAME = "jira-cache-v2";
const JIRA_PROJECT_URL = "https://discord-account-support-corp.atlassian.net/jira/polaris/projects/COMMUNITY/ideas/view/8270241";

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(["/", JIRA_PROJECT_URL]);
    })
  );
});

self.addEventListener("fetch", e => {
  const url = e.request.url;

  if (url.startsWith("https://discord-account-support-corp.atlassian.net/jira/polaris/projects/COMMUNITY/")) {
    e.respondWith(
      caches.match(e.request).then(response => {
        return response || fetch(e.request).then(fetchRes => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, fetchRes.clone());
            return fetchRes;
          });
        });
      })
    );
  } else {
    e.respondWith(fetch(e.request));
  }
});
