---
title: "IpcRendererEvent Object extends `Event`"
description: ""
slug: ipc-renderer-event
hide_title: false
---

# IpcRendererEvent Object extends `Event`

* `sender` [IpcRenderer](latest/api/ipc-renderer.md) - The `IpcRenderer` instance that emitted the event originally
* `senderId` Integer _Deprecated_ - The `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo][ipc-renderer-sendto] for more information. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.
* `senderIsMainFrame` boolean (optional) _Deprecated_ - Whether the message sent via [ipcRenderer.sendTo][ipc-renderer-sendto] was sent by the main frame. This is relevant when `nodeIntegrationInSubFrames` is enabled in the originating `webContents`.
* `ports` [MessagePort][][] - A list of MessagePorts that were transferred with this message

[ipc-renderer-sendto]: latest/api/ipc-renderer.md#ipcrenderersendtowebcontentsid-channel-args-deprecated
[MessagePort]: https://developer.mozilla.org/en-US/docs/Web/API/MessagePort
