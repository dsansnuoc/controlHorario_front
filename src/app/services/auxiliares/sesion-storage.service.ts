import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class SesionStorageService {
	constructor() {}

	set(key: string, value: string) {
		sessionStorage.setItem(key, value);
	}

	get(key: string) {
		return sessionStorage.getItem(key);
	}

	remove(key: string) {
		sessionStorage.removeItem(key);
	}

	removelAll() {
		sessionStorage.clear();
	}
}
