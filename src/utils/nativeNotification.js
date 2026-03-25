import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { StatusBar, Style } from '@capacitor/status-bar';

const isNative = Capacitor.isNativePlatform();

const VPN_NOTIFICATION_ID = 9999;

export async function setupNative() {
  if (!isNative) return;

  try {
    await StatusBar.setStyle({ style: Style.Dark });
    await StatusBar.setBackgroundColor({ color: '#0f172a' });
  } catch (e) {
    console.warn('StatusBar setup error:', e);
  }

  try {
    const perm = await LocalNotifications.requestPermissions();
    if (perm.display !== 'granted') {
      console.warn('Notification permission not granted');
    }
  } catch (e) {
    console.warn('Notification permission error:', e);
  }
}

export async function showVpnNotification(serverName) {
  if (!isNative) return;

  try {
    await LocalNotifications.schedule({
      notifications: [
        {
          id: VPN_NOTIFICATION_ID,
          title: 'NovaSHIELD VPN - Connected',
          body: `Secured connection to ${serverName}. Your traffic is encrypted.`,
          ongoing: true,
          autoCancel: false,
          smallIcon: 'ic_stat_shield',
          largeIcon: 'ic_stat_shield',
        },
      ],
    });
  } catch (e) {
    console.warn('Show notification error:', e);
  }
}

export async function hideVpnNotification() {
  if (!isNative) return;

  try {
    await LocalNotifications.cancel({ notifications: [{ id: VPN_NOTIFICATION_ID }] });
  } catch (e) {
    console.warn('Hide notification error:', e);
  }
}
