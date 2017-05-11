import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {
  push<T>(storageName: string, data: T): void {
    localStorage.setItem(storageName, JSON.stringify(data));
  }

  pull<T>(storageName: string): T {
    const data = JSON.parse(localStorage.getItem(storageName));

    return data as T;
  }
}
