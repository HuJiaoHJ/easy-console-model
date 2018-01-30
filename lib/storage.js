class Storage {
    constructor () {
        this.cookieList = [];
        this.localStorageList = [];
        this.getStorage();
    }

    getStorage () {
        this.cookieList = this.getCookieList();
        this.localStorageList = this.getLocalStorageList();
    }

    clearStorage () {
        this.clearCookieList();
        this.clearLocalStorageList();
        this.getStorage();
    }

    getCookieList () {
        if (!document.cookie || !navigator.cookieEnabled) {
            return [];
        }

        let list = [];
        let items = document.cookie.split(';');
        for (let i = 0; i < items.length; i++) {
            let item = items[i].split('=');
            let name = item[0].replace(/^ /, ''),
                value = item[1];
            list.push({
                name: decodeURIComponent(name),
                value: decodeURIComponent(value)
            });
        }
        return list;
    }

    getLocalStorageList () {
        if (!window.localStorage) {
            return [];
        }

        try {
            let list = [];
            for (var i = 0; i < localStorage.length; i++) {
                let name = localStorage.key(i),
                    value = localStorage.getItem(name);
                list.push({
                    name,
                    value,
                });
            }
            return list;
        } catch (e) {
            return [];
        }
    }

    clearCookieList () {
        if (!document.cookie || !navigator.cookieEnabled) {
            return;
        }

        let list = this.getCookieList();
        for (var i = 0; i < list.length; i++) {
            document.cookie = list[i].name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
    }

    clearLocalStorageList () {
        if (window.localStorage) {
            try {
                localStorage.clear();
            } catch (e) {
                alert('localStorage.clear() fail.');
            }
        }
    }
}

export default Storage;