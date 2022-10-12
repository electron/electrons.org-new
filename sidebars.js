module.exports = {
  docs: [
    {
      type: 'category',
      label: 'Get Started',
      items: [
        'latest/tutorial/introduction',
        'latest/tutorial/quick-start',
        'latest/tutorial/installation',
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: [
        'latest/tutorial/tutorial-1-prerequisites',
        'latest/tutorial/tutorial-2-first-app',
        'latest/tutorial/tutorial-3-preload',
        'latest/tutorial/tutorial-4-adding-features',
        'latest/tutorial/tutorial-5-packaging',
        'latest/tutorial/tutorial-6-publishing-updating',
      ],
    },
    {
      type: 'category',
      label: 'Processes in Electron',
      items: [
        'latest/tutorial/process-model',
        'latest/tutorial/context-isolation',
        'latest/tutorial/ipc',
        'latest/tutorial/sandbox',
        'latest/tutorial/message-ports',
      ],
    },
    {
      type: 'category',
      label: 'Best Practices',
      items: [
        'latest/tutorial/performance',
        'latest/tutorial/security',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      link: {
        type: 'doc',
        id: 'latest/tutorial/examples',
      },
      items: [
        'latest/tutorial/dark-mode',
        'latest/tutorial/devices',
        {
          type: 'doc',
          id: 'latest/tutorial/in-app-purchases',
          customProps: {
            tags: [
              'mac',
            ],
          },
        },
        'latest/tutorial/keyboard-shortcuts',
        'latest/tutorial/launch-app-from-url-in-another-app',
        {
          type: 'doc',
          id: 'latest/tutorial/linux-desktop-actions',
          customProps: {
            tags: [
              'linux',
            ],
          },
        },
        {
          type: 'doc',
          id: 'latest/tutorial/macos-dock',
          customProps: {
            tags: [
              'mac',
            ],
          },
        },
        'latest/tutorial/multithreading',
        'latest/tutorial/native-file-drag-drop',
        'latest/tutorial/notifications',
        'latest/tutorial/offscreen-rendering',
        'latest/tutorial/online-offline-events',
        'latest/tutorial/progress-bar',
        {
          type: 'doc',
          id: 'latest/tutorial/recent-documents',
          customProps: {
            tags: [
              'mac',
              'windows',
            ],
          },
        },
        {
          type: 'doc',
          id: 'latest/tutorial/represented-file',
          customProps: {
            tags: [
              'mac',
            ],
          },
        },
        'latest/tutorial/spellchecker',
        'latest/tutorial/tray',
        'latest/tutorial/web-embeds',
        {
          type: 'doc',
          id: 'latest/tutorial/windows-taskbar',
          customProps: {
            tags: [
              'windows',
            ],
          },
        },
        'latest/tutorial/window-customization',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      items: [
        'latest/tutorial/accessibility',
        'latest/tutorial/asar-archives',
        'latest/tutorial/asar-integrity',
        'latest/tutorial/boilerplates-and-clis',
        'latest/tutorial/fuses',
        'latest/tutorial/using-native-node-modules',
        'latest/tutorial/windows-arm',
      ],
    },
    {
      type: 'category',
      label: 'Distribution',
      items: [
        'latest/tutorial/forge-overview',
        {
          type: 'category',
          label: 'Advanced Reference',
          link: {
            type: 'doc',
            id: 'latest/tutorial/distribution-overview',
          },
          items: [
            'latest/tutorial/application-distribution',
            'latest/tutorial/code-signing',
            'latest/tutorial/updates',
            {
              type: 'category',
              label: 'App Store Guides',
              items: [
                'latest/tutorial/mac-app-store-submission-guide',
                'latest/tutorial/windows-store-guide',
                'latest/tutorial/snapcraft',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Testing And Debugging',
      items: [
        'latest/tutorial/automated-testing',
        'latest/tutorial/debugging-main-process',
        'latest/tutorial/debugging-vscode',
        'latest/tutorial/repl',
        'latest/tutorial/devtools-extension',
        'latest/tutorial/application-debugging',
        'latest/tutorial/testing-on-headless-ci',
      ],
    },
    {
      type: 'category',
      label: 'References',
      items: [
        'latest/breaking-changes',
        'latest/tutorial/electron-timelines',
        'latest/tutorial/electron-versioning',
        'latest/faq',
        'latest/glossary',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      items: [
        {
          type: 'category',
          label: 'Build Instructions',
          link: {
            type: 'doc',
            id: 'latest/development/build-instructions-gn',
          },
          items: [
            'latest/development/build-instructions-linux',
            'latest/development/build-instructions-macos',
            'latest/development/build-instructions-windows',
            'latest/development/goma',
          ],
        },
        {
          type: 'category',
          label: 'Debugging',
          link: {
            type: 'doc',
            id: 'latest/development/debugging',
          },
          items: [
            'latest/development/debugging-on-macos',
            'latest/development/debugging-on-windows',
            'latest/development/debugging-with-xcode',
            'latest/development/debugging-with-symbol-server',
          ],
        },
        {
          type: 'category',
          label: 'Development Guides',
          items: [
            'latest/development/azure-vm-setup',
            'latest/development/clang-tidy',
            'latest/development/coding-style',
            'latest/development/creating-api',
            'latest/development/patches',
            'latest/development/source-code-directory-structure',
            'latest/development/testing',
          ],
        },
        {
          type: 'category',
          label: 'GitHub',
          items: [
            'latest/development/issues',
            'latest/development/pull-requests',
          ],
        },
        {
          type: 'category',
          label: 'Upstream Development',
          items: [
            'latest/development/chromium-development',
            'latest/development/v8-development',
          ],
        },
      ],
    },
  ],
  api: [
    {
      type: 'category',
      label: 'Main Process Modules',
      items: [
        'latest/api/app',
        'latest/api/auto-updater',
        'latest/api/browser-view',
        'latest/api/browser-window',
        'latest/api/clipboard',
        'latest/api/content-tracing',
        'latest/api/crash-reporter',
        'latest/api/desktop-capturer',
        'latest/api/dialog',
        'latest/api/global-shortcut',
        'latest/api/in-app-purchase',
        'latest/api/ipc-main',
        'latest/api/menu',
        'latest/api/message-channel-main',
        'latest/api/message-port-main',
        'latest/api/native-image',
        'latest/api/native-theme',
        'latest/api/net',
        'latest/api/net-log',
        'latest/api/notification',
        'latest/api/power-monitor',
        'latest/api/power-save-blocker',
        'latest/api/process',
        'latest/api/protocol',
        'latest/api/push-notifications',
        'latest/api/safe-storage',
        'latest/api/screen',
        'latest/api/session',
        'latest/api/share-menu',
        'latest/api/shell',
        'latest/api/system-preferences',
        'latest/api/touch-bar',
        'latest/api/tray',
        'latest/api/web-contents',
        'latest/api/web-frame-main',
      ],
    },
    {
      type: 'category',
      label: 'Renderer Process Modules',
      items: [
        'latest/api/clipboard',
        'latest/api/context-bridge',
        'latest/api/crash-reporter',
        'latest/api/desktop-capturer',
        'latest/api/ipc-renderer',
        'latest/api/native-image',
        'latest/api/web-frame',
      ],
    },
    {
      type: 'category',
      label: 'Custom DOM Elements',
      items: [
        'latest/api/file-object',
        'latest/api/webview-tag',
        'latest/api/window-open',
      ],
    },
    {
      type: 'category',
      label: 'Chromium and Node.js',
      items: [
        'latest/api/command-line-switches',
        'latest/api/environment-variables',
        'latest/api/extensions',
      ],
    },
    {
      type: 'category',
      label: 'Classes',
      items: [
        'latest/api/client-request',
        'latest/api/command-line',
        'latest/api/cookies',
        'latest/api/debugger',
        'latest/api/dock',
        'latest/api/download-item',
        'latest/api/incoming-message',
        'latest/api/menu-item',
        'latest/api/service-workers',
        'latest/api/touch-bar-button',
        'latest/api/touch-bar-color-picker',
        'latest/api/touch-bar-group',
        'latest/api/touch-bar-label',
        'latest/api/touch-bar-other-items-proxy',
        'latest/api/touch-bar-popover',
        'latest/api/touch-bar-scrubber',
        'latest/api/touch-bar-segmented-control',
        'latest/api/touch-bar-slider',
        'latest/api/touch-bar-spacer',
        'latest/api/web-request',
      ],
    },
    {
      type: 'category',
      label: 'API Structures',
      items: [
        'latest/api/structures/bluetooth-device',
        'latest/api/structures/certificate',
        'latest/api/structures/certificate-principal',
        'latest/api/structures/cookie',
        'latest/api/structures/cpu-usage',
        'latest/api/structures/crash-report',
        'latest/api/structures/custom-scheme',
        'latest/api/structures/desktop-capturer-source',
        'latest/api/structures/display',
        'latest/api/structures/event',
        'latest/api/structures/extension',
        'latest/api/structures/extension-info',
        'latest/api/structures/file-filter',
        'latest/api/structures/file-path-with-headers',
        'latest/api/structures/gpu-feature-status',
        'latest/api/structures/hid-device',
        'latest/api/structures/input-event',
        'latest/api/structures/io-counters',
        'latest/api/structures/ipc-main-event',
        'latest/api/structures/ipc-main-invoke-event',
        'latest/api/structures/ipc-renderer-event',
        'latest/api/structures/jump-list-category',
        'latest/api/structures/jump-list-item',
        'latest/api/structures/keyboard-event',
        'latest/api/structures/keyboard-input-event',
        'latest/api/structures/memory-info',
        'latest/api/structures/memory-usage-details',
        'latest/api/structures/mime-typed-buffer',
        'latest/api/structures/mouse-input-event',
        'latest/api/structures/mouse-wheel-input-event',
        'latest/api/structures/new-window-web-contents-event',
        'latest/api/structures/notification-action',
        'latest/api/structures/notification-response',
        'latest/api/structures/point',
        'latest/api/structures/post-body',
        'latest/api/structures/printer-info',
        'latest/api/structures/process-memory-info',
        'latest/api/structures/process-metric',
        'latest/api/structures/product',
        'latest/api/structures/protocol-request',
        'latest/api/structures/protocol-response',
        'latest/api/structures/protocol-response-upload-data',
        'latest/api/structures/rectangle',
        'latest/api/structures/referrer',
        'latest/api/structures/scrubber-item',
        'latest/api/structures/segmented-control-segment',
        'latest/api/structures/serial-port',
        'latest/api/structures/service-worker-info',
        'latest/api/structures/shared-worker-info',
        'latest/api/structures/sharing-item',
        'latest/api/structures/shortcut-details',
        'latest/api/structures/size',
        'latest/api/structures/task',
        'latest/api/structures/thumbar-button',
        'latest/api/structures/trace-categories-and-options',
        'latest/api/structures/trace-config',
        'latest/api/structures/transaction',
        'latest/api/structures/upload-data',
        'latest/api/structures/upload-file',
        'latest/api/structures/upload-raw-data',
        'latest/api/structures/user-default-types',
        'latest/api/structures/web-request-filter',
        'latest/api/structures/web-source',
        'latest/api/structures/payment-discount',
        'latest/api/structures/product-discount',
        'latest/api/structures/product-subscription-period',
      ],
    },
  ],
};
