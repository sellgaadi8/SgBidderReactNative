import SInfo from 'react-native-sensitive-info';
import {TOKEN, TOKEN_VALIDITY} from './constant';

export function saveUserToken(token: string): Promise<null> {
  return SInfo.setItem(TOKEN, token, {
    sharedPreferencesName: 'my_shared_prefs',
    keychainService: 'my_keychain',
  });
}

export function getUserToken(): Promise<string> {
  return SInfo.getItem(TOKEN, {
    sharedPreferencesName: 'my_shared_prefs',
    keychainService: 'my_keychain',
  });
}

export function deleteUserToken(): Promise<null> {
  return SInfo.deleteItem(TOKEN, {
    sharedPreferencesName: 'my_shared_prefs',
    keychainService: 'my_keychain',
  });
}

export function saveTokenValidity(time: number): Promise<null> {
  return SInfo.setItem(TOKEN_VALIDITY, time.toString(), {});
}

export function getTokenValidity(): Promise<string> {
  return SInfo.getItem(TOKEN_VALIDITY, {});
}
