# parcel

- [parceljs](https://parceljs.org/getting_started.html)

## 单入口

```json
  "scripts": {
    "build:s": "rimraf ./dist && parcel build ./page/index.html",
    "dev:s": "parcel ./page/index.html"
  },
```

## 多入口

```json
  "scripts": {
    "build:m": "rimraf ./dist && parcel build ./pages/*.html",
    "dev:m": "parcel ./pages/*.html",
  },
```
