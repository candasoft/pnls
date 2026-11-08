# Virtual experience analytics

The hall sends an anonymous browser identifier with a heartbeat every 15 seconds while visible. Online means a heartbeat or action in the last 60 seconds, so departure may take up to a minute to appear. Tabs sharing local storage count as one browser; storage-blocked browsers use a temporary in-memory ID. No names, IP addresses or enquiry content are recorded by this feature.

Opening a hall booth records a visit; repeated opens count again. Opening the stage records an open, not confirmed video playback. Rankings and zone percentages use booth opens. Rapid actions within one second are ignored. These are approximate interaction metrics, not audited attendance. The directory is outside this reporting scope.

`app/api/virtual-experience/stats/route.ts` validates same-origin writes and known booth IDs and exposes aggregate counts only. It uses a bounded process-local store on `globalThis`, with a rolling reporting window reset after 24 hours or on process restart. The UI states this limitation. Offline totals remain visible, with online count unavailable until reconnection.

Before multi-instance or serverless production hosting, replace the store with a shared database/Redis service, using expiring presence records and atomic increments. The current implementation is intended for the running single-server preview; separate processes do not share totals. Public browser events can be manipulated and should not be used for billing or official reporting.
